import agent from './executa-claude-agents.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { stdout } from 'process';
import { INSTRUCOES_EXECUCAO } from './instrucoes-execucao.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script principal para execução da análise de código via console
 * Uso: tsx src/main-executa-claude-agent.ts <caminho-repositorio> <url-prompt> [maximo-conversas]
 */
const main = async (): Promise<void> => {
    try {
        // Lê o primeiro parâmetro para pegar o caminho do repositório
        const caminhoRepositorio = process.argv[2];

        if (!caminhoRepositorio) {
            console.error('Erro: Caminho do repositório não informado');
            console.log('Uso: tsx src/main-executa-claude-agent.ts <caminho-repositorio> <url-prompt> [maximo-conversas]');
            process.exit(1);
        }

        // Lê o segundo parâmetro para a URL do prompt
        const urlPrompt = process.argv[3];

        if (!urlPrompt) {
            console.error('Erro: URL do prompt não informada');
            console.log('Uso: tsx src/main-executa-claude-agent.ts <caminho-repositorio> <url-prompt> [maximo-conversas]');
            process.exit(1);
        }

        // Lê o terceiro parâmetro opcional para o número máximo de conversas
        const maximoConversasParam = process.argv[4];
        const maximoConversas = maximoConversasParam ? parseInt(maximoConversasParam, 10) : 5;

        // Valida o parâmetro de máximo de conversas
        if (isNaN(maximoConversas) || maximoConversas < 1) {
            console.error('Erro: O número máximo de conversas deve ser um número inteiro positivo');
            console.log('Uso: tsx src/main-executa-claude-agent.ts <caminho-repositorio> <url-prompt> [maximo-conversas]');
            process.exit(1);
        }

        // Verifica se o diretório existe
        if (!fs.existsSync(caminhoRepositorio)) {
            console.error(`Erro: Diretório não encontrado: ${caminhoRepositorio}`);
            process.exit(1);
        }

        // Carrega o prompt da URL pública
        console.log(`Buscando prompt de: ${urlPrompt}`);

        let promptCliente: string;
        try {
            const response = await fetch(urlPrompt);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} ${response.statusText}`);
            }
            promptCliente = await response.text();
            console.log('✓ Prompt carregado com sucesso');
            console.log();
        } catch (erro) {
            const mensagem = erro instanceof Error ? erro.message : 'Erro desconhecido';
            console.error(`Erro ao carregar prompt da URL: ${mensagem}`);
            process.exit(1);
        }

        // Carrega a API key
        const apiKeyAnthropic = process.env.ANTHROPIC_API_KEY;
        if (!apiKeyAnthropic) {
            console.error('Erro: ANTHROPIC_API_KEY não configurada no arquivo .env');
            process.exit(1);
        }

        console.log('='.repeat(80));
        console.log('ANALISADOR DE CÓDIGO - AGENTE CLAUDE');
        console.log('='.repeat(80));
        console.log();
        console.log(`Máximo de conversas: ${maximoConversas}`);
        console.log();

        const promptFinal = `
            ${promptCliente}

            ## Instrucoes execucao

            ${INSTRUCOES_EXECUCAO}
        `;

        console.log(promptFinal)
        // Executa o agente
        const resultado = await agent(caminhoRepositorio, promptFinal, maximoConversas);

        // Salva o resultado em arquivo
        if (resultado.conteudo) {
            const caminhoResultado = path.join(process.cwd(), 'resultado-analise.md');
            fs.writeFileSync(caminhoResultado, resultado.conteudo, 'utf-8');
            console.log();
            console.log(`✓ Resultado salvo em: ${caminhoResultado}`);
        }

        console.log();
        console.log('='.repeat(80));
        console.log('RESUMO DA ANÁLISE');
        console.log('='.repeat(80));
        console.log();
        console.log(`Status: ${resultado.finalizadoComSucesso ? '✓ Sucesso' : '✗ Erro'}`);

        if (resultado.custoTotal !== undefined) {
            console.log(`Custo Total: $${resultado.custoTotal.toFixed(4)}`);
        }

        if (resultado.inputTokens !== undefined) {
            console.log(`Tokens de Entrada: ${resultado.inputTokens.toLocaleString()}`);
        }

        if (resultado.outputTokens !== undefined) {
            console.log(`Tokens de Saída: ${resultado.outputTokens.toLocaleString()}`);
        }
        
        console.log();
        console.log('Análise concluída!');

        const saida = {
            finalizacoComSucesso:resultado.finalizadoComSucesso,
            conteudo: resultado.conteudo
        }

        // Escreve a saída no arquivo resultado-analise.txt
        const caminhoSaida = path.join(process.cwd(), 'resultado-analise.txt');
        fs.writeFileSync(caminhoSaida, JSON.stringify(saida, null, 2), 'utf-8');
        console.log(`✓ Saída JSON salva em: ${caminhoSaida}`);

    } catch (erro) {
        const mensagemErro = erro instanceof Error ? erro.message : 'Erro desconhecido';
        console.error('Erro na execução:', mensagemErro);
        if (erro instanceof Error && erro.stack) {
            console.error(erro.stack);
        }
        process.exit(1);
    }
};

main();
