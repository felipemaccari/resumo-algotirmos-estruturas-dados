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
import { webRequests } from "./topicsContent/webRequests";
import { systemArchitecture } from "./topicsContent/systemArchitecture";
import { postgresqlDatabase } from "./topicsContent/postgresqlDatabase";
import { devTools } from "./topicsContent/devTools";
import { deployEnvironments } from "./topicsContent/deployEnvironments";
import { authentication } from "./topicsContent/authentication";
import { cantinaProject } from "./topicsContent/cantinaProject";
import { restApi } from "./topicsContent/restApi";
import { keyConcepts } from "./topicsContent/keyConcepts";
import { reactQuery } from "./topicsContent/reactQuery";
import { frontendReact } from "./topicsContent/frontendReact";
import { reactHookForm } from "./topicsContent/reactHookForm";

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
        content: webRequests,
        tags: ["web", "requisições", "http", "dns"],
      },
      {
        id: 21,
        title: "Arquitetura do Sistema",
        description: "Tecnologias e estrutura do sistema de cantina",
        content: systemArchitecture,
        tags: ["arquitetura", "nestjs", "postgresql", "prisma", "docker"],
      },
      {
        id: 22,
        title: "Banco de Dados PostgreSQL",
        description: "Estrutura e relacionamentos do banco de dados",
        content: postgresqlDatabase,
        tags: ["postgresql", "banco-dados", "relacional", "relacionamentos"],
      },
      {
        id: 23,
        title: "Ferramentas de Desenvolvimento",
        description: "Docker Compose e Prisma para desenvolvimento",
        content: devTools,
        tags: ["docker", "prisma", "desenvolvimento", "migrations"],
      },
      {
        id: 24,
        title: "Ambientes e Deploy",
        description: "Ambientes de desenvolvimento e CI/CD",
        content: deployEnvironments,
        tags: ["deploy", "ci-cd", "ambientes", "produção"],
      },
      {
        id: 25,
        title: "Autenticação e Segurança",
        description: "Sistema de autenticação com JWT",
        content: authentication,
        tags: ["jwt", "autenticação", "segurança", "token"],
      },
      {
        id: 26,
        title: "Projeto da Cantina",
        description: "Módulos e fluxo do sistema de cantina",
        content: cantinaProject,
        tags: ["cantina", "pdv", "cadastros", "relatórios", "dashboard"],
      },
      {
        id: 27,
        title: "API REST",
        description: "Padrões e verbos HTTP para APIs",
        content: restApi,
        tags: ["api", "rest", "http", "endpoints", "verbos"],
      },
      {
        id: 28,
        title: "Conceitos-Chave",
        description: "Resumo dos principais conceitos da disciplina",
        content: keyConcepts,
        tags: ["conceitos", "resumo", "arquitetura", "tecnologias"],
      },
      {
        id: 29,
        title: "React Query",
        description: "Gerenciamento de estado assíncrono e cache no frontend",
        content: reactQuery,
        tags: ["react-query", "frontend", "cache", "async", "mutations"],
      },
      {
        id: 30,
        title: "Frontend com React",
        description: "Estrutura do frontend e comunicação client-server",
        content: frontendReact,
        tags: ["react", "frontend", "hooks", "components", "fetch-api"],
      },
      {
        id: 31,
        title: "Formulários e Validação",
        description: "React Hook Form, Zod e validação de dados",
        content: reactHookForm,
        tags: ["react-hook-form", "zod", "validação", "formulários"],
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
