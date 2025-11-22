export const reactHookForm = `# React Hook Form e Validação

## React Hook Form

**React Hook Form** é uma biblioteca para gerenciar formulários em React de forma performática e com validação integrada.

## Por que usar React Hook Form?

### Sem React Hook Form:
\`\`\`typescript
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação manual...
    if (!name) setErrors({ name: 'Nome obrigatório' });
    // Mais código...
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      {errors.name && <span>{errors.name}</span>}
      {/* Repetir para cada campo... */}
    </form>
  );
}
\`\`\`

### Com React Hook Form:
\`\`\`typescript
import { useForm } from 'react-hook-form';

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data); // { name: '...', email: '...' }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: 'Nome obrigatório' })} />
      {errors.name && <span>{errors.name.message}</span>}
      
      <input {...register('email', { 
        required: 'Email obrigatório',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
          message: 'Email inválido'
        }
      })} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <button type="submit">Enviar</button>
    </form>
  );
}
\`\`\`

## Zod - Schema Validation

**Zod** é uma biblioteca TypeScript-first para validação de schemas e tipos.

### Exemplo com Zod
\`\`\`typescript
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Definir schema de validação
const productSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  price: z.number()
    .positive('Preço deve ser positivo')
    .min(0.01, 'Preço mínimo é R$ 0,01'),
  categoryId: z.number()
    .int('Categoria deve ser um número inteiro')
    .positive('Selecione uma categoria'),
  description: z.string().optional(),
});

// Inferir tipo TypeScript do schema
type ProductFormData = z.infer<typeof productSchema>;

function ProductForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormData) => {
    // Data já validada e tipada!
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    console.log('Produto criado:', result);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nome do Produto</label>
        <input {...register('name')} />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div>
        <label>Preço</label>
        <input 
          type="number" 
          step="0.01"
          {...register('price', { valueAsNumber: true })} 
        />
        {errors.price && <span className="error">{errors.price.message}</span>}
      </div>

      <div>
        <label>Categoria</label>
        <select {...register('categoryId', { valueAsNumber: true })}>
          <option value="">Selecione...</option>
          <option value="1">Bebidas</option>
          <option value="2">Lanches</option>
        </select>
        {errors.categoryId && <span className="error">{errors.categoryId.message}</span>}
      </div>

      <div>
        <label>Descrição (opcional)</label>
        <textarea {...register('description')} />
      </div>

      <button type="submit">Criar Produto</button>
    </form>
  );
}
\`\`\`

## Validações Comuns com Zod

### String
\`\`\`typescript
z.string()
  .min(3, 'Mínimo 3 caracteres')
  .max(100, 'Máximo 100 caracteres')
  .email('Email inválido')
  .url('URL inválida')
  .regex(/^[A-Z0-9]+$/, 'Apenas letras maiúsculas e números')
  .optional() // Campo não obrigatório
  .nullable() // Aceita null
  .default('valor padrão')
\`\`\`

### Number
\`\`\`typescript
z.number()
  .positive('Deve ser positivo')
  .negative('Deve ser negativo')
  .int('Deve ser inteiro')
  .min(0, 'Mínimo é 0')
  .max(100, 'Máximo é 100')
\`\`\`

### Boolean
\`\`\`typescript
z.boolean()
  .default(false)
\`\`\`

### Date
\`\`\`typescript
z.date()
  .min(new Date('2024-01-01'), 'Data deve ser após 2024')
  .max(new Date(), 'Data não pode ser futura')
\`\`\`

### Array
\`\`\`typescript
z.array(z.string())
  .min(1, 'Selecione pelo menos um item')
  .max(5, 'Máximo 5 itens')
\`\`\`

### Enum
\`\`\`typescript
z.enum(['ADMIN', 'USER', 'GUEST'])
\`\`\`

## Integração Completa: React Hook Form + Zod + React Query

\`\`\`typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Schema
const productSchema = z.object({
  name: z.string().min(3).max(50),
  price: z.number().positive(),
  categoryId: z.number().int().positive(),
});

type ProductFormData = z.infer<typeof productSchema>;

export function CreateProductForm() {
  const queryClient = useQueryClient();
  
  // React Hook Form
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      reset(); // Limpa formulário
      alert('Produto criado com sucesso!');
    },
    onError: (error) => {
      alert(\`Erro: \${error.message}\`);
    },
  });

  const onSubmit = (data: ProductFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input 
          {...register('name')} 
          placeholder="Nome do produto"
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <input 
          type="number" 
          step="0.01"
          {...register('price', { valueAsNumber: true })} 
          placeholder="Preço"
        />
        {errors.price && <span>{errors.price.message}</span>}
      </div>

      <div>
        <select {...register('categoryId', { valueAsNumber: true })}>
          <option value="">Selecione categoria...</option>
          <option value="1">Bebidas</option>
          <option value="2">Lanches</option>
        </select>
        {errors.categoryId && <span>{errors.categoryId.message}</span>}
      </div>

      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Salvando...' : 'Criar Produto'}
      </button>
    </form>
  );
}
\`\`\`

## Configuração do Projeto

### 1. Instalar Dependências
\`\`\`bash
npm install react-hook-form @hookform/resolvers zod
npm install @tanstack/react-query
\`\`\`

### 2. Estrutura Recomendada
\`\`\`
frontend/
├── schemas/
│   └── product.schema.ts    # Schemas Zod
├── components/
│   └── forms/
│       └── ProductForm.tsx  # Formulários
└── lib/
    └── api.ts               # Funções de API
\`\`\`

## Benefícios da Validação no Frontend

1. **Feedback Imediato** - Usuário vê erros antes de enviar
2. **Menos Requisições** - Evita enviar dados inválidos
3. **Melhor UX** - Validação em tempo real
4. **Type Safety** - TypeScript verifica tipos em tempo de desenvolvimento

## Validação Frontend vs Backend

### Frontend (React Hook Form + Zod)
- ✅ Validação imediata
- ✅ Feedback visual
- ⚠️ Pode ser burlada (usuário pode desabilitar JavaScript)

### Backend (NestJS + class-validator)
- ✅ Segurança garantida
- ✅ Proteção contra dados maliciosos
- ✅ Sempre executada

**Importante**: Sempre validar em AMBOS frontend e backend!

## Dicas para a Prova

1. **React Hook Form** simplifica gerenciamento de formulários
2. **Zod** valida schemas de forma type-safe
3. **register()** conecta inputs ao formulário
4. **handleSubmit()** processa envio do formulário
5. **errors** contém mensagens de validação
6. **zodResolver** integra Zod com React Hook Form
7. **Validar sempre no frontend E backend** para segurança
8. **useMutation** do React Query integra com formulários
`;
