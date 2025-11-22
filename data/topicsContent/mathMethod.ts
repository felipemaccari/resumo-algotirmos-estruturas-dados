export const mathMethod = `
Alguns dos métodos para usar com Math, existem outros disponíveis

\`\`\`java
public class Main {
    public static void main(String[] args) {
				// Constantes matemáticas
        System.out.println("PI: " + Math.PI); // 3.141592653589793
        System.out.println("E: " + Math.E);   // 2.718281828459045
        
        // Arredondamento
        System.out.println("round(4.7): " + Math.round(4.7)); // 5
        System.out.println("round(4.3): " + Math.round(4.3)); // 4
        
        // Arredondar para cima
        System.out.println("ceil(4.1): " + Math.ceil(4.1)); // 5.0
        
        // Arredondar para baixo
        System.out.println("floor(4.9): " + Math.floor(4.9)); // 4.0
        
        // Valor absoluto
        System.out.println("abs(-5): " + Math.abs(-5)); // 5
        
        // Potenciação
        System.out.println("pow(2, 3): " + Math.pow(2, 3)); // 8.0 (2³)
        
        // Raiz quadrada
        System.out.println("sqrt(16): " + Math.sqrt(16)); // 4.0
        
        // Mínimo e máximo
        System.out.println("min(5, 10): " + Math.min(5, 10)); // 5
        System.out.println("max(5, 10): " + Math.max(5, 10)); // 10
        
        // Funções trigonométricas (em radianos)
        System.out.println("sin(PI/2): " + Math.sin(Math.PI / 2)); // 1.0
        System.out.println("cos(0): " + Math.cos(0)); // 1.0
        
        // Logaritmos
        System.out.println("log10(100): " + Math.log10(100)); // 2.0
        System.out.println("log(E): " + Math.log(Math.E)); // 1.0
        
        // Conversão entre graus e radianos
        System.out.println("90° em radianos: " + Math.toRadians(90));
        System.out.println("PI radianos em graus: " + Math.toDegrees(Math.PI));   
        
        
        // NUMEROS RANDOMICOS COM MATH
        
        // Math.random() - gera um número entre 0.0 (inclusive) e 1.0 (exclusive)
        System.out.println("Número aleatório entre 0 e 1: " + Math.random());
        
        // Número aleatório entre 0 e 10
        double aleatorio0a10 = Math.random() * 10;
        System.out.println("Número aleatório entre 0 e 10: " + aleatorio0a10);
        
        // Número inteiro aleatório entre 0 e 9
        int random0a9 = (int)(Math.random() * 10);
        System.out.println("Número inteiro aleatório entre 0 e 9: " + random0a9);
        
        // Número inteiro aleatório entre 1 e 10
        int random1a10 = (int)(Math.random() * 10) + 1;
        System.out.println("Número aleatório entre 1 e 10: " + random1a10);
        
        // Número inteiro aleatório entre 5 e 15
        int random5a15 = (int)(Math.random() * 11) + 5;
        System.out.println("Número aleatório entre 5 e 15: " + random5a15);
    }
}
\`\`\``;
