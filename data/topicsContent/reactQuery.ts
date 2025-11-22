export const reactQuery = `# React Query

## O que é React Query?

**React Query** (TanStack Query) é uma biblioteca poderosa para gerenciamento de estado assíncrono em aplicações React. Ela simplifica o processo de buscar, cachear, sincronizar e atualizar dados do servidor.

## Por que usar React Query?

### Sem React Query:
\`\`\`typescript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('/api/products')
    .then(res => res.json())
    .then(data => {
      setData(data);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
}, []);
\`\`\`

### Com React Query:
\`\`\`typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['products'],
  queryFn: () => fetch('/api/products').then(res => res.json())
});
\`\`\`

## Principais Conceitos

### 1. useQuery - Buscar Dados
\`\`\`typescript
import { useQuery } from '@tanstack/react-query';

function ProductList() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/products');
      return response.json();
    },
    staleTime: 5000, // Dados considerados "frescos" por 5 segundos
    cacheTime: 10 * 60 * 1000, // Cache mantido por 10 minutos
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      {data.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
      <button onClick={() => refetch()}>Atualizar</button>
    </div>
  );
}
\`\`\`

### 2. useMutation - Modificar Dados
\`\`\`typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreateProduct() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async (newProduct) => {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalida e refaz a query de produtos
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {mutation.isLoading && <p>Salvando...</p>}
      {mutation.isError && <p>Erro: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Produto criado!</p>}
    </form>
  );
}
\`\`\`

## Configuração no Projeto

### 1. Instalar React Query
\`\`\`bash
npm install @tanstack/react-query
\`\`\`

### 2. Configurar Provider
\`\`\`typescript
// app/layout.tsx ou main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 10 * 60 * 1000, // 10 minutos
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
\`\`\`

## Benefícios do React Query

### 1. **Cache Automático**
- Dados são armazenados em cache automaticamente
- Evita requisições desnecessárias ao backend

### 2. **Refetch Automático**
- Atualiza dados quando a janela ganha foco
- Revalida dados em intervalos configuráveis

### 3. **Estados Integrados**
- \`isLoading\`: primeira carga
- \`isFetching\`: qualquer busca em andamento
- \`isError\`: ocorreu um erro
- \`isSuccess\`: dados carregados com sucesso

### 4. **Otimistic Updates**
\`\`\`typescript
const mutation = useMutation({
  mutationFn: updateProduct,
  onMutate: async (newData) => {
    // Cancela queries em andamento
    await queryClient.cancelQueries({ queryKey: ['products'] });
    
    // Salva o estado anterior
    const previousData = queryClient.getQueryData(['products']);
    
    // Atualiza otimisticamente
    queryClient.setQueryData(['products'], (old) => 
      old.map(p => p.id === newData.id ? newData : p)
    );
    
    return { previousData };
  },
  onError: (err, newData, context) => {
    // Reverte em caso de erro
    queryClient.setQueryData(['products'], context.previousData);
  },
  onSettled: () => {
    // Revalida após sucesso ou erro
    queryClient.invalidateQueries({ queryKey: ['products'] });
  },
});
\`\`\`

## Query Keys

Query keys identificam e organizam suas queries:

\`\`\`typescript
// Query simples
useQuery({ queryKey: ['products'] });

// Query com parâmetros
useQuery({ 
  queryKey: ['product', id],
  queryFn: () => fetchProduct(id) 
});

// Query com filtros
useQuery({ 
  queryKey: ['products', { category: 'electronics', page: 1 }],
  queryFn: () => fetchProducts({ category: 'electronics', page: 1 })
});
\`\`\`

## Exemplo Completo: CRUD de Produtos

\`\`\`typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function ProductsPage() {
  const queryClient = useQueryClient();

  // Buscar produtos
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/products');
      return res.json();
    },
  });

  // Criar produto
  const createMutation = useMutation({
    mutationFn: (newProduct) =>
      fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Deletar produto
  const deleteMutation = useMutation({
    mutationFn: (id) =>
      fetch(\`http://localhost:3000/products/\${id}\`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div>
      <button onClick={() => createMutation.mutate({ name: 'Novo Produto' })}>
        Criar Produto
      </button>
      
      {products?.map(product => (
        <div key={product.id}>
          <span>{product.name}</span>
          <button onClick={() => deleteMutation.mutate(product.id)}>
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
}
\`\`\`

## Diferenças vs useState + useEffect

| Aspecto | useState + useEffect | React Query |
|---------|---------------------|-------------|
| Código necessário | Muito (states, loading, error) | Mínimo |
| Cache | Manual | Automático |
| Refetch | Manual | Automático |
| Otimistic Updates | Complicado | Simples |
| Loading states | Manual | Integrado |
| Error handling | Manual | Integrado |

## Dicas para a Prova

1. **React Query simplifica gerenciamento de dados assíncronos**
2. **useQuery** para buscar dados (GET)
3. **useMutation** para modificar dados (POST, PUT, DELETE)
4. **queryKey** identifica cada query
5. **invalidateQueries** força refetch após mutations
6. **Cache automático** evita requisições desnecessárias
7. **Estados integrados**: isLoading, isError, isSuccess
`;
