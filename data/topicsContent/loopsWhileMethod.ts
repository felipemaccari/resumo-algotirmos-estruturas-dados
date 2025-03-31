export const loopsWhileMethod = `## 1. Laço While

### Conceito
O laço \`while\` executa um bloco de código **enquanto** uma condição específica for verdadeira. A verificação da condição é feita **antes** de cada iteração.

### Sintaxe
\`\`\`java
while (condição) {
    // código a ser executado
}
\`\`\`

### Funcionamento
1. A condição é avaliada.
2. Se a condição for verdadeira, o bloco de código dentro do laço é executado.
3. Após a execução do bloco, a condição é avaliada novamente.
4. O processo se repete até que a condição se torne falsa.

### Exemplo
\`\`\`java
int contador = 1;
while (contador <= 5) {
    System.out.println("Número: " + contador);
    contador++;
}
\`\`\`

Saída:
\`\`\`java
Número: 1
Número: 2
Número: 3
Número: 4
Número: 5
\`\`\`

### Pontos Importantes
- Se a condição inicial for falsa, o bloco de código não será executado nenhuma vez.
- É fundamental que dentro do laço exista alguma instrução que eventualmente altere a condição para falsa, caso contrário, teremos um laço infinito.
- O laço \`while\` é ideal quando não sabemos previamente quantas vezes o código precisará ser executado.

## 2. Laço Do-While

### Conceito
O laço \`do-while\` é similar ao \`while\`, mas com uma diferença crucial: o bloco de código é executado **pelo menos uma vez**, e depois a condição é verificada para determinar se o laço deve continuar.

### Sintaxe
\`\`\`java
do {
    // código a ser executado
} while (condição);
\`\`\`

### Funcionamento
1. O bloco de código dentro do \`do\` é executado.
2. Após a execução, a condição no \`while\` é avaliada.
3. Se a condição for verdadeira, o processo volta ao passo 1.
4. Se a condição for falsa, o laço termina.

### Exemplo
\`\`\`java
int contador = 1;
do {
    System.out.println("Número: " + contador);
    contador++;
} while (contador <= 5);
\`\`\`

Saída:
\`\`\`java
Número: 1
Número: 2
Número: 3
Número: 4
Número: 5
\`\`\`

### Diferença entre While e Do-While
A principal diferença é que o \`do-while\` sempre executa o bloco de código pelo menos uma vez, mesmo que a condição seja falsa desde o início.

**Exemplo com \`while\` (não executa):**
\`\`\`java
int contador = 6;
while (contador <= 5) {
    System.out.println("Número: " + contador); // Nunca será executado
    contador++;
}
\`\`\`

**Exemplo com \`do-while\` (executa uma vez):**
\`\`\`java
int contador = 6;
do {
    System.out.println("Número: " + contador); // Será executado uma vez
    contador++;
} while (contador <= 5);
\`\`\`

Saída:
\`\`\`java
Número: 6
\`\`\`
`;
