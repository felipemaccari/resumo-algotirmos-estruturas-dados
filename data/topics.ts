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

export const initialTopics: Topic[] = [
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
];

export function searchTopics(searchTerm: string): Topic[] {
  if (!searchTerm) return initialTopics;

  const normalizedSearch = searchTerm.toLowerCase();

  return initialTopics.filter((topic) => {
    const titleMatch = topic.title.toLowerCase().includes(normalizedSearch);
    const descriptionMatch = topic.description
      .toLowerCase()
      .includes(normalizedSearch);
    const contentMatch = topic.content.toLowerCase().includes(normalizedSearch);

    return titleMatch || descriptionMatch || contentMatch;
  });
}
