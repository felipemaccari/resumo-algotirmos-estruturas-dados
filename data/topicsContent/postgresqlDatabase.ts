export const postgresqlDatabase = `## 🗄️ Banco de Dados PostgreSQL

### Por que PostgreSQL?

O PostgreSQL foi escolhido para o projeto da cantina por várias razões:

#### ✅ Banco Relacional Robusto
- Estrutura baseada em **tabelas** com **colunas** e **tipos definidos**
- Garante consistência e integridade dos dados
- ACID compliant (Atomicidade, Consistência, Isolamento, Durabilidade)

#### ✅ Ideal para Dados Estruturados
- Perfeito para módulo de "Cadastros" (Produtos, Categorias, Usuários)
- Schema bem definido
- Validações a nível de banco

#### ✅ Maduro e Confiável
- Open source e gratuito
- Comunidade ativa
- Performance excelente
- Amplamente utilizado na indústria

### Estrutura de Tabelas do Projeto:

#### Tabela: Categorias
\`\`\`sql
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### Tabela: Produtos
\`\`\`sql
CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10, 2) NOT NULL,
  estoque INTEGER NOT NULL DEFAULT 0,
  categoria_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);
\`\`\`

#### Tabela: Usuários
\`\`\`sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Relacionamentos no Banco:

#### 📊 Produtos ↔ Categorias: Um-para-Muitos (1:N)

**Definição**: Uma categoria pode ter **vários produtos**, mas cada produto pertence a **apenas uma categoria**.

\`\`\`
Categorias (1)          Produtos (N)
┌─────────────┐        ┌──────────────┐
│ id: 1       │◄───┬───│ id: 1        │
│ nome: Bebidas│     │   │ categoria_id: 1│
└─────────────┘     ├───│ id: 2        │
                    │   │ categoria_id: 1│
                    └───│ id: 3        │
                        │ categoria_id: 1│
                        └──────────────┘
\`\`\`

**Exemplo Prático**:
\`\`\`javascript
// Categoria: Bebidas
{
  id: 1,
  nome: "Bebidas",
  produtos: [
    { id: 1, nome: "Coca-Cola", preco: 5.00 },
    { id: 2, nome: "Guaraná", preco: 4.50 },
    { id: 3, nome: "Suco", preco: 4.00 }
  ]
}

// Categoria: Salgados
{
  id: 2,
  nome: "Salgados",
  produtos: [
    { id: 4, nome: "Coxinha", preco: 3.50 },
    { id: 5, nome: "Pastel", preco: 4.00 }
  ]
}
\`\`\`

### Schema Prisma:

\`\`\`prisma
// schema.prisma

model Categoria {
  id          Int       @id @default(autoincrement())
  nome        String    @db.VarChar(100)
  descricao   String?   @db.Text
  produtos    Produto[]
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  @@map("categorias")
}

model Produto {
  id           Int        @id @default(autoincrement())
  nome         String     @db.VarChar(200)
  descricao    String?    @db.Text
  preco        Decimal    @db.Decimal(10, 2)
  estoque      Int        @default(0)
  categoriaId  Int        @map("categoria_id")
  categoria    Categoria  @relation(fields: [categoriaId], references: [id])
  createdAt    DateTime   @default(now()) @map("created_at")
  updatedAt    DateTime   @updatedAt @map("updated_at")

  @@map("produtos")
}

model Usuario {
  id         Int      @id @default(autoincrement())
  nome       String   @db.VarChar(200)
  email      String   @unique @db.VarChar(200)
  senhaHash  String   @map("senha_hash") @db.VarChar(255)
  role       String   @default("user") @db.VarChar(50)
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @updatedAt @map("updated_at")

  @@map("usuarios")
}
\`\`\`

### Vantagens do Banco Relacional:

#### 1. ACID
- **Atomicidade**: Transações completas ou nada
- **Consistência**: Dados sempre válidos
- **Isolamento**: Transações independentes
- **Durabilidade**: Dados persistidos permanentemente

#### 2. Integridade Referencial
\`\`\`sql
-- Não permite deletar categoria com produtos
DELETE FROM categorias WHERE id = 1;
-- Erro: viola foreign key constraint
\`\`\`

#### 3. Consultas Complexas com JOINs
\`\`\`sql
-- Buscar produtos com suas categorias
SELECT 
  p.id, 
  p.nome AS produto_nome, 
  p.preco,
  c.nome AS categoria_nome
FROM produtos p
INNER JOIN categorias c ON p.categoria_id = c.id
WHERE p.preco > 3.00
ORDER BY p.preco DESC;
\`\`\`

#### 4. Normalização de Dados
- Elimina redundância
- Mantém consistência
- Facilita atualizações

### Tipos de Dados PostgreSQL:

- **INTEGER**: Números inteiros
- **SERIAL**: Auto-incremento
- **VARCHAR(n)**: Texto com tamanho máximo
- **TEXT**: Texto sem limite
- **DECIMAL(p,s)**: Números decimais precisos
- **BOOLEAN**: Verdadeiro/Falso
- **TIMESTAMP**: Data e hora
- **JSON/JSONB**: Dados JSON

### Índices para Performance:

\`\`\`sql
-- Criar índice para busca rápida
CREATE INDEX idx_produtos_nome ON produtos(nome);
CREATE INDEX idx_produtos_categoria ON produtos(categoria_id);

-- Busca muito mais rápida
SELECT * FROM produtos WHERE nome LIKE 'Coca%';
\`\`\`

### Consultas Úteis:

\`\`\`sql
-- Listar produtos por categoria
SELECT 
  c.nome AS categoria,
  COUNT(p.id) AS total_produtos,
  AVG(p.preco) AS preco_medio
FROM categorias c
LEFT JOIN produtos p ON c.id = p.categoria_id
GROUP BY c.id, c.nome;

-- Produtos mais vendidos (exemplo com tabela vendas)
SELECT 
  p.nome,
  SUM(v.quantidade) AS total_vendido
FROM produtos p
INNER JOIN vendas v ON p.id = v.produto_id
GROUP BY p.id, p.nome
ORDER BY total_vendido DESC
LIMIT 10;

-- Produtos com estoque baixo
SELECT nome, estoque
FROM produtos
WHERE estoque < 10
ORDER BY estoque ASC;
\`\`\`

### Boas Práticas:

1. **Sempre use transações** para operações críticas
2. **Crie índices** em colunas frequentemente buscadas
3. **Normalize os dados** para evitar redundância
4. **Use foreign keys** para manter integridade
5. **Faça backups regulares** dos dados
6. **Monitore performance** das queries
`;
