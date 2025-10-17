export const INSTRUCOES_EXECUCAO = `
## Escala de avaliação 

1. **Caótico** — Retorna nulos; mistura bordas com domínio; construtores não garantem validade; controladores/serviços não coesos; camadas inúteis; testes sem critério, mocks em tudo; logs ausentes ou errados.
2. **Improvisado** — Algumas intenções corretas, mas violações frequentes (DTO sem construtor, setters indiscriminados, domínio dependente de infra); testes frágeis sem MC/DC; logs esparsos.
3. **Irregular** — Separa parcialmente bordas; ainda há retorno nulo e acoplamento indevido; coesão baixa; mocks além de DB/HTTP; pouca disciplina em boundary testing; logs inconsistentes.
4. **Inconsistente** — Começa a usar construtor para validade, mas com exceções; alguns controllers/serviços coesos; ainda existem camadas sem função; MC/DC pontual; logs não cercam todos efeitos externos.
5. **Funcional** — Cumpre regras básicas (sem nulo na maior parte; algum encapsulamento); coesão mediana; domínio quase só depende de domínio; testes com boundary testing parcial; MC/DC em fluxos críticos; logs antes/depois às vezes.
6. **Estável** — Construtores garantem validade na maioria; controllers/serviços geralmente 100% coesos; setters restritos; mocks só em DB/HTTP na maior parte; MC/DC razoável; logs cercam a maioria dos efeitos e erros só em catch.
7. **Organizado** — Bordas bem separadas; DTOs com construtor de entrada/saída; domínio depende apenas de domínio; alta coesão; sem camadas inúteis; testes com objetos reais, boundary testing consistente, MC/DC amplo; logs info antes/depois de DB/HTTP e debug em ramos relevantes.
8. **Sólido** — Regras seguidas sistematicamente (zero nulos, encapsulamento forte, setters só para opcionais); coesão total em controllers/serviços; mocks estritamente DB/HTTP; proibição de \`any()\` respeitada; MC/DC alto; cobertura de logs completa e limpa.
9. **Elegante** — Design enxuto e expressivo; arquitetura clara e sustentável; métricas de teste robustas (MC/DC quase total + boundaries bem definidos); observabilidade por logs precisa (info/erro/debug exatamente nos pontos definidos); fácil de evoluir.
10. **Exemplar** — Conformidade integral às regras; domínio impecavelmente isolado; coesão 100%; ausência de camadas supérfluas; testes com objetos reais e MC/DC máximo sem matchers genéricos; logs canônicos (info antes/depois de DB/HTTP, erro só em catch, debug apenas em ramos), servindo de referência.

## Tarefa

Navegue pelos arquivos de código a partir da raiz do diretório de trabalho para conseguir realizar a análise do código baseado nas regras de análise. 

## Resultado esperado

- O código deve ser classificado entre uma das dez escalas. Exemplo: Organizado
- Deve ter uma lista de explicações para que a pessoa entenda aquela análise. 

## Saída esperada

Um markdown seguindo a estrutura abaixo. Não utilize triple backticks para o texto markdown. Apenas retorno o markdown. 

## Classificacao

caotico|improvisado|Irregular|Inconsistente|Funcional|Estável|Organizado|Sólido|Elegante|Exemplar

## Explicacao resumida

coloca a explicacao associada

## Motivos

lista dos motivos
`;
