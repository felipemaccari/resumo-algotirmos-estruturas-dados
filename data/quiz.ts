export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // índice da resposta correta (0-based)
  explanation: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
}

export const pieQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual é a sequência correta do fluxo de requisições web?",
    options: [
      "Cliente → DNS → Servidor Backend",
      "DNS → Cliente → Servidor Backend",
      "Servidor Backend → DNS → Cliente",
      "Cliente → Servidor Backend → DNS",
    ],
    correctAnswer: 0,
    explanation:
      "O fluxo correto é: Cliente/Browser digita URL → Servidor DNS resolve domínio para IP → Servidor Backend recebe requisição e retorna arquivos.",
  },
  {
    id: 2,
    question: "Qual tecnologia é usada como ORM no projeto da cantina?",
    options: ["Sequelize", "Prisma", "TypeORM", "Mongoose"],
    correctAnswer: 1,
    explanation:
      "O Prisma é usado como ORM no projeto, permitindo escrever queries em JavaScript/TypeScript sem SQL manual.",
  },
  {
    id: 3,
    question:
      "Qual é o relacionamento entre Produtos e Categorias no banco de dados?",
    options: [
      "Muitos-para-muitos (N:N)",
      "Um-para-um (1:1)",
      "Um-para-muitos (1:N)",
      "Muitos-para-um (N:1)",
    ],
    correctAnswer: 2,
    explanation:
      "O relacionamento é Um-para-muitos (1:N), onde uma categoria pode ter vários produtos, mas cada produto pertence a apenas uma categoria.",
  },
  {
    id: 4,
    question: "Qual comando do Prisma é usado para criar migrations?",
    options: [
      "npx prisma generate",
      "npx prisma migrate dev",
      "npx prisma studio",
      "npx prisma db push",
    ],
    correctAnswer: 1,
    explanation:
      "O comando 'npx prisma migrate dev' é usado para criar e aplicar migrations no banco de dados.",
  },
  {
    id: 5,
    question: "Qual é o objetivo principal do CI/CD?",
    options: [
      "Criar interfaces de usuário",
      "Automatizar build, testes e deploy",
      "Gerenciar banco de dados",
      "Configurar autenticação",
    ],
    correctAnswer: 1,
    explanation:
      "O CI/CD (Integração/Entrega Contínua) tem como objetivo automatizar build, testes e deploy para maior agilidade e segurança.",
  },
  {
    id: 6,
    question: "Qual é a principal vantagem do JWT (JSON Web Token)?",
    options: [
      "É mais rápido que outros métodos",
      "É stateless (sem estado no servidor)",
      "É mais seguro que senhas",
      "É mais fácil de implementar",
    ],
    correctAnswer: 1,
    explanation:
      "A principal vantagem do JWT é ser stateless, ou seja, o servidor não precisa armazenar informações de sessão, tornando-o escalável.",
  },
  {
    id: 7,
    question:
      "Para cadastrar um novo refrigerante no sistema, qual é o fluxo de navegação correto?",
    options: [
      "Dashboard → Produtos → Cadastros",
      "Autenticação → Cadastros → Produtos",
      "PDV → Relatórios → Produtos",
      "Login → Dashboard → Relatórios",
    ],
    correctAnswer: 1,
    explanation:
      "O fluxo correto é: Autenticação → Cadastros → Produtos, conforme especificado no projeto da cantina.",
  },
  {
    id: 8,
    question: "Qual verbo HTTP é usado para buscar dados em uma API REST?",
    options: ["POST", "PUT", "GET", "DELETE"],
    correctAnswer: 2,
    explanation:
      "O verbo GET é usado para buscar/recuperar dados em APIs REST. POST para criar, PUT/PATCH para atualizar e DELETE para remover.",
  },
  {
    id: 9,
    question:
      "Qual é a principal vantagem do Docker Compose no desenvolvimento?",
    options: [
      "Torna o código mais rápido",
      "Cria ambiente padronizado para toda equipe",
      "Substitui o banco de dados",
      "Automatiza testes",
    ],
    correctAnswer: 1,
    explanation:
      "O Docker Compose cria um ambiente padronizado para toda equipe, facilitando o setup e garantindo consistência entre diferentes máquinas.",
  },
  {
    id: 10,
    question: "Qual é a arquitetura completa do sistema da cantina?",
    options: [
      "Frontend → API REST → Backend NestJS → PostgreSQL",
      "Frontend → PostgreSQL → NestJS → API REST",
      "PostgreSQL → Frontend → API REST → NestJS",
      "API REST → Frontend → PostgreSQL → NestJS",
    ],
    correctAnswer: 0,
    explanation:
      "A arquitetura completa é: Frontend → API REST → Backend NestJS → PostgreSQL, com Docker para containerização e Prisma como ORM.",
  },
  {
    id: 11,
    question: "Qual módulo do sistema é responsável pelo ponto de venda?",
    options: ["Dashboard", "PDV", "Cadastros", "Relatórios"],
    correctAnswer: 1,
    explanation:
      "O módulo PDV (Ponto de Venda) é responsável pelas operações de venda no sistema da cantina.",
  },
  {
    id: 12,
    question:
      "Qual é a principal característica de um banco de dados relacional como PostgreSQL?",
    options: [
      "Armazena dados em documentos",
      "Estrutura baseada em tabelas com colunas e tipos definidos",
      "Não precisa de schema",
      "É mais rápido que outros tipos",
    ],
    correctAnswer: 1,
    explanation:
      "Bancos relacionais como PostgreSQL têm estrutura baseada em tabelas com colunas e tipos definidos, garantindo consistência e integridade dos dados.",
  },
];

