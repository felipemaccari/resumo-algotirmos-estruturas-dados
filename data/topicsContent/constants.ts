export const constants = `Em Java, usamos a palavra-chave \`final\` para declarar constantes, ou seja, variáveis cujo valor não pode ser alterado após a atribuição.

- O uso de constantes torna o código mais legível e evita erros.
- Convenção: constantes são geralmente nomeadas em **caixa alta** com **underscores**.

\`\`\`java
public class Main {
    public static void main(String[] args) {
        final double PI = 3.14;
        final int DIAS_DA_SEMANA = 7;
        final String NOME_UNIVERSIDADE = "Unimater";
        final double CM_PARA_POLEGADAS = 0.393701;
        final double KM_PARA_MILHAS = 0.621371;
        final double LITROS_PARA_GALOES = 0.264172;
        final double CELSIUS_PARA_FAHRENHEIT_FATOR = 1.8;
        final double CELSIUS_PARA_FAHRENHEIT_OFFSET = 32;
    }
}
\`\`\`
`;
