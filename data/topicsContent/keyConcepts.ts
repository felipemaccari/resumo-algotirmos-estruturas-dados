export const keyConcepts = `## 💡 Conceitos-Chave do Projeto Integrador

### Visão Geral da Arquitetura

O projeto de cantina utiliza tecnologias modernas para criar um sistema completo, escalável e manutenível.

### 1. ORM (Object-Relational Mapping)

#### O que é?
Ferramenta que permite escrever queries em JavaScript/TypeScript sem SQL manual.

#### Prisma no Projeto:
\`\`\`typescript
// Sem ORM (SQL puro)
const result = await db.query(
  'SELECT * FROM produtos WHERE id = $1',
  [produtoId]
);

// Com Prisma ORM
const produto = await prisma.produto.findUnique({
  where: { id: produtoId }
});
\`\`\`

#### Vantagens:
- ✅ Type-safe (TypeScript sabe os tipos)
- ✅ Auto-complete no editor
- ✅ Menos bugs
- ✅ Migrations automatizadas
- ✅ Código mais legível

### 2. Ambientes Separados

#### Por que separar ambientes?
**Objetivo**: Testes seguros antes da produção

\`\`\`
Development (Local)
  ↓ testes
Staging (Homologação)
  ↓ validação
Production (Produção)
  ↓ usuários finais
\`\`\`

#### Benefícios:
- Testar sem afetar usuários reais
- Validar em ambiente similar ao real
- Rollback fácil se algo der errado
- Confiança nas releases

### 3. Banco Relacional

#### PostgreSQL no Projeto:
**Estrutura consistente para dados estruturados**

\`\`\`
Características:
✓ Tabelas com colunas tipadas
✓ Relacionamentos (Foreign Keys)
✓ Integridade referencial
✓ ACID (Atomicidade, Consistência, Isolamento, Durabilidade)
✓ Queries complexas com JOINs
\`\`\`

#### Exemplo de Integridade:
\`\`\`sql
-- Não permite deletar categoria com produtos
DELETE FROM categorias WHERE id = 1;
-- Erro: viola foreign key constraint
\`\`\`

### 4. Docker

#### Função:
**Padronização e isolamento de ambiente**

\`\`\`
Sem Docker:
- Cada dev instala manualmente
- Versões diferentes
- "Funciona na minha máquina"
- Setup complicado

Com Docker:
- docker-compose up
- Ambiente idêntico para todos
- Versões garantidas
- Setup automático
\`\`\`

#### docker-compose.yml:
\`\`\`yaml
services:
  postgres:  # Banco de dados
  backend:   # API NestJS
  adminer:   # Interface do banco
\`\`\`

### 5. JWT (JSON Web Token)

#### Função:
**Autenticação stateless moderna**

\`\`\`
Fluxo:
1. Login → Servidor gera JWT
2. Cliente guarda token
3. Requisições incluem token
4. Servidor valida token
5. Acesso autorizado
\`\`\`

#### Vantagens:
- Stateless (servidor não guarda sessão)
- Escalável
- Seguro (assinado digitalmente)
- Padrão da indústria

### 6. REST

#### Padrão:
**Padrão para APIs web escaláveis**

\`\`\`
GET    /produtos    → Buscar todos
POST   /produtos    → Criar novo
PATCH  /produtos/1  → Atualizar
DELETE /produtos/1  → Deletar
\`\`\`

#### Princípios:
- Stateless
- Verbos HTTP expressam ações
- URLs identificam recursos
- Respostas cacheáveis

### Arquitetura Completa Visualizada:

\`\`\`
┌─────────────────────────────────────────────┐
│              FRONTEND                       │
│         (React/Next.js/Vue)                 │
│    Interface do usuário (UI/UX)            │
└────────────────┬────────────────────────────┘
                 │ HTTP/HTTPS
                 │ REST API
                 ↓
┌─────────────────────────────────────────────┐
│         API REST ENDPOINTS                  │
│  GET /produtos, POST /vendas, etc...        │
└────────────────┬────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────┐
│         BACKEND - NestJS                    │
├─────────────────────────────────────────────┤
│  Controllers  → Recebe requisições HTTP     │
│  Services     → Lógica de negócio           │
│  Modules      → Organização por domínio     │
│  Guards       → Autenticação/Autorização    │
│  DTOs         → Validação de dados          │
└────────────────┬────────────────────────────┘
                 │
                 │ Prisma ORM
                 ↓
┌─────────────────────────────────────────────┐
│         BANCO DE DADOS                      │
│           PostgreSQL                        │
├─────────────────────────────────────────────┤
│  Tabelas: produtos, categorias, usuarios,   │
│           vendas, itens_venda               │
│  Relacionamentos: 1:N, N:N                  │
│  Índices para performance                   │
└─────────────────────────────────────────────┘

        TUDO rodando em Docker 🐳
\`\`\`

### Fluxo de uma Requisição Completa:

\`\`\`
1. Usuário clica "Adicionar ao carrinho"
   ↓
2. Frontend faz requisição:
   POST /vendas/itens
   Header: Authorization: Bearer JWT_TOKEN
   Body: { produtoId: 1, quantidade: 2 }
   ↓
3. NestJS Controller recebe
   @Post('vendas/itens')
   create(@Body() data, @Request() req)
   ↓
4. JWT Guard valida token
   ✓ Token válido
   ✓ Usuário identificado
   ↓
5. Service processa lógica
   - Verifica estoque
   - Calcula preço
   - Valida quantidade
   ↓
6. Prisma consulta/atualiza banco
   await prisma.produto.findUnique(...)
   await prisma.itemVenda.create(...)
   await prisma.produto.update(...) // reduz estoque
   ↓
7. PostgreSQL executa queries
   - Busca produto
   - Cria item venda
   - Atualiza estoque
   ↓
8. Response volta para Controller
   { id: 123, produtoId: 1, quantidade: 2, total: 10.00 }
   ↓
9. Controller retorna HTTP Response
   Status: 201 Created
   Body: JSON com dados
   ↓
10. Frontend recebe e atualiza interface
    Carrinho atualizado! ✅
\`\`\`

### Tecnologias e suas Funções:

| Tecnologia | Função | Por que usar? |
|------------|--------|---------------|
| **NestJS** | Backend framework | Estrutura organizada, TypeScript, decorators |
| **PostgreSQL** | Banco de dados | Relacional, ACID, integridade |
| **Prisma** | ORM | Type-safe, queries fáceis, migrations |
| **Docker** | Containerização | Ambiente padronizado, reprodutível |
| **JWT** | Autenticação | Stateless, escalável, seguro |
| **REST** | Padrão API | Standard, cacheable, stateless |
| **TypeScript** | Linguagem | Type-safe, menos bugs, melhor IDE |

### Boas Práticas Aplicadas:

#### 1. Separation of Concerns
\`\`\`
Controller → Apenas roteamento HTTP
Service    → Lógica de negócio
Repository → Acesso a dados
\`\`\`

#### 2. Dependency Injection
\`\`\`typescript
constructor(
  private prisma: PrismaService,
  private authService: AuthService
) {}
\`\`\`

#### 3. DTOs para Validação
\`\`\`typescript
export class CreateProdutoDto {
  @IsString()
  @MinLength(3)
  nome: string;

  @IsNumber()
  @Min(0)
  preco: number;
}
\`\`\`

#### 4. Guards para Proteção
\`\`\`typescript
@UseGuards(JwtAuthGuard)
@Get('produtos')
findAll() { ... }
\`\`\`

#### 5. Environment Variables
\`\`\`bash
DATABASE_URL=postgresql://...
JWT_SECRET=supersecret
NODE_ENV=production
\`\`\`

### CI/CD no Projeto:

\`\`\`
Developer → Git Push
    ↓
GitHub Actions/GitLab CI
    ↓
1. Build
2. Testes unitários
3. Testes integração
4. Linting
5. Security scan
    ↓
Deploy Staging
    ↓
Testes automatizados
    ↓
Aprovação manual
    ↓
Deploy Production
    ↓
Monitoramento
\`\`\`

### Módulos do Sistema Integrados:

\`\`\`
┌─────────────┐
│Autenticação │ → JWT, Guards
└──────┬──────┘
       │
   ┌───┴───────────────────┐
   │                       │
┌──▼──────┐          ┌────▼─────┐
│Dashboard│          │Cadastros │
│         │          │          │
│- Vendas │          │-Produtos │
│- Receita│          │-Categoria│
│- Estoque│          │-Usuários │
└────┬────┘          └────┬─────┘
     │                    │
     │        ┌──────────┐│
     └────────►   PDV    ◄┘
              │          │
              │- Vendas  │
              │- Carrinho│
              │- Payment │
              └────┬─────┘
                   │
              ┌────▼──────┐
              │Relatórios │
              │           │
              │- Vendas   │
              │- Estoque  │
              │- Financ.  │
              └───────────┘
\`\`\`

### Checklist de Conhecimento:

#### Conceitos Fundamentais:
- [ ] O que é ORM e por que usar Prisma
- [ ] Diferença entre ambientes (dev, staging, prod)
- [ ] Características de banco relacional
- [ ] Como Docker padroniza ambiente
- [ ] Funcionamento do JWT
- [ ] Princípios REST

#### Arquitetura:
- [ ] Fluxo: Frontend → API → Backend → Database
- [ ] Papel de cada camada (Controller, Service, Repository)
- [ ] Como relacionamentos funcionam (1:N, N:N)
- [ ] Estrutura de módulos NestJS

#### Operações:
- [ ] Verbos HTTP (GET, POST, PATCH, DELETE)
- [ ] Comandos Prisma (migrate dev, studio)
- [ ] Comandos Docker (compose up/down)
- [ ] Fluxo de autenticação com JWT

#### Projeto Prático:
- [ ] Módulos do sistema de cantina
- [ ] Fluxo para cadastrar produto
- [ ] Como funciona uma venda no PDV
- [ ] Relacionamento Produtos-Categorias

### Dicas para a Prova:

1. **Entenda o fluxo completo**: Cliente → DNS → Backend → Banco
2. **Decore comandos principais**: \`npx prisma migrate dev\`, \`docker-compose up\`
3. **Saiba os verbos HTTP**: GET (buscar), POST (criar), PATCH (atualizar), DELETE (remover)
4. **Conheça os módulos**: Autenticação, Dashboard, PDV, Cadastros, Relatórios
5. **Lembre da navegação**: Autenticação → Cadastros → Produtos
6. **Relacionamentos**: Categoria (1) ← → (N) Produtos
7. **JWT é stateless**: servidor não guarda sessão
8. **ORM**: escreve TypeScript ao invés de SQL
9. **Docker**: ambiente padronizado para equipe
10. **CI/CD**: automatiza build, testes e deploy

### Resumo em Uma Frase Cada:

- **ORM**: Escreve código TypeScript ao invés de SQL manual
- **Ambientes**: Dev/Staging/Prod para testar antes de produção
- **PostgreSQL**: Banco relacional com estrutura consistente
- **Docker**: Padroniza ambiente para toda equipe
- **JWT**: Autenticação stateless sem guardar sessão no servidor
- **REST**: Padrão de API usando verbos HTTP e URLs
- **NestJS**: Framework TypeScript organizado em módulos
- **Prisma**: ORM type-safe com migrations automatizadas
- **CI/CD**: Automatiza todo processo de deploy

### Perguntas Frequentes:

**Q: Por que usar ORM ao invés de SQL puro?**
A: Type-safety, menos bugs, auto-complete, código mais legível.

**Q: Qual a diferença entre PUT e PATCH?**
A: PUT substitui recurso completo, PATCH atualiza apenas campos específicos.

**Q: O que significa JWT ser stateless?**
A: Servidor não precisa armazenar informações de sessão, tudo está no token.

**Q: Por que PostgreSQL e não MongoDB?**
A: Dados estruturados com relacionamentos se beneficiam de integridade referencial.

**Q: Qual o comando para criar migration no Prisma?**
A: \`npx prisma migrate dev --name nome_da_migration\`

**Q: Fluxo para cadastrar produto?**
A: Autenticação → Cadastros → Produtos → Preencher formulário → Salvar

**Q: Relacionamento Produtos-Categorias?**
A: Um-para-muitos (1:N) - uma categoria tem vários produtos.

**Q: Principal vantagem do Docker Compose?**
A: Ambiente padronizado para toda equipe de desenvolvimento.
`;
