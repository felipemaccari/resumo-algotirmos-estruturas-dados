export const conditionals = `Em Java, utilizamos estruturas condicionais para tomar decisões com base em expressões lógicas.

---

**Exemplo de Estrutura de Condicional (IF)**

\`\`\`java
if (numero > 5) {
    System.out.println("O número é maior que 5.");
}
\`\`\`

---

**Exemplo de Estrutura de Condicional (IF + ELSE)** 

\`\`\`java
if (numero > 5) {
    System.out.println("O número é maior que 5.");
} else {
    System.out.println("O número é menor ou igual a 5.");
}
\`\`\`

---

**Exemplo de Estrutura de Condicional (IF + ELSE IF + ELSE)** 

\`\`\`java
if (numero > 5) {
    System.out.println("O número é maior que 5.");
} else if (numero == 5) { 
    System.out.println("O número é igual a 5.");
} else {
    System.out.println("O número é menor que 5.");
}
\`\`\`

---

**Exemplo de Condicional Ternária**

A condicional ternária é uma forma simplificada de um \`if-else\`.

\`\`\`java
int minhaIdade = 18;
String resultado;

resultado = minhaIdade >= 18 ? "Maior de Idade" : "Menor de Idade";

System.out.println(resultado);
\`\`\`

---

**Exemplo de Switch…Case**

O \`switch\` é usado para avaliar múltiplos valores de uma variável.

\`\`\`java
int numero = 2;

switch (numero) {
    case 1:
        System.out.println("Número 1");
        break;
    case 2:
        System.out.println("Número 2");
        break;
    case 3:
        System.out.println("Número 3");
        break;
    default:
        System.out.println("Número padrão");
}
\`\`\`

---

**Exemplo de Switch…Case Agrupado**

Podemos agrupar múltiplos \`case\` para tratar situações semelhantes.

\`\`\`java
int diaDaSemana = 3;

switch (diaDaSemana) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        System.out.println("Dia útil");
        break;
    case 6:
    case 7:
        System.out.println("Fim de semana");
        break;
    default:
        System.out.println("Dia inválido");
}
\`\`\`
`;
