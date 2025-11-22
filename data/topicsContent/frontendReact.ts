export const frontendReact = `# Frontend com React

## Estrutura do Projeto Frontend

O frontend é a camada de apresentação da aplicação, executada no navegador do usuário. No projeto da cantina, utilizamos React com Next.js.

## Comunicação Client-Server

### Fluxo de Requisição Completo

\`\`\`
[Navegador] → [Frontend React] → [Backend NestJS] → [PostgreSQL]
     ↓              ↓                    ↓               ↓
  Interface      Validação          Controllers      Database
  Usuário        Formulários        API Routes       Queries
\`\`\`

### Exemplo de Integração

\`\`\`typescript
// Frontend (React)
function ProductForm() {
  const [name, setName] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Frontend envia requisição HTTP
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${token}\`
      },
      body: JSON.stringify({ name, price: 10.50 })
    });
    
    // 2. Backend processa (NestJS Controller)
    // 3. Retorna resposta JSON
    const data = await response.json();
    
    console.log('Produto criado:', data);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button type="submit">Criar Produto</button>
    </form>
  );
}

// Backend (NestJS Controller)
@Controller('products')
export class ProductsController {
  @Post()
  async create(@Body() createDto: CreateProductDto) {
    // Processa e salva no banco
    return this.productsService.create(createDto);
  }
}
\`\`\`

## Componentes React

### Componentes Funcionais
\`\`\`typescript
// Componente simples
function Welcome({ name }) {
  return <h1>Olá, {name}!</h1>;
}

// Componente com estado
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  );
}
\`\`\`

## Hooks Principais

### 1. useState - Gerenciar Estado
\`\`\`typescript
const [value, setValue] = useState(initialValue);

// Exemplo
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);
\`\`\`

### 2. useEffect - Efeitos Colaterais
\`\`\`typescript
useEffect(() => {
  // Código executado após renderização
  fetchProducts();
}, [dependencies]); // Re-executa quando dependencies mudam

// Exemplo: buscar dados ao carregar componente
useEffect(() => {
  const loadProducts = async () => {
    const response = await fetch('http://localhost:3000/products');
    const data = await response.json();
    setProducts(data);
  };
  
  loadProducts();
}, []); // Array vazio = executa apenas uma vez
\`\`\`

### 3. useContext - Compartilhar Estado
\`\`\`typescript
// Criar contexto
const AuthContext = createContext();

// Provider
function App() {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Dashboard />
    </AuthContext.Provider>
  );
}

// Consumir contexto
function Dashboard() {
  const { user } = useContext(AuthContext);
  return <h1>Bem-vindo, {user?.name}</h1>;
}
\`\`\`

## Fetch API - Requisições HTTP

### GET - Buscar Dados
\`\`\`typescript
const response = await fetch('http://localhost:3000/products');
const products = await response.json();
\`\`\`

### POST - Criar Dados
\`\`\`typescript
const response = await fetch('http://localhost:3000/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'Pizza', price: 25.00 })
});
const newProduct = await response.json();
\`\`\`

### PATCH - Atualizar Dados
\`\`\`typescript
const response = await fetch(\`http://localhost:3000/products/\${id}\`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ price: 30.00 })
});
\`\`\`

### DELETE - Remover Dados
\`\`\`typescript
await fetch(\`http://localhost:3000/products/\${id}\`, {
  method: 'DELETE'
});
\`\`\`

## Estrutura de Pastas Frontend

\`\`\`
frontend/
├── app/
│   ├── page.tsx           # Página inicial (/)
│   ├── login/
│   │   └── page.tsx       # Página de login (/login)
│   └── produtos/
│       └── page.tsx       # Lista produtos (/produtos)
├── components/
│   ├── ProductCard.tsx    # Componente reutilizável
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   └── api.ts             # Funções de API
└── public/
    └── images/
\`\`\`

## Exemplo Completo: Lista de Produtos

\`\`\`typescript
'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar produtos ao carregar componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Deletar produto
  const handleDelete = async (id: number) => {
    try {
      await fetch(\`http://localhost:3000/products/\${id}\`, {
        method: 'DELETE'
      });
      
      // Atualiza lista removendo produto deletado
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Erro ao deletar produto');
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="container">
      <h1>Produtos</h1>
      
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>R$ {product.price.toFixed(2)}</p>
            <button onClick={() => handleDelete(product.id)}>
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

## Client Components vs Server Components (Next.js)

### Server Components (padrão)
\`\`\`typescript
// Executado no servidor, não no navegador
async function ProductsList() {
  const products = await fetch('http://localhost:3000/products');
  const data = await products.json();
  
  return (
    <div>
      {data.map(p => <div key={p.id}>{p.name}</div>)}
    </div>
  );
}
\`\`\`

### Client Components (com interatividade)
\`\`\`typescript
'use client'; // Diretiva obrigatória

import { useState } from 'react';

function InteractiveButton() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Cliques: {count}
    </button>
  );
}
\`\`\`

## Diferenças Frontend vs Backend

| Aspecto | Frontend | Backend |
|---------|----------|---------|
| **Execução** | Navegador do usuário | Servidor |
| **Linguagem** | JavaScript/TypeScript (React) | TypeScript (NestJS) |
| **Responsabilidade** | Interface, UX, validação visual | Lógica de negócio, segurança, banco |
| **Acesso a dados** | Requisições HTTP ao backend | Acesso direto ao banco de dados |
| **Segurança** | Código visível ao usuário | Código protegido no servidor |

## Dicas para a Prova

1. **Frontend comunica com backend via HTTP** (fetch API)
2. **React usa componentes** funcionais com hooks
3. **useState** gerencia estado local do componente
4. **useEffect** executa código após renderização
5. **Fetch API** faz requisições HTTP (GET, POST, PATCH, DELETE)
6. **Client Components** precisam da diretiva \`'use client'\`
7. **JSON** é o formato de dados entre frontend e backend
8. **Headers** incluem Content-Type e Authorization
`;
