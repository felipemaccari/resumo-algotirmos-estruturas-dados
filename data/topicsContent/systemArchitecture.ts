export const systemArchitecture = `## 🏗️ Arquitetura do Sistema de Cantina

### Stack Tecnológico:

#### Backend: NestJS
- Framework Node.js moderno e escalável
- Arquitetura inspirada no Angular
- TypeScript nativo
- Suporte a decorators e injeção de dependência

#### Banco de Dados: PostgreSQL
- Banco relacional robusto
- ACID compliant
- Ideal para dados estruturados
- Suporte a relacionamentos complexos

#### ORM: Prisma
- Modern database toolkit
- Type-safe queries
- Auto-completion no IDE
- Migrations automatizadas

#### Containerização: Docker + Docker Compose
- Isolamento de ambiente
- Reprodutibilidade
- Facilita deploy e desenvolvimento

### Arquitetura Completa:

\`\`\`
┌─────────────┐
│   Frontend  │ (React/Next.js)
│   (Client)  │
└──────┬──────┘
       │ HTTP/REST
       ↓
┌─────────────┐
│   API REST  │ (Endpoints)
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  Backend    │ (NestJS)
│  NestJS     │
├─────────────┤
│ Controllers │ → Recebe requisições
│  Services   │ → Lógica de negócio
│  Modules    │ → Organização
└──────┬──────┘
       │ Prisma ORM
       ↓
┌─────────────┐
│ PostgreSQL  │ (Database)
│  Database   │
└─────────────┘
\`\`\`

### Estrutura NestJS em Detalhes:

#### 1. Controller
**Responsabilidade**: Recebe requisições HTTP, processa parâmetros, retorna respostas

\`\`\`typescript
@Controller('produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutosService) {}

  @Get()
  async findAll() {
    return this.produtosService.findAll();
  }

  @Post()
  async create(@Body() data: CreateProdutoDto) {
    return this.produtosService.create(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.produtosService.findOne(+id);
  }
}
\`\`\`

#### 2. Service
**Responsabilidade**: Contém lógica de negócio, validações, interação com banco

\`\`\`typescript
@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.produto.findMany({
      include: { categoria: true }
    });
  }

  async create(data: CreateProdutoDto) {
    // Validações e lógica de negócio
    return this.prisma.produto.create({ data });
  }

  async findOne(id: number) {
    return this.prisma.produto.findUnique({ 
      where: { id } 
    });
  }
}
\`\`\`

#### 3. Module
**Responsabilidade**: Agrupa controllers, services e providers relacionados

\`\`\`typescript
@Module({
  imports: [PrismaModule],
  controllers: [ProdutosController],
  providers: [ProdutosService],
  exports: [ProdutosService]
})
export class ProdutosModule {}
\`\`\`

### Vantagens da Arquitetura:

#### ✅ Separação de Responsabilidades
- Cada camada tem função específica
- Facilita manutenção e testes
- Código mais organizado

#### ✅ Escalabilidade
- Fácil adicionar novos módulos
- Microserviços quando necessário
- Performance otimizada

#### ✅ Testabilidade
- Testes unitários por camada
- Mocks facilitados
- Integração contínua

#### ✅ Type Safety com TypeScript
- Erros detectados em tempo de desenvolvimento
- Auto-completion
- Refatoração segura

### Docker no Projeto:

\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: cantina
      POSTGRES_PASSWORD: senha123
      POSTGRES_DB: cantina_db
    ports:
      - "5432:5432"

  backend:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgresql://cantina:senha123@postgres:5432/cantina_db
\`\`\`

### Fluxo de uma Requisição Completa:

\`\`\`
1. Cliente faz requisição: GET /produtos/1

2. Controller recebe e extrai parâmetros:
   @Get(':id') findOne(@Param('id') id: string)

3. Controller chama Service:
   this.produtosService.findOne(id)

4. Service usa Prisma para consultar banco:
   this.prisma.produto.findUnique({ where: { id } })

5. PostgreSQL retorna dados

6. Service processa e retorna para Controller

7. Controller formata resposta HTTP

8. Cliente recebe JSON com os dados
\`\`\`

### Padrões de Projeto Utilizados:

- **Dependency Injection**: Injeção de dependências
- **Repository Pattern**: Abstração do acesso a dados
- **DTO (Data Transfer Objects)**: Validação de dados
- **Guards**: Proteção de rotas
- **Interceptors**: Transformação de requisições/respostas
- **Pipes**: Validação e transformação de dados

### Benefícios para o Projeto da Cantina:

1. **Manutenibilidade**: Código organizado e fácil de manter
2. **Performance**: Otimizações em cada camada
3. **Segurança**: Validações e autenticação robustas
4. **Produtividade**: Desenvolvimento mais rápido com ferramentas modernas
5. **Colaboração**: Estrutura clara facilita trabalho em equipe
`;