export const pieQuizProva2: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual é a sequência correta do fluxo de requisições web?",
    options: [
      "Cliente → DNS → Servidor Backend",
      "DNS → Cliente → Servidor Backend",
      "Servidor Backend → DNS → Cliente",
      "Cliente → Servidor Backend → DNS",
    ],
    correctAnswer: 0,
    explanation:
      "O fluxo correto é: Cliente/Browser digita URL → Servidor DNS resolve domínio para IP → Servidor Backend recebe requisição e retorna arquivos.",
  },
  {
    id: 2,
    question: "Na arquitetura NestJS, qual é a função do Controller?",
    options: [
      "Contém a lógica de negócio e validações",
      "Recebe requisições HTTP, processa parâmetros e retorna respostas",
      "Gerencia conexões com o banco de dados",
      "Agrupa providers por domínio",
    ],
    correctAnswer: 1,
    explanation:
      "O Controller é responsável por receber requisições HTTP, processar parâmetros e retornar respostas. A lógica de negócio fica no Service.",
  },
  {
    id: 3,
    question:
      "Qual é o relacionamento entre Produtos e Categorias no banco de dados?",
    options: [
      "Muitos-para-muitos (N:N)",
      "Um-para-um (1:1)",
      "Um-para-muitos (1:N)",
      "Muitos-para-um (N:1)",
    ],
    correctAnswer: 2,
    explanation:
      "O relacionamento é Um-para-muitos (1:N), onde uma categoria pode ter vários produtos, mas cada produto pertence a apenas uma categoria.",
  },
  {
    id: 4,
    question: "Qual comando do Prisma é usado para criar migrations?",
    options: [
      "npx prisma generate",
      "npx prisma migrate dev",
      "npx prisma studio",
      "npx prisma db push",
    ],
    correctAnswer: 1,
    explanation:
      "O comando 'npx prisma migrate dev' é usado para criar e aplicar migrations no banco de dados de desenvolvimento.",
  },
  {
    id: 5,
    question:
      "Qual é a principal vantagem do Docker Compose no desenvolvimento?",
    options: [
      "Torna o código mais rápido",
      "Cria ambiente padronizado para toda equipe",
      "Substitui o banco de dados",
      "Automatiza testes",
    ],
    correctAnswer: 1,
    explanation:
      "O Docker Compose cria um ambiente padronizado para toda equipe, facilitando o setup e garantindo consistência entre diferentes máquinas.",
  },
  {
    id: 6,
    question: "Qual é a função principal do JWT (JSON Web Token)?",
    options: [
      "Criptografar dados do banco",
      "Cliente envia em requisições para comprovar identidade",
      "Armazenar sessões no servidor",
      "Compilar código TypeScript",
    ],
    correctAnswer: 1,
    explanation:
      "O JWT permite que o cliente envie o token em requisições futuras para comprovar identidade, sem reenviar credenciais.",
  },
  {
    id: 7,
    question: "Qual é a principal vantagem do JWT ser stateless?",
    options: [
      "É mais rápido que outros métodos",
      "Servidor não precisa armazenar informações de sessão",
      "É mais seguro que senhas",
      "É mais fácil de implementar",
    ],
    correctAnswer: 1,
    explanation:
      "A principal vantagem do JWT ser stateless é que o servidor não precisa armazenar informações de sessão, tornando-o escalável.",
  },
  {
    id: 8,
    question:
      "Para cadastrar um novo refrigerante no sistema, qual é o fluxo de navegação correto?",
    options: [
      "Dashboard → Produtos → Cadastros",
      "Autenticação → Cadastros → Produtos",
      "PDV → Relatórios → Produtos",
      "Login → Dashboard → Relatórios",
    ],
    correctAnswer: 1,
    explanation:
      "O fluxo correto é: Autenticação → Cadastros → Produtos, conforme especificado no projeto da cantina.",
  },
  {
    id: 9,
    question: "Qual verbo HTTP é usado para buscar dados em uma API REST?",
    options: ["POST", "PUT", "GET", "DELETE"],
    correctAnswer: 2,
    explanation:
      "O verbo GET é usado para buscar/recuperar dados em APIs REST. POST para criar, PUT/PATCH para atualizar e DELETE para remover.",
  },
  {
    id: 10,
    question: "Qual é o objetivo principal do CI/CD?",
    options: [
      "Criar interfaces de usuário",
      "Automatizar build, testes e deploy",
      "Gerenciar banco de dados",
      "Configurar autenticação",
    ],
    correctAnswer: 1,
    explanation:
      "O CI/CD (Integração/Entrega Contínua) tem como objetivo automatizar build, testes e deploy para maior agilidade e segurança.",
  },
  {
    id: 11,
    question: "Por que PostgreSQL foi escolhido para o projeto da cantina?",
    options: [
      "É mais barato que outros bancos",
      "Estrutura baseada em tabelas com colunas e tipos definidos",
      "Não precisa de configuração",
      "É mais rápido que bancos NoSQL",
    ],
    correctAnswer: 1,
    explanation:
      "PostgreSQL foi escolhido por sua estrutura baseada em tabelas com colunas e tipos definidos, garantindo consistência e integridade dos dados.",
  },
  {
    id: 12,
    question: "Qual é a arquitetura completa do sistema da cantina?",
    options: [
      "Frontend → API REST → Backend NestJS → PostgreSQL",
      "Frontend → PostgreSQL → NestJS → API REST",
      "PostgreSQL → Frontend → API REST → NestJS",
      "API REST → Frontend → PostgreSQL → NestJS",
    ],
    correctAnswer: 0,
    explanation:
      "A arquitetura completa é: Frontend → API REST → Backend NestJS → PostgreSQL, com Docker para containerização e Prisma como ORM.",
  },
  {
    id: 13,
    question: "Na arquitetura NestJS, qual é a função do Service?",
    options: [
      "Recebe requisições HTTP",
      "Contém lógica de negócio, validações e interação com banco",
      "Define rotas da API",
      "Gerencia autenticação de usuários",
    ],
    correctAnswer: 1,
    explanation:
      "O Service contém a lógica de negócio, validações e interação com o banco de dados, mantendo o Controller focado apenas em roteamento HTTP.",
  },
  {
    id: 14,
    question: "Qual é a sintaxe do Prisma para buscar um produto por ID?",
    options: [
      "prisma.produto.findOne({ id })",
      "prisma.produto.findUnique({ where: { id } })",
      "prisma.produto.getById(id)",
      "prisma.produto.find({ id })",
    ],
    correctAnswer: 1,
    explanation:
      "A sintaxe correta do Prisma é: prisma.produto.findUnique({ where: { id } }) para buscar um registro único por ID.",
  },
  {
    id: 15,
    question: "Quais são os três ambientes de desenvolvimento no projeto?",
    options: [
      "Local, Teste, Cloud",
      "Desenvolvimento, Homologação, Produção",
      "Dev, Beta, Release",
      "Staging, Testing, Live",
    ],
    correctAnswer: 1,
    explanation:
      "Os três ambientes são: Desenvolvimento (local), Homologação (staging para testes) e Produção (ambiente final para clientes).",
  },
  {
    id: 16,
    question:
      "Qual módulo do sistema da cantina é responsável pelo ponto de venda?",
    options: ["Dashboard", "PDV", "Cadastros", "Relatórios"],
    correctAnswer: 1,
    explanation:
      "O módulo PDV (Ponto de Venda) é responsável pelas operações de venda no sistema da cantina.",
  },
  {
    id: 17,
    question: "O que significa ORM e qual é usado no projeto?",
    options: [
      "Object Request Manager - TypeORM",
      "Object-Relational Mapping - Prisma",
      "Operational Resource Model - Sequelize",
      "Online Resource Manager - Mongoose",
    ],
    correctAnswer: 1,
    explanation:
      "ORM significa Object-Relational Mapping e o Prisma é usado no projeto, permitindo escrever queries em TypeScript sem SQL manual.",
  },
  {
    id: 18,
    question: "Qual é a diferença entre PUT e PATCH em uma API REST?",
    options: [
      "PUT é mais rápido que PATCH",
      "PUT substitui recurso completo, PATCH atualiza parcialmente",
      "PATCH é usado para deletar, PUT para criar",
      "Não há diferença, são sinônimos",
    ],
    correctAnswer: 1,
    explanation:
      "PUT substitui o recurso completo (precisa enviar todos os campos), enquanto PATCH atualiza apenas campos específicos (mais eficiente).",
  },
  {
    id: 19,
    question: "Qual é a principal vantagem do React Query?",
    options: [
      "Aumenta a velocidade de renderização do React",
      "Gerencia cache e estado assíncrono automaticamente",
      "Cria componentes React mais rápidos",
      "Substitui o Redux completamente",
    ],
    correctAnswer: 1,
    explanation:
      "React Query gerencia cache, sincronização e atualização de dados do servidor automaticamente, eliminando a necessidade de código boilerplate para estados de loading, error e data.",
  },
  {
    id: 20,
    question:
      "Qual hook do React Query é usado para MODIFICAR dados (POST, PUT, DELETE)?",
    options: ["useQuery", "useMutation", "useEffect", "useState"],
    correctAnswer: 1,
    explanation:
      "useMutation é usado para operações que modificam dados (POST, PUT, PATCH, DELETE), enquanto useQuery é para buscar dados (GET).",
  },
  {
    id: 21,
    question:
      "No React, qual é a diferença entre Client Components e Server Components?",
    options: [
      "Client Components são mais rápidos",
      "Server Components executam no servidor, Client Components no navegador",
      "Não há diferença no Next.js",
      "Server Components não podem usar TypeScript",
    ],
    correctAnswer: 1,
    explanation:
      "Server Components executam no servidor (não precisam de 'use client'), enquanto Client Components executam no navegador e permitem interatividade (hooks, eventos).",
  },
  {
    id: 22,
    question: "Qual método HTTP é usado pela Fetch API para buscar dados?",
    options: ["POST", "GET", "PUT", "DELETE"],
    correctAnswer: 1,
    explanation:
      "O método GET é usado para buscar dados do servidor. É o método padrão do fetch() quando não especificado.",
  },
  {
    id: 23,
    question:
      "No React Hook Form, qual função é usada para registrar um input no formulário?",
    options: ["handleSubmit", "register", "setValue", "watch"],
    correctAnswer: 1,
    explanation:
      "A função register() conecta um input ao React Hook Form, permitindo que o formulário gerencie seu valor e validações.",
  },
  {
    id: 24,
    question:
      "Qual biblioteca é usada para validação de schemas type-safe em TypeScript?",
    options: ["Joi", "Yup", "Zod", "Ajv"],
    correctAnswer: 2,
    explanation:
      "Zod é uma biblioteca TypeScript-first para validação de schemas que fornece inferência de tipos automática, integrada ao React Hook Form via zodResolver.",
  },
  {
    id: 25,
    question:
      "Por que devemos validar dados tanto no frontend quanto no backend?",
    options: [
      "Apenas frontend é suficiente",
      "Frontend para UX, backend para segurança",
      "Backend é opcional se o frontend validar",
      "Validação dupla é redundante e desnecessária",
    ],
    correctAnswer: 1,
    explanation:
      "Frontend valida para melhor experiência do usuário (feedback imediato), mas backend SEMPRE deve validar para garantir segurança, pois validações frontend podem ser burladas.",
  },
  {
    id: 26,
    question: "O que o método invalidateQueries() do React Query faz?",
    options: [
      "Deleta dados do cache permanentemente",
      "Marca queries como desatualizadas e força refetch",
      "Cancela requisições em andamento",
      "Remove o React Query do projeto",
    ],
    correctAnswer: 1,
    explanation:
      "invalidateQueries() marca queries específicas como desatualizadas (stale) e força o refetch dos dados, útil após mutations para atualizar a UI.",
  },
  {
    id: 27,
    question:
      "Qual hook do React é usado para executar código após a renderização?",
    options: ["useState", "useEffect", "useContext", "useRef"],
    correctAnswer: 1,
    explanation:
      "useEffect executa código após a renderização do componente, usado para side effects como buscar dados, subscrições, timers, etc.",
  },
  {
    id: 28,
    question: "No Zod, como tornamos um campo opcional?",
    options: [
      "z.string().optional()",
      "z.optional(z.string())",
      "z.string().nullable()",
      "z.string().required(false)",
    ],
    correctAnswer: 0,
    explanation:
      "No Zod, usamos .optional() após o tipo para tornar um campo não obrigatório. Ex: z.string().optional() aceita string ou undefined.",
  },
];

export function calculateQuizResult(
  answers: number[],
  questions: QuizQuestion[]
): QuizResult {
  const correctAnswers = answers.filter(
    (answer, index) => answer === questions[index]?.correctAnswer
  ).length;

  const totalQuestions = questions.length;
  const wrongAnswers = totalQuestions - correctAnswers;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return {
    score: correctAnswers,
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    percentage,
  };
}
