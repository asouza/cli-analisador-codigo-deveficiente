# CLI Analisador de Código DevEficiente

Ferramenta de linha de comando para análise automatizada de código utilizando agentes Claude da Anthropic. Este projeto permite analisar repositórios de código com base em critérios personalizados definidos através de prompts.

## Recursos

- Análise automatizada de código usando Claude Agent SDK
- Suporte para análise de múltiplos arquivos e diretórios
- Configuração customizável do número máximo de conversas
- Controle de ferramentas permitidas/bloqueadas para o agente
- Métricas detalhadas de execução (tokens, custos)

## Pré-requisitos

- Node.js (versão 18 ou superior recomendada)
- Conta na Anthropic com acesso à API
- API Key da Anthropic

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd cli-analisador-codigo-deveficiente
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a API Key:

Crie um arquivo `.env` na raiz do projeto:
```bash
ANTHROPIC_API_KEY=sua-api-key-aqui
```

## Estrutura do Projeto

```
.
├── src/
│   ├── executa-claude-agents.ts        # Módulo principal de execução do agente
│   └── main-executa-claude-agent.ts    # Script CLI principal
├── prompt-analise.md                    # Arquivo com prompt de análise
├── dist/                                # Código compilado (gerado após build)
├── package.json                         # Dependências e scripts
├── tsconfig.json                        # Configurações do TypeScript
├── .env                                 # Variáveis de ambiente (não versionado)
└── .gitignore                           # Arquivos ignorados pelo Git
```

## Uso

### Comando Básico

```bash
npm run analisa <caminho-do-repositorio>
```

Exemplo:
```bash
npm run analisa /caminho/para/seu/projeto
```

### Com Número Máximo de Conversas Customizado

```bash
npm run analisa <caminho-do-repositorio> <maximo-conversas>
```

Exemplo:
```bash
npm run analisa /caminho/para/seu/projeto 10
```

### Execução Direta com tsx

```bash
tsx src/main-executa-claude-agent.ts <caminho-do-repositorio> [maximo-conversas]
```

## Parâmetros

### Parâmetros Obrigatórios

- `<caminho-do-repositorio>`: Caminho absoluto ou relativo para o diretório do código a ser analisado

### Parâmetros Opcionais

- `[maximo-conversas]`: Número máximo de turnos de conversa que o agente pode realizar (padrão: 5)
  - Deve ser um número inteiro positivo
  - Valores maiores permitem análises mais profundas, mas podem aumentar o custo

## Configuração do Prompt

O arquivo `prompt-analise.md` contém as instruções e critérios que o agente Claude utilizará para analisar o código. Edite este arquivo para customizar:

- Critérios de análise
- Formato de saída esperado
- Foco específico da análise (segurança, performance, boas práticas, etc.)

## Ferramentas Permitidas

O agente tem acesso restrito às seguintes ferramentas:

- **Read**: Leitura de arquivos
- **Grep**: Busca por padrões no código
- **Glob**: Busca de arquivos por padrão
- **Task**: Execução de sub-tarefas

### Ferramentas Bloqueadas

Por segurança, as seguintes ferramentas estão desabilitadas:

- **Bash**: Execução de comandos no terminal
- **Write**: Criação de novos arquivos
- **Edit**: Edição de arquivos existentes
- **NotebookEdit**: Edição de notebooks Jupyter

## Scripts Disponíveis

- `npm run build` - Compila o código TypeScript para JavaScript
- `npm run analisa` - Executa a análise de código
- `npm run clean` - Remove o diretório dist
- `npm run typecheck` - Verifica tipos TypeScript sem compilar
- `npm test` - Executa testes (ainda não implementado)

## Resultado da Análise

Após a execução, o script exibe:

### Durante a Execução
- Progresso da análise em tempo real
- Ações sendo executadas pelo agente

### Ao Final
- Status da execução (sucesso/erro)
- Custo total em USD
- Número de tokens de entrada
- Número de tokens de saída

Exemplo de saída:
```
================================================================================
RESUMO DA ANÁLISE
================================================================================

Status: ✓ Sucesso
Custo Total: $0.0234
Tokens de Entrada: 15,234
Tokens de Saída: 1,456

Análise concluída!
```

## Desenvolvimento

### Compilar o Projeto

```bash
npm run build
```

### Verificar Tipos

```bash
npm run typecheck
```

### Limpar Arquivos Compilados

```bash
npm run clean
```

## Tecnologias Utilizadas

- **TypeScript**: Linguagem principal
- **@anthropic-ai/claude-agent-sdk**: SDK para agentes Claude
- **@e2b/code-interpreter**: Interpretador de código (sandbox)
- **dotenv**: Gerenciamento de variáveis de ambiente
- **express**: Framework web (para possíveis extensões futuras)

## Solução de Problemas

### Erro: ANTHROPIC_API_KEY não configurada

Certifique-se de que:
1. O arquivo `.env` existe na raiz do projeto
2. A variável `ANTHROPIC_API_KEY` está definida corretamente
3. A API key é válida

### Erro: Caminho do repositório não encontrado

Verifique se:
1. O caminho fornecido existe
2. Você tem permissão de leitura no diretório
3. O caminho está correto (absoluto ou relativo ao diretório atual)

### Erro: Número máximo de conversas inválido

O parâmetro de máximo de conversas deve ser:
- Um número inteiro
- Maior que zero
- Sem caracteres especiais

## Licença

ISC

## Contribuindo

Contribuições são bem-vindas! Por favor:
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Suporte

Para questões e suporte, abra uma issue no repositório do projeto.
