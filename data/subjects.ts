import { Topic } from "@/app/page";
import { algorythms } from "./topicsContent/algorythms";
import { programmingLanguages } from "./topicsContent/programmingLanguages";
import { variables } from "./topicsContent/variables";
import { aritmeticOperators } from "./topicsContent/aritmeticOperators";
import { relationalOperators } from "./topicsContent/relationalOperators";
import { logicalOperators } from "./topicsContent/logicalOperators";
import { compilersInterpreters } from "./topicsContent/compilersInterpreters";
import { constants } from "./topicsContent/constants";
import { conditionals } from "./topicsContent/conditionals";
import { stringMethod } from "./topicsContent/stringMethod";
import { mathMethod } from "./topicsContent/mathMethod";
import { loops } from "./topicsContent/loops";
import { loopsWhileMethod } from "./topicsContent/loopsWhileMethod";

export interface Subject {
  id: string;
  name: string;
  description: string;
  topics: Topic[];
}

export const subjects: Subject[] = [
  {
    id: "algoritmos-estruturas-dados",
    name: "Algoritmos e Estruturas de Dados",
    description: "Fundamentos de algoritmos, estruturas de dados e programação",
    topics: [
      {
        id: 5,
        title: "Algoritmos",
        description: "Introdução aos algoritmos",
        content: algorythms,
        tags: ["algoritmos", "lógica", "programação"],
      },
      {
        id: 6,
        title: "Linguagens de Programação",
        description: "Tipos de linguagens e suas características",
        content: programmingLanguages,
        tags: ["linguagens", "programação", "tipos"],
      },
      {
        id: 7,
        title: "Variáveis",
        description: "Definição e uso de variáveis",
        content: variables,
        tags: ["variáveis", "programação", "dados"],
      },
      {
        id: 17,
        title: "Constantes",
        description: "Definição e uso de constantes",
        content: constants,
        tags: ["constantes", "programação", "dados"],
      },
      {
        id: 8,
        title: "Operadores Aritméticos",
        description: "Uso de operadores matemáticos",
        content: aritmeticOperators,
        tags: ["operadores", "aritméticos", "matemática"],
      },
      {
        id: 9,
        title: "Operadores Relacionais",
        description: "Comparação entre valores",
        content: relationalOperators,
        tags: ["operadores", "relacionais", "comparação"],
      },
      {
        id: 10,
        title: "Operadores Lógicos",
        description: "Condições e expressões lógicas",
        content: logicalOperators,
        tags: ["operadores", "lógicos", "condições"],
      },
      {
        id: 11,
        title: "Compiladores e Interpretadores",
        description: "Diferença entre compiladores e interpretadores",
        content: compilersInterpreters,
        tags: ["compiladores", "interpretadores", "execução"],
      },
      {
        id: 12,
        title: "Estruturas Condicionais",
        description: "Exemplos práticos de IF e Switch-Case",
        content: conditionals,
        tags: ["condicional", "if", "switch-case"],
      },
      {
        id: 14,
        title: "Método String",
        description: "Manipulação de strings",
        content: stringMethod,
        tags: ["strings", "texto", "manipulação"],
      },
      {
        id: 15,
        title: "Método Math",
        description: "Operações matemáticas em programação",
        content: mathMethod,
        tags: ["matemática", "cálculo", "math"],
      },
      {
        id: 16,
        title: "Laços de Repetição - For",
        description: "Uso do laço de repetição For",
        content: loops,
        tags: ["for", "loop", "repetição"],
      },
      {
        id: 18,
        title: "Laços de Repetição - Do, Do-While",
        description: "Uso dos laços de repetição Do e Do-While",
        content: loopsWhileMethod,
        tags: ["for", "loop", "do", "do-while", "repetição"],
      },
    ],
  },
  {
    id: "projeto-integrador-extensionista",
    name: "Projeto Integrador Extensionista",
    description:
      "Desenvolvimento de projetos extensionistas e integração comunitária",
    topics: [
      {
        id: 20,
        title: "Fluxo de Requisições Web",
        description:
          "Processo completo de requisições web do cliente ao servidor",
        content: `## 🌐 Fluxo de Requisições Web

### Processo Completo:
1. **Cliente/Browser** - Digita URL no navegador
2. **Servidor DNS** - Resolve o domínio para IP
3. **Servidor Backend** - Recebe requisição e retorna arquivos (HTML, CSS, JS)

### Detalhamento:
- O navegador envia uma requisição HTTP para o servidor
- O DNS converte o nome do domínio em um endereço IP
- O servidor processa a requisição e retorna os recursos necessários
- O navegador renderiza a página com os arquivos recebidos`,
        tags: ["web", "requisições", "http", "dns"],
      },
      {
        id: 21,
        title: "Arquitetura do Sistema",
        description: "Tecnologias e estrutura do sistema de cantina",
        content: `## 🏗️ Arquitetura do Sistema

### Tecnologias Principais:
- **Backend**: NestJS (Framework Node.js)
- **Banco de Dados**: PostgreSQL (Relacional)
- **ORM**: Prisma
- **Containerização**: Docker + Docker Compose
- **Arquitetura**: REST API

### Estrutura NestJS:
- **Controller** - Recebe requisições HTTP, processa parâmetros e retorna respostas
- **Service** - Contém lógica de negócio, validações e interação com banco
- **Module** - Agrupa controllers e providers por domínio

### Vantagens da Arquitetura:
- Separação clara de responsabilidades
- Facilita manutenção e testes
- Escalabilidade e performance`,
        tags: ["arquitetura", "nestjs", "postgresql", "prisma", "docker"],
      },
      {
        id: 22,
        title: "Banco de Dados PostgreSQL",
        description: "Estrutura e relacionamentos do banco de dados",
        content: `## 🗄️ Banco de Dados

### Por que PostgreSQL?
- Estrutura baseada em tabelas com colunas e tipos definidos
- Garante consistência e integridade dos dados
- Ideal para módulo de "Cadastros" (Produtos, Categorias, Usuários)

### Relacionamentos Principais:
- **Produtos ↔ Categorias**: Um-para-muitos (1:N)
  - Uma categoria pode ter vários produtos

### Vantagens do Banco Relacional:
- ACID (Atomicidade, Consistência, Isolamento, Durabilidade)
- Integridade referencial
- Consultas complexas com JOINs
- Padronização de dados`,
        tags: ["postgresql", "banco-dados", "relacional", "relacionamentos"],
      },
      {
        id: 23,
        title: "Ferramentas de Desenvolvimento",
        description: "Docker Compose e Prisma para desenvolvimento",
        content: `## 🔧 Ferramentas de Desenvolvimento

### Docker Compose - Vantagens:
- Ambiente padronizado para toda equipe
- Isolamento de dependências
- Facilita setup do backend + PostgreSQL
- Reprodutibilidade entre ambientes

### Prisma:
- **Comando para migrations**: \`npx prisma migrate dev\`
- **Sintaxe para buscar por ID**: \`prisma.produto.findUnique({ where: { id } })\`

### Comandos Úteis:
- \`docker-compose up\` - Inicia os serviços
- \`docker-compose down\` - Para os serviços
- \`npx prisma studio\` - Interface visual do banco`,
        tags: ["docker", "prisma", "desenvolvimento", "migrations"],
      },
      {
        id: 24,
        title: "Ambientes e Deploy",
        description: "Ambientes de desenvolvimento e CI/CD",
        content: `## 🚀 Ambientes e Deploy

### Ambientes de Desenvolvimento:
- **Desenvolvimento** - Máquina local
- **Homologação** - Testes em cenário controlado similar ao real
- **Produção** - Ambiente final para clientes

### CI/CD (Integração/Entrega Contínua):
**Objetivo**: Automatizar build, testes e deploy para maior agilidade e segurança

### Benefícios do CI/CD:
- Deploy automatizado
- Testes contínuos
- Redução de erros
- Entrega mais rápida`,
        tags: ["deploy", "ci-cd", "ambientes", "produção"],
      },
      {
        id: 25,
        title: "Autenticação e Segurança",
        description: "Sistema de autenticação com JWT",
        content: `## 🔐 Autenticação e Segurança

### Token JWT (JSON Web Token):
**Função**: Cliente envia em requisições futuras para comprovar identidade, sem reenviar credenciais

### Como Funciona:
1. Usuário faz login com credenciais
2. Servidor valida e gera JWT
3. Cliente armazena o token
4. Token é enviado em requisições futuras
5. Servidor valida o token

### Vantagens do JWT:
- Stateless (sem estado no servidor)
- Seguro e criptografado
- Padrão da indústria
- Escalável`,
        tags: ["jwt", "autenticação", "segurança", "token"],
      },
      {
        id: 26,
        title: "Projeto da Cantina",
        description: "Módulos e fluxo do sistema de cantina",
        content: `## 📊 Projeto da Cantina

### Fluxo de Navegação:
**Para cadastrar novo refrigerante**:
\`Autenticação → Cadastros → Produtos\`

### Módulos do Sistema:
- **Autenticação** - Login/logout
- **Dashboard** - Visão geral
- **PDV** - Ponto de venda
- **Cadastros** - Produtos, categorias, usuários
- **Relatórios** - Dados analíticos

### Funcionalidades Principais:
- Gestão de produtos e categorias
- Sistema de vendas (PDV)
- Controle de usuários
- Relatórios de vendas
- Autenticação segura`,
        tags: ["cantina", "pdv", "cadastros", "relatórios", "dashboard"],
      },
      {
        id: 27,
        title: "API REST",
        description: "Padrões e verbos HTTP para APIs",
        content: `## 🌍 API REST

### Verbos HTTP por Ação:
- **GET** - Buscar dados
- **POST** - Criar novos recursos
- **PATCH/PUT** - Atualizar recursos
- **DELETE** - Remover recursos

### Exemplos de Endpoints:
- \`GET /produtos\` - Listar produtos
- \`POST /produtos\` - Criar produto
- \`PATCH /produtos/:id\` - Atualizar produto
- \`DELETE /produtos/:id\` - Deletar produto

### Princípios REST:
- Stateless
- Cacheable
- Client-Server
- Uniform Interface
- Layered System`,
        tags: ["api", "rest", "http", "endpoints", "verbos"],
      },
      {
        id: 28,
        title: "Conceitos-Chave",
        description: "Resumo dos principais conceitos da disciplina",
        content: `## 💡 Conceitos-Chave Revisados

1. **ORM** - Permite escrever queries em JavaScript/TypeScript sem SQL manual
2. **Ambientes separados** - Testes seguros antes da produção  
3. **Banco relacional** - Estrutura consistente para dados estruturados
4. **Docker** - Padronização e isolamento de ambiente
5. **JWT** - Autenticação stateless moderna
6. **REST** - Padrão para APIs web escaláveis

### Resumo da Arquitetura:
- **Frontend** → **API REST** → **Backend NestJS** → **PostgreSQL**
- **Docker** para containerização
- **Prisma** como ORM
- **JWT** para autenticação
- **CI/CD** para deploy automatizado`,
        tags: ["conceitos", "resumo", "arquitetura", "tecnologias"],
      },
    ],
  },
];

export function getSubjectById(subjectId: string): Subject | undefined {
  return subjects.find((subject) => subject.id === subjectId);
}

export function searchTopicsInSubject(
  subjectId: string,
  searchTerm: string
): Topic[] {
  const subject = getSubjectById(subjectId);
  if (!subject) return [];

  if (!searchTerm) return subject.topics;

  const normalizedSearch = searchTerm.toLowerCase();

  return subject.topics.filter((topic) => {
    const titleMatch = topic.title.toLowerCase().includes(normalizedSearch);
    const descriptionMatch = topic.description
      .toLowerCase()
      .includes(normalizedSearch);
    const contentMatch = topic.content.toLowerCase().includes(normalizedSearch);

    return titleMatch || descriptionMatch || contentMatch;
  });
}
