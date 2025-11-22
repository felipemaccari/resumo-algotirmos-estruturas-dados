export const webRequests = `## 🌐 Fluxo de Requisições Web

### Processo Completo:

O fluxo de requisições web segue uma sequência bem definida:

1. **Cliente/Browser** 
   - Usuário digita a URL no navegador
   - Ex: \`www.cantina.com\`

2. **Servidor DNS (Domain Name System)**
   - Resolve o nome de domínio para um endereço IP
   - Converte \`cantina.com\` → \`192.168.1.1\`

3. **Servidor Backend**
   - Recebe a requisição HTTP
   - Processa a lógica de negócio
   - Retorna os arquivos necessários (HTML, CSS, JS)

### Detalhamento do Processo:

#### 1️⃣ Resolução DNS
\`\`\`
Cliente digita: www.cantina.com
↓
DNS resolve: 192.168.1.100
\`\`\`

#### 2️⃣ Requisição HTTP
\`\`\`
GET /produtos HTTP/1.1
Host: www.cantina.com
Authorization: Bearer token...
\`\`\`

#### 3️⃣ Processamento no Backend
- Controller recebe a requisição
- Service processa a lógica
- Repository busca dados no banco
- Resposta é formatada e enviada

#### 4️⃣ Resposta para o Cliente
\`\`\`json
{
  "status": 200,
  "data": [
    { "id": 1, "nome": "Refrigerante", "preco": 5.00 }
  ]
}
\`\`\`

### Componentes de uma Requisição HTTP:

**Request (Requisição)**:
- **Método**: GET, POST, PUT, DELETE, PATCH
- **URL**: Endereço do recurso
- **Headers**: Metadados (Authorization, Content-Type)
- **Body**: Dados enviados (em POST, PUT)

**Response (Resposta)**:
- **Status Code**: 200 (OK), 404 (Not Found), 500 (Error)
- **Headers**: Metadados da resposta
- **Body**: Dados retornados (JSON, HTML, etc)

### Exemplo Prático:

\`\`\`javascript
// Cliente fazendo requisição
fetch('https://api.cantina.com/produtos')
  .then(response => response.json())
  .then(data => console.log(data));

// Resposta do servidor
{
  "produtos": [
    { "id": 1, "nome": "Refrigerante Coca-Cola", "preco": 5.00 },
    { "id": 2, "nome": "Salgado", "preco": 3.50 }
  ]
}
\`\`\`

### Protocolos Importantes:

- **HTTP**: Protocolo de transferência de hipertexto
- **HTTPS**: HTTP seguro com criptografia SSL/TLS
- **TCP/IP**: Base da comunicação na internet
- **DNS**: Sistema de nomes de domínio

### Fluxo Completo Visualizado:

\`\`\`
Browser → DNS → IP Servidor → Backend → Banco de Dados
   ↑                                          ↓
   ← ← ← ← ← Resposta HTML/JSON ← ← ← ← ← ←
\`\`\`

### Por que isso é importante?

- Entender o fluxo ajuda a debugar problemas
- Otimizar requisições melhora performance
- Conhecer o processo facilita desenvolvimento fullstack
- Base para trabalhar com APIs e microserviços
`;
