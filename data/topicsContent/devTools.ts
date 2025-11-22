export const devTools = `## 🔧 Ferramentas de Desenvolvimento

### Docker Compose

#### O que é?
Docker Compose é uma ferramenta para definir e executar aplicações Docker multi-container.

#### Vantagens para o Projeto:

##### 1. Ambiente Padronizado para Toda Equipe
\`\`\`
Desenvolvedor A (Mac)     ✓ Mesmo ambiente
Desenvolvedor B (Windows) ✓ Mesmas versões
Desenvolvedor C (Linux)   ✓ Mesmas configurações
\`\`\`

##### 2. Setup Simplificado
\`\`\`bash
# Sem Docker (complicado)
- Instalar PostgreSQL
- Configurar usuário e senha
- Criar banco de dados
- Instalar Node.js
- Configurar variáveis de ambiente
- Resolver dependências

# Com Docker (simples)
docker-compose up
# Pronto! 🎉
\`\`\`

##### 3. Isolamento de Dependências
- Cada serviço roda em seu container
- Não interfere com outras aplicações
- Fácil limpar e recomeçar

##### 4. Reprodutibilidade
- Mesmo ambiente em dev, homologação e produção
- Elimina "funciona na minha máquina"
- Facilita onboarding de novos desenvolvedores

#### Arquivo docker-compose.yml do Projeto:

\`\`\`yaml
version: '3.8'

services:
  # Banco de Dados PostgreSQL
  postgres:
    image: postgres:15-alpine
    container_name: cantina-db
    environment:
      POSTGRES_USER: cantina
      POSTGRES_PASSWORD: senha_segura_123
      POSTGRES_DB: cantina_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - cantina-network

  # Backend NestJS
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: cantina-backend
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://cantina:senha_segura_123@postgres:5432/cantina_db
      JWT_SECRET: seu_secret_aqui
      NODE_ENV: development
    depends_on:
      - postgres
    volumes:
      - ./src:/app/src
      - ./node_modules:/app/node_modules
    networks:
      - cantina-network
    command: npm run start:dev

  # Adminer (Interface visual do banco)
  adminer:
    image: adminer
    container_name: cantina-adminer
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    networks:
      - cantina-network

volumes:
  postgres_data:

networks:
  cantina-network:
    driver: bridge
\`\`\`

#### Comandos Docker Compose Essenciais:

\`\`\`bash
# Iniciar todos os serviços
docker-compose up

# Iniciar em background (detached)
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (limpar banco)
docker-compose down -v

# Ver logs
docker-compose logs

# Ver logs de um serviço específico
docker-compose logs backend

# Reconstruir imagens
docker-compose build

# Executar comando em um serviço
docker-compose exec backend npm run migrate
\`\`\`

### Prisma ORM

#### O que é?
Prisma é um ORM (Object-Relational Mapping) moderno para Node.js e TypeScript.

#### Por que usar Prisma?

##### ✅ Type-Safe
\`\`\`typescript
// Prisma sabe os tipos automaticamente
const produto = await prisma.produto.findUnique({
  where: { id: 1 }
});
// produto.nome é string (auto-complete funciona!)
// produto.preco é Decimal (auto-complete funciona!)
\`\`\`

##### ✅ Queries sem SQL Manual
\`\`\`typescript
// Ao invés de escrever SQL
const result = await db.query(
  'SELECT * FROM produtos WHERE categoria_id = $1',
  [categoriaId]
);

// Escreve TypeScript
const produtos = await prisma.produto.findMany({
  where: { categoriaId }
});
\`\`\`

##### ✅ Migrations Automatizadas
- Cria SQL automaticamente baseado no schema
- Mantém histórico de mudanças
- Sincroniza dev com produção

##### ✅ Relações Simplificadas
\`\`\`typescript
// Buscar produto com categoria incluída
const produto = await prisma.produto.findUnique({
  where: { id: 1 },
  include: { categoria: true }
});

console.log(produto.categoria.nome); // "Bebidas"
\`\`\`

#### Comandos Prisma Essenciais:

##### 1. Criar Migration
\`\`\`bash
npx prisma migrate dev --name adicionar_campo_desconto

# O que faz:
# 1. Lê o schema.prisma
# 2. Compara com o banco atual
# 3. Gera SQL da diferença
# 4. Aplica no banco de desenvolvimento
# 5. Gera Prisma Client atualizado
\`\`\`

##### 2. Gerar Prisma Client
\`\`\`bash
npx prisma generate

# Gera código TypeScript baseado no schema
# Necessário após alterar schema.prisma
\`\`\`

##### 3. Prisma Studio (Interface Visual)
\`\`\`bash
npx prisma studio

# Abre em http://localhost:5555
# Interface visual para ver e editar dados
\`\`\`

##### 4. Aplicar Migrations em Produção
\`\`\`bash
npx prisma migrate deploy

# Aplica migrations pendentes
# Usado em produção/CI/CD
\`\`\`

##### 5. Reset do Banco (Desenvolvimento)
\`\`\`bash
npx prisma migrate reset

# ⚠️ CUIDADO: Apaga todos os dados!
# Recria banco do zero
# Aplica todas as migrations
# Roda seeds
\`\`\`

#### Sintaxe Prisma para Operações Comuns:

##### Buscar por ID
\`\`\`typescript
const produto = await prisma.produto.findUnique({
  where: { id: 1 }
});
\`\`\`

##### Listar Todos
\`\`\`typescript
const produtos = await prisma.produto.findMany();
\`\`\`

##### Criar
\`\`\`typescript
const novoProduto = await prisma.produto.create({
  data: {
    nome: "Coca-Cola 2L",
    preco: 8.50,
    estoque: 100,
    categoriaId: 1
  }
});
\`\`\`

##### Atualizar
\`\`\`typescript
const produtoAtualizado = await prisma.produto.update({
  where: { id: 1 },
  data: { preco: 9.00 }
});
\`\`\`

##### Deletar
\`\`\`typescript
await prisma.produto.delete({
  where: { id: 1 }
});
\`\`\`

##### Buscar com Filtros
\`\`\`typescript
const produtosBaratos = await prisma.produto.findMany({
  where: {
    preco: { lte: 5.00 }, // menor ou igual a 5
    estoque: { gt: 0 }    // maior que 0
  },
  orderBy: { preco: 'asc' }
});
\`\`\`

##### Buscar com Relações
\`\`\`typescript
const categoria = await prisma.categoria.findUnique({
  where: { id: 1 },
  include: {
    produtos: {
      where: { estoque: { gt: 0 } }
    }
  }
});
\`\`\`

#### Fluxo de Trabalho com Prisma:

\`\`\`
1. Alterar schema.prisma
   ↓
2. npx prisma migrate dev
   ↓
3. Prisma gera SQL
   ↓
4. SQL é aplicado no banco
   ↓
5. Prisma Client é atualizado
   ↓
6. Código TypeScript tem novos tipos
\`\`\`

#### Vantagens do Combo Docker + Prisma:

1. **Docker**: Ambiente consistente
2. **Prisma**: Código type-safe
3. **Juntos**: Setup rápido + desenvolvimento produtivo

#### Exemplo Completo no NestJS:

\`\`\`typescript
// prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

// produtos.service.ts
@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  // Type-safe e auto-complete funcionando!
  async findOne(id: number) {
    return this.prisma.produto.findUnique({ 
      where: { id },
      include: { categoria: true }
    });
  }
}
\`\`\`

### Resumo das Vantagens:

| Ferramenta | Benefício Principal |
|------------|-------------------|
| Docker Compose | Ambiente padronizado |
| Prisma | Type-safety e produtividade |
| Combinação | Setup instantâneo + código seguro |
`;
