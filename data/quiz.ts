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
