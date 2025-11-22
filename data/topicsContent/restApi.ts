export const restApi = `## 🌍 API REST

### O que é REST?

**REST** (Representational State Transfer) é um estilo arquitetural para APIs web baseado em HTTP.

### Princípios REST:

#### 1. Client-Server
- Separação entre cliente e servidor
- Cliente não precisa conhecer implementação
- Servidor não precisa conhecer interface do cliente

#### 2. Stateless (Sem Estado)
- Cada requisição é independente
- Servidor não armazena contexto entre requisições
- Toda informação necessária está na requisição

#### 3. Cacheable
- Respostas podem ser cacheadas
- Melhora performance
- Reduz carga no servidor

#### 4. Uniform Interface
- Interface padronizada
- URIs identificam recursos
- Verbos HTTP expressam ações

#### 5. Layered System
- Arquitetura em camadas
- Cliente não sabe se está conectado diretamente ao servidor final
- Permite load balancers, proxies, etc

### Verbos HTTP (Métodos):

#### GET - Buscar Dados
**Função**: Recuperar informações sem modificar

\`\`\`typescript
// Buscar todos os produtos
GET /produtos
Response: [
  { id: 1, nome: "Coca-Cola", preco: 5.00 },
  { id: 2, nome: "Guaraná", preco: 4.50 }
]

// Buscar produto específico
GET /produtos/1
Response: { id: 1, nome: "Coca-Cola", preco: 5.00 }

// Buscar com query params
GET /produtos?categoria=bebidas&preco_max=10
Response: [...produtos filtrados]
\`\`\`

**Características**:
- Idempotente (múltiplas chamadas = mesmo resultado)
- Cacheable
- Não modifica dados
- Seguro

#### POST - Criar Recursos
**Função**: Criar novo recurso

\`\`\`typescript
POST /produtos
Body: {
  "nome": "Suco de Laranja",
  "preco": 4.00,
  "categoriaId": 1
}
Response: {
  "id": 3,
  "nome": "Suco de Laranja",
  "preco": 4.00,
  "categoriaId": 1,
  "createdAt": "2024-01-15T10:30:00Z"
}
Status: 201 Created
\`\`\`

**Características**:
- Não idempotente (múltiplas chamadas criam múltiplos recursos)
- Retorna o recurso criado
- Status 201 (Created)

#### PUT - Substituir Completo
**Função**: Substituir recurso inteiro

\`\`\`typescript
PUT /produtos/3
Body: {
  "nome": "Suco de Laranja 1L",
  "preco": 5.00,
  "categoriaId": 1,
  "descricao": "Suco natural"
}
Response: {
  "id": 3,
  "nome": "Suco de Laranja 1L",
  "preco": 5.00,
  "categoriaId": 1,
  "descricao": "Suco natural"
}
Status: 200 OK
\`\`\`

**Características**:
- Idempotente
- Substitui recurso completo
- Precisa enviar todos os campos

#### PATCH - Atualizar Parcial
**Função**: Atualizar apenas campos específicos

\`\`\`typescript
PATCH /produtos/3
Body: {
  "preco": 5.50
}
Response: {
  "id": 3,
  "nome": "Suco de Laranja 1L",
  "preco": 5.50, // Atualizado
  "categoriaId": 1,
  "descricao": "Suco natural"
}
Status: 200 OK
\`\`\`

**Características**:
- Mais eficiente que PUT
- Envia apenas o que mudou
- Preserva outros campos

#### DELETE - Remover Recursos
**Função**: Deletar recurso

\`\`\`typescript
DELETE /produtos/3
Response: { 
  "message": "Produto deletado com sucesso" 
}
Status: 200 OK ou 204 No Content
\`\`\`

**Características**:
- Idempotente
- Segunda chamada retorna 404 (recurso já não existe)
- Pode retornar 204 (sem corpo na resposta)

### Tabela Resumo dos Verbos:

| Verbo | Ação | Idempotente | Corpo Req | Corpo Resp | Status Típico |
|-------|------|-------------|-----------|------------|---------------|
| GET | Buscar | ✅ Sim | ❌ Não | ✅ Sim | 200 |
| POST | Criar | ❌ Não | ✅ Sim | ✅ Sim | 201 |
| PUT | Substituir | ✅ Sim | ✅ Sim | ✅ Sim | 200 |
| PATCH | Atualizar | ⚠️ Pode | ✅ Sim | ✅ Sim | 200 |
| DELETE | Deletar | ✅ Sim | ❌ Não | ⚠️ Opcional | 200/204 |

### Status Codes HTTP:

#### 2xx - Sucesso
- **200 OK**: Requisição bem-sucedida
- **201 Created**: Recurso criado com sucesso
- **204 No Content**: Sucesso sem corpo na resposta

#### 3xx - Redirecionamento
- **301 Moved Permanently**: Recurso movido permanentemente
- **304 Not Modified**: Recurso não modificado (cache)

#### 4xx - Erro do Cliente
- **400 Bad Request**: Requisição inválida
- **401 Unauthorized**: Não autenticado
- **403 Forbidden**: Sem permissão
- **404 Not Found**: Recurso não encontrado
- **422 Unprocessable Entity**: Validação falhou

#### 5xx - Erro do Servidor
- **500 Internal Server Error**: Erro genérico do servidor
- **502 Bad Gateway**: Gateway inválido
- **503 Service Unavailable**: Serviço temporariamente indisponível

### Estrutura de URLs REST:

#### ✅ Boas Práticas:

\`\`\`
GET    /produtos              # Listar produtos
GET    /produtos/1            # Produto específico
POST   /produtos              # Criar produto
PATCH  /produtos/1            # Atualizar produto
DELETE /produtos/1            # Deletar produto

GET    /categorias/1/produtos # Produtos de uma categoria
GET    /vendas/hoje           # Vendas de hoje
GET    /usuarios/me           # Usuário logado
\`\`\`

#### ❌ Evitar:

\`\`\`
GET    /getProdutos           # Não usar verbos na URL
POST   /produtos/delete       # Usar DELETE ao invés
GET    /produto               # Singular (usar plural)
GET    /api/v1/prod           # Abreviações confusas
\`\`\`

### Implementação NestJS:

#### Controller Completo:

\`\`\`typescript
import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  Body, 
  Param, 
  Query,
  HttpCode,
  HttpStatus
} from '@nestjs/common';

@Controller('produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutosService) {}

  // GET /produtos
  @Get()
  async findAll(@Query() query: { categoria?: string }) {
    return this.produtosService.findAll(query);
  }

  // GET /produtos/:id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.produtosService.findOne(+id);
  }

  // POST /produtos
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateProdutoDto) {
    return this.produtosService.create(createDto);
  }

  // PATCH /produtos/:id
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProdutoDto
  ) {
    return this.produtosService.update(+id, updateDto);
  }

  // DELETE /produtos/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }
}
\`\`\`

### Query Parameters vs Path Parameters:

#### Path Parameters (/:id)
**Uso**: Identificar recurso específico

\`\`\`
GET /produtos/1        # id = 1
GET /usuarios/123      # id = 123
DELETE /vendas/456     # id = 456
\`\`\`

#### Query Parameters (?key=value)
**Uso**: Filtros, ordenação, paginação

\`\`\`
GET /produtos?categoria=bebidas
GET /produtos?preco_min=5&preco_max=10
GET /produtos?page=2&limit=20&sort=preco
GET /vendas?inicio=2024-01-01&fim=2024-12-31
\`\`\`

### Headers Importantes:

#### Request Headers:
\`\`\`
Authorization: Bearer eyJhbGci...
Content-Type: application/json
Accept: application/json
\`\`\`

#### Response Headers:
\`\`\`
Content-Type: application/json
Cache-Control: max-age=3600
X-Total-Count: 150
X-RateLimit-Remaining: 99
\`\`\`

### Paginação:

\`\`\`typescript
GET /produtos?page=2&limit=20

Response:
{
  "data": [...produtos],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": true
  }
}
\`\`\`

### Versionamento de API:

\`\`\`
# Na URL
/api/v1/produtos
/api/v2/produtos

# No Header
Accept: application/vnd.api+json;version=1

# No Query
/produtos?version=1
\`\`\`

### CORS (Cross-Origin Resource Sharing):

\`\`\`typescript
// main.ts
app.enableCors({
  origin: ['http://localhost:3000', 'https://cantina.com'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
});
\`\`\`

### Exemplo Completo de Requisição:

\`\`\`typescript
// Cliente faz requisição
fetch('https://api.cantina.com/produtos/1', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGci...'
  },
  body: JSON.stringify({
    preco: 6.00,
    estoque: 50
  })
})
.then(res => res.json())
.then(data => console.log(data));

// Servidor responde
{
  "id": 1,
  "nome": "Coca-Cola",
  "preco": 6.00,
  "estoque": 50,
  "categoriaId": 1,
  "updatedAt": "2024-01-15T14:30:00Z"
}
\`\`\`

### Tratamento de Erros:

\`\`\`typescript
// Resposta de erro padronizada
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "preco",
      "message": "Price must be a positive number"
    }
  ],
  "timestamp": "2024-01-15T14:30:00Z",
  "path": "/produtos"
}
\`\`\`

### Rate Limiting:

\`\`\`typescript
// Limitar requisições por IP
@UseGuards(ThrottlerGuard)
@Throttle(100, 60) // 100 requisições por 60 segundos
@Controller('produtos')
export class ProdutosController {}
\`\`\`

### Resumo:

| Conceito | Descrição |
|----------|-----------|
| REST | Estilo arquitetural para APIs |
| Stateless | Sem estado no servidor |
| GET | Buscar dados |
| POST | Criar recurso |
| PATCH | Atualizar parcialmente |
| PUT | Substituir completo |
| DELETE | Remover recurso |
| Status Codes | Indicam resultado da operação |
| Idempotente | Múltiplas chamadas = mesmo resultado |
`;
