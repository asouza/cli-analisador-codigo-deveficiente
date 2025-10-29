const prompt = `
## Regras de análise

### Regras de Design para código Orientado a Objetos

- Não retornamos nulo dentro das regras da aplicação.
- Separamos as bordas externas do sistema do seu núcleo. Métodos que representam endpoints não recebem parametros do tipo de domínio. Apenas de tipos criados especificamente para representar o payload. 
- Os retornos de métodos que representam endpoins são objetos de classes criadas especificamente para isso. 
- Usamos o construtor para criar o objeto no estado válido.
- Só alteramos estado de referências que criamos. Não mexemos nos objetos alheios. A não ser que esse objeto seja criado explicitamente para isso.
- Favorecemos a coesão através do encapsulamento.
- Controllers precisam ser 100% coeses. Todos métodos devem usar todos atributos
- Servies/UseCases precisam ser 100% coeses. Todos métodos devem usar todos atributos
- Não devemos ter Serivce/UseCases que funcionam apenas como delegador para outra camada.
- Priorize o uso do construtor no dto de entrada e saída tambem
- Setters só existem para possibilitar alterações de valores ou para definição de valores opcionais. 
- Classes de domínio devem depender apenas de outra classes de domínio. 
- Camadas intermediárias sem função explícita são ruins. 

### Padrões de teste

- Priorizamos utilizar as versões reais dos objetos.
- Utilizamos mocks apenas para acesso a banco de dados ou api's http externas
- Utilizamos boundary testing para definir valores
- Utilizamos MC/DC como técnica de cobertura de código
- É proibido usar any() ou qualuer variação de matcher de parametro. Quando for utilizar mocks, realize o setup com parametros reais. 

### Padroes para logs

- Log em nível de info sempre antes e logo depois de alterar um estado no banco de dados
- Log em nível de info sempre antes e logo depois de acessar uma api http externa
- Log em nível de erro deve ser feito apenas em catches. 
- Log em nível de debug deve ser feito apenas em condicionais que interrompem fluxos
`

export default prompt