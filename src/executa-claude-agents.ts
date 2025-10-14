import { query, SDKResultMessage, type Options } from '@anthropic-ai/claude-agent-sdk';
import dotenv from 'dotenv';

dotenv.config();

type ModelType = 'sonnet' | 'opus' | 'haiku' | 'inherit';

interface AgentConfig {
    description: string;
    prompt: string;
    tools: string[];
    model?: ModelType;
}

interface Agents {
    [key: string]: AgentConfig;
}

export interface ResultadoAnalise {
    finalizacoComSucesso: boolean;
    custoTotal?: number;
    inputTokens?: number;
    outputTokens?: number;
}

/**
 * Executa o agente Claude para analisar código
 * @param endereco - Caminho da pasta do código a ser analisado
 * @param prompt - Prompt de análise que define critérios e formato esperado
 * @param maximoConversas - Número máximo de conversas que podem acontecer para resolver a análise
 * @returns Resultado da análise com métricas de execução
 */
const agent = async (endereco: string, prompt: string, maximoConversas:number): Promise<ResultadoAnalise> => {
    console.log('Iniciando análise de código...');
    console.log(`Diretório: ${endereco}`);

    try {

        // Configuração das opções
        const options: Options = {
            cwd: endereco,            
            maxTurns: maximoConversas,            
            allowedTools: ['Read', 'Grep', 'Glob', 'Task'],
            disallowedTools: ['Bash', 'Write', 'Edit', 'NotebookEdit'],
            includePartialMessages: true
        };

        let resultadoFinal;

        // Executa a query do agente
        console.log('Executando análise com Claude Agent SDK...\n');

        for await (const result of query({ prompt: prompt, options })) {            
            // Captura resultado final            
            if (result.type === 'result') {                
                console.log('\n\nAnálise concluída com sucesso!');                
                resultadoFinal = result;
                console.log(resultadoFinal)        
                break;
            }
        }
        

        if (!resultadoFinal) {
            throw new Error('Nenhum resultado foi retornado pela análise');
        }

        const modelUsage = resultadoFinal.modelUsage as any;

        return {
            finalizacoComSucesso: !resultadoFinal.is_error,
            custoTotal: resultadoFinal.total_cost_usd,
            inputTokens: modelUsage?.inputTokens ?? modelUsage?.input_tokens,
            outputTokens: modelUsage?.outputTokens ?? modelUsage?.output_tokens
        };

    } catch (erro) {
        const mensagemErro = erro instanceof Error ? erro.message : 'Erro desconhecido';
        console.error('Erro ao executar análise:', mensagemErro);
        throw erro;
    }
};

export default agent;
