import { Topic } from "@/app/page";
import { t1Algorythms } from "./topicsContent/t1Algorythms";
import { t2ProgrammingLanguages } from "./topicsContent/t2ProgrammingLanguages";
import { t3Variables } from "./topicsContent/t3Variables";
import { t4AritmeticOperators } from "./topicsContent/t4AritmeticOperators";
import { t5RelationalOperators } from "./topicsContent/t5RelationalOperators";
import { t6LogicalOperators } from "./topicsContent/t6LogicalOperators";
import { t7CompilersInterpreters } from "./topicsContent/t7CompilersInterpreters";
import { t8Constants } from "./topicsContent/t8Constants";
import { t9Conditionals } from "./topicsContent/t9Conditionals";
import { stringMethod } from "./topicsContent/stringMethod";
import { mathMethod } from "./topicsContent/mathMethod";
import { loops } from "./topicsContent/loops";

export const initialTopics: Topic[] = [
  {
    id: 5,
    title: "Algoritmos",
    description: "Introdução aos algoritmos",
    content: t1Algorythms,
    tags: ["algoritmos", "lógica", "programação"],
  },
  {
    id: 6,
    title: "Linguagens de Programação",
    description: "Tipos de linguagens e suas características",
    content: t2ProgrammingLanguages,
    tags: ["linguagens", "programação", "tipos"],
  },
  {
    id: 7,
    title: "Variáveis",
    description: "Definição e uso de variáveis",
    content: t3Variables,
    tags: ["variáveis", "programação", "dados"],
  },
  {
    id: 17,
    title: "Constantes",
    description: "Definição e uso de constantes",
    content: t8Constants,
    tags: ["constantes", "programação", "dados"],
  },
  {
    id: 8,
    title: "Operadores Aritméticos",
    description: "Uso de operadores matemáticos",
    content: t4AritmeticOperators,
    tags: ["operadores", "aritméticos", "matemática"],
  },
  {
    id: 9,
    title: "Operadores Relacionais",
    description: "Comparação entre valores",
    content: t5RelationalOperators,
    tags: ["operadores", "relacionais", "comparação"],
  },
  {
    id: 10,
    title: "Operadores Lógicos",
    description: "Condições e expressões lógicas",
    content: t6LogicalOperators,
    tags: ["operadores", "lógicos", "condições"],
  },
  {
    id: 11,
    title: "Compiladores e Interpretadores",
    description: "Diferença entre compiladores e interpretadores",
    content: t7CompilersInterpreters,
    tags: ["compiladores", "interpretadores", "execução"],
  },
  {
    id: 12,
    title: "Estruturas Condicionais",
    description: "Exemplos práticos de IF e Switch-Case",
    content: t9Conditionals,
    tags: ["condicional", "if", "switch-case"],
  },
  {
    id: 14,
    title: "String",
    description: "Manipulação de strings",
    content: stringMethod,
    tags: ["strings", "texto", "manipulação"],
  },
  {
    id: 15,
    title: "Math",
    description: "Operações matemáticas em programação",
    content: mathMethod,
    tags: ["matemática", "cálculo", "math"],
  },
  {
    id: 16,
    title: "For",
    description: "Uso do laço de repetição For",
    content: loops,
    tags: ["for", "loop", "repetição"],
  },
];
