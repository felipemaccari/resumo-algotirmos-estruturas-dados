export const cantinaProject = `## 📊 Projeto da Cantina

### Visão Geral do Sistema

O sistema de cantina é uma aplicação web completa para gestão de vendas, produtos, categorias e usuários.

### Módulos do Sistema:

#### 1. 🔐 Autenticação
**Funcionalidades**:
- Login de usuários
- Logout
- Registro de novos usuários
- Recuperação de senha
- Validação de tokens JWT

**Rotas**:
- \`POST /auth/login\` - Fazer login
- \`POST /auth/register\` - Criar conta
- \`POST /auth/logout\` - Sair do sistema
- \`GET /auth/me\` - Dados do usuário logado

#### 2. 📈 Dashboard
**Funcionalidades**:
- Visão geral das vendas
- Produtos mais vendidos
- Receita do dia/mês
- Estoque baixo (alertas)
- Gráficos e métricas

**Widgets Principais**:
- Total de vendas hoje
- Receita mensal
- Produtos em falta
- Categorias mais vendidas
- Performance de vendedores

#### 3. 💰 PDV (Ponto de Venda)
**Funcionalidades**:
- Adicionar produtos ao carrinho
- Calcular total da venda
- Aplicar descontos
- Processar pagamento
- Emitir comprovante
- Reduzir estoque automaticamente

**Fluxo de Venda**:
\`\`\`
1. Abrir nova venda
2. Buscar/escanear produto
3. Adicionar ao carrinho
4. Ajustar quantidade
5. Aplicar desconto (se necessário)
6. Selecionar forma de pagamento
7. Finalizar venda
8. Imprimir comprovante
\`\`\`

**Interface PDV**:
\`\`\`
┌─────────────────────┬──────────────────────┐
│  Buscar Produto     │   Carrinho           │
│  [_______________]  │                      │
│                     │  Coca-Cola  x2  10.00│
│  Categoria: Bebidas │  Salgado    x1   3.50│
│  ┌─────┬─────┬────┐ │  Pizza      x1   8.00│
│  │Coca │Guar.│Suco│ │                      │
│  └─────┴─────┴────┘ │  Subtotal:    21.50  │
│  ┌─────┬─────┬────┐ │  Desconto:     0.00  │
│  │Coxin│Paste│Pizza│ │  Total:       21.50  │
│  └─────┴─────┴────┘ │                      │
│                     │  [Finalizar Venda]   │
└─────────────────────┴──────────────────────┘
\`\`\`

#### 4. 📝 Cadastros
**Subcategorias**:

##### Produtos
- Criar novo produto
- Editar produto existente
- Excluir produto
- Listar todos produtos
- Buscar produtos
- Gerenciar estoque

**Campos de Produto**:
\`\`\`typescript
{
  nome: "Refrigerante Coca-Cola 2L",
  descricao: "Bebida gaseificada sabor cola",
  preco: 8.50,
  estoque: 100,
  categoriaId: 1,
  codigoBarras: "7894900011517",
  imagemUrl: "/produtos/coca-cola-2l.jpg"
}
\`\`\`

##### Categorias
- Criar nova categoria
- Editar categoria
- Excluir categoria (se sem produtos)
- Listar categorias

**Exemplos de Categorias**:
- Bebidas
- Salgados
- Doces
- Lanches
- Sucos
- Outros

##### Usuários
- Criar novo usuário
- Editar permissões
- Desativar usuário
- Listar usuários
- Definir roles (admin, vendedor, etc)

**Roles de Usuário**:
- **Admin**: Acesso completo
- **Gerente**: Cadastros + Relatórios
- **Vendedor**: Apenas PDV
- **Estoquista**: Apenas estoque

### Fluxo de Navegação Completo:

#### Para cadastrar novo refrigerante:
\`\`\`
1. Autenticação (Login)
   ↓
2. Menu → Cadastros
   ↓
3. Cadastros → Produtos
   ↓
4. Produtos → Novo Produto
   ↓
5. Preencher formulário:
   - Nome: "Refrigerante Coca-Cola"
   - Categoria: "Bebidas"
   - Preço: 5.00
   - Estoque: 50
   ↓
6. Salvar
\`\`\`

**Caminho resumido**: \`Autenticação → Cadastros → Produtos\`

### 5. 📊 Relatórios
**Tipos de Relatórios**:

##### Vendas
- Vendas por período
- Vendas por produto
- Vendas por categoria
- Vendas por vendedor
- Ticket médio

##### Estoque
- Produtos em estoque
- Produtos com estoque baixo
- Movimentação de estoque
- Previsão de reposição

##### Financeiro
- Receita por período
- Formas de pagamento
- Descontos concedidos
- Lucro bruto/líquido

**Filtros Disponíveis**:
- Data início/fim
- Categoria
- Produto específico
- Vendedor
- Forma de pagamento

### Arquitetura dos Módulos no NestJS:

\`\`\`
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   └── guards/
│       └── jwt-auth.guard.ts
├── produtos/
│   ├── produtos.controller.ts
│   ├── produtos.service.ts
│   ├── produtos.module.ts
│   └── dto/
│       ├── create-produto.dto.ts
│       └── update-produto.dto.ts
├── categorias/
│   ├── categorias.controller.ts
│   ├── categorias.service.ts
│   └── categorias.module.ts
├── usuarios/
│   ├── usuarios.controller.ts
│   ├── usuarios.service.ts
│   └── usuarios.module.ts
├── vendas/
│   ├── vendas.controller.ts
│   ├── vendas.service.ts
│   ├── vendas.module.ts
│   └── dto/
│       └── create-venda.dto.ts
└── relatorios/
    ├── relatorios.controller.ts
    ├── relatorios.service.ts
    └── relatorios.module.ts
\`\`\`

### Endpoints da API:

#### Autenticação
\`\`\`
POST   /auth/login
POST   /auth/register
POST   /auth/logout
GET    /auth/me
\`\`\`

#### Produtos
\`\`\`
GET    /produtos          - Listar todos
GET    /produtos/:id      - Buscar por ID
POST   /produtos          - Criar novo
PATCH  /produtos/:id      - Atualizar
DELETE /produtos/:id      - Deletar
GET    /produtos/categoria/:id - Por categoria
\`\`\`

#### Categorias
\`\`\`
GET    /categorias        - Listar todas
GET    /categorias/:id    - Buscar por ID
POST   /categorias        - Criar nova
PATCH  /categorias/:id    - Atualizar
DELETE /categorias/:id    - Deletar
\`\`\`

#### Vendas (PDV)
\`\`\`
POST   /vendas            - Registrar venda
GET    /vendas            - Listar vendas
GET    /vendas/:id        - Buscar venda
GET    /vendas/hoje       - Vendas de hoje
\`\`\`

#### Relatórios
\`\`\`
GET    /relatorios/vendas?inicio=2024-01&fim=2024-12
GET    /relatorios/estoque
GET    /relatorios/financeiro
\`\`\`

### Modelo de Dados Completo:

\`\`\`prisma
model Categoria {
  id        Int       @id @default(autoincrement())
  nome      String    @db.VarChar(100)
  descricao String?   @db.Text
  produtos  Produto[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Produto {
  id            Int           @id @default(autoincrement())
  nome          String        @db.VarChar(200)
  descricao     String?       @db.Text
  preco         Decimal       @db.Decimal(10, 2)
  estoque       Int           @default(0)
  codigoBarras  String?       @unique
  imagemUrl     String?
  categoriaId   Int
  categoria     Categoria     @relation(fields: [categoriaId], references: [id])
  itensVenda    ItemVenda[]
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model Usuario {
  id         Int      @id @default(autoincrement())
  nome       String   @db.VarChar(200)
  email      String   @unique @db.VarChar(200)
  senhaHash  String   @db.VarChar(255)
  role       String   @default("vendedor")
  ativo      Boolean  @default(true)
  vendas     Venda[]
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Venda {
  id              Int         @id @default(autoincrement())
  usuarioId       Int
  usuario         Usuario     @relation(fields: [usuarioId], references: [id])
  total           Decimal     @db.Decimal(10, 2)
  desconto        Decimal     @default(0) @db.Decimal(10, 2)
  formaPagamento  String      @db.VarChar(50)
  itens           ItemVenda[]
  createdAt       DateTime    @default(now())
}

model ItemVenda {
  id         Int      @id @default(autoincrement())
  vendaId    Int
  venda      Venda    @relation(fields: [vendaId], references: [id])
  produtoId  Int
  produto    Produto  @relation(fields: [produtoId], references: [id])
  quantidade Int
  precoUnit  Decimal  @db.Decimal(10, 2)
  subtotal   Decimal  @db.Decimal(10, 2)
}
\`\`\`

### Regras de Negócio Importantes:

1. **Estoque**: Ao finalizar venda, reduzir estoque automaticamente
2. **Preço**: Armazenar preço no item da venda (caso mude depois)
3. **Desconto**: Máximo de 20% sem autorização de gerente
4. **Exclusão**: Não deletar categorias com produtos
5. **Inativação**: Usuários inativos não podem fazer login
6. **Estoque Mínimo**: Alertar quando < 10 unidades

### Validações:

\`\`\`typescript
// CreateProdutoDto
export class CreateProdutoDto {
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNumber()
  @Min(0)
  preco: number;

  @IsNumber()
  @Min(0)
  estoque: number;

  @IsNumber()
  categoriaId: number;

  @IsOptional()
  @IsString()
  codigoBarras?: string;
}
\`\`\`

### Funcionalidades Extras:

- **Busca Rápida**: Autocomplete na busca de produtos
- **Scanner**: Integração com leitor de código de barras
- **Impressora**: Impressão de comprovantes
- **Backup**: Backup automático diário
- **Logs**: Auditoria de todas ações
- **Notificações**: Alertas de estoque baixo

### Resumo dos Módulos:

| Módulo | Função Principal | Usuários |
|--------|-----------------|----------|
| Autenticação | Login/Segurança | Todos |
| Dashboard | Visão Geral | Admin, Gerente |
| PDV | Realizar Vendas | Vendedor, Admin |
| Cadastros | Gerenciar Dados | Admin, Gerente |
| Relatórios | Análises | Admin, Gerente |

### Fluxo de Uso Diário:

\`\`\`
08:00 - Vendedor faz login
08:01 - Acessa PDV
08:05 - Primeira venda do dia
...
12:00 - Gerente acessa Relatórios → Vendas Manhã
14:00 - Admin cadastra novos produtos
16:00 - Sistema alerta estoque baixo
17:00 - Gerente faz pedido de reposição
18:00 - Fechamento do caixa
\`\`\`
`;
