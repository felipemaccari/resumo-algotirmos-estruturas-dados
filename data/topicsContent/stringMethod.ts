export const stringMethod = `# Resumo de Conteúdos

### Métodos de String

Alguns dos métodos para usar com String, existem outros disponíveis

\`\`\`java
public class Main {
    public static void main(String[] args) {
				String frase = "Aprendendo Java na Faculdade";
        
        // length() - retorna o tamanho da string
        System.out.println("Tamanho: " + frase.length()); // 28
        
        // toLowerCase() e toUpperCase() - alteram o caso
        System.out.println("Minúsculas: " + frase.toLowerCase());
        System.out.println("Maiúsculas: " + frase.toUpperCase());
        
        // indexOf() - retorna a posição da primeira ocorrência
        System.out.println("'Java': " + frase.indexOf("Java")); // 11
        System.out.println("'Python': " + frase.indexOf("Python")); // -1
        
        // substring() - extrai parte de uma string
        System.out.println("Substring: " + frase.substring(11, 15)); // "Java"
        
        // replace() - substitui texto
        System.out.println("Substituição: " + frase.replace("Java", "Python"));
        
        // split() - divide a string em um array
        String[] palavras = frase.split(" ");
        System.out.println("Primeira palavra: " + palavras[0]); // "Aprendendo"
        System.out.println("Número de palavras: " + palavras.length); // 4
        
        // trim() - remove espaços no início e fim
        String textoComEspacos = "   texto com espaços   ";
        System.out.println("Com trim: [" + textoComEspacos.trim() + "]");
        
        // contains() - verifica se contém um texto
        System.out.println("Contém 'Java'? " + frase.contains("Java")); // true
        System.out.println("Contém 'HTML'? " + frase.contains("HTML")); // false
        
        // equals() e equalsIgnoreCase() - comparação de strings
        String str1 = "Java";
        String str2 = "java";
        System.out.println("equals: " + str1.equals(str2)); // false
        System.out.println("equalsIgnoreCase: " + str1.equalsIgnoreCase(str2));
        
        // startsWith() e endsWith() - verifica início e fim
        System.out.println("'Aprendendo'? " + frase.startsWith("Aprendendo"));
        System.out.println("'Faculdade'? " + frase.endsWith("Faculdade"));
    }
}
\`\`\`
`;
