"use client";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Quiz } from "@/components/quiz";
import { SubjectSelector } from "@/components/subject-selector";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Subject,
  getSubjectById,
  searchTopicsInSubject,
} from "@/data/subjects";
import { pieQuiz, pieQuizProva2 } from "@/data/quiz";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  X,
} from "lucide-react";
import React, { useRef, useState } from "react";

export interface Topic {
  id: number;
  title: string;
  description: string;
  content: string;
  tags: string[];
}

export default function Home() {
  // Estados principais
  const [selectedSubject, setSelectedSubject] = useLocalStorage<Subject | null>(
    "selectedSubject",
    null
  );
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [presentationMode, setPresentationMode] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();

  // Atualizar tópicos quando a matéria selecionada mudar
  React.useEffect(() => {
    if (selectedSubject) {
      setTopics(selectedSubject.topics);
      setFilteredTopics(selectedSubject.topics);
      if (selectedSubject.topics.length > 0) {
        setSelectedTopic(selectedSubject.topics[0].id);
      }
    }
  }, [selectedSubject]);

  const currentTopic = topics.find((topic) => topic.id === selectedTopic);
  const currentTopicIndex = topics.findIndex(
    (topic) => topic.id === selectedTopic
  );

  // Função para selecionar matéria
  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  // Função para voltar à seleção de matéria
  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setTopics([]);
    setFilteredTopics([]);
    setSelectedTopic(1);
    setSearchTerm("");
  };

  // Navegação entre tópicos
  const goToNextTopic = () => {
    if (currentTopicIndex < topics.length - 1) {
      setSelectedTopic(topics[currentTopicIndex + 1].id);
    }
  };

  const goToPreviousTopic = () => {
    if (currentTopicIndex > 0) {
      setSelectedTopic(topics[currentTopicIndex - 1].id);
    }
  };

  // Atualizar o filteredTopics quando searchTerm mudar
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (selectedSubject) {
      setFilteredTopics(
        searchTopicsInSubject(selectedSubject.id, newSearchTerm)
      );
    }
  };

  // Se nenhuma matéria foi selecionada, mostrar o seletor
  if (!selectedSubject) {
    return <SubjectSelector onSubjectSelect={handleSubjectSelect} />;
  }

  return (
    <div
      className={`min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 ${
        presentationMode ? "overflow-hidden" : ""
      }`}
    >
      <div className="mx-auto flex h-screen max-w-7xl flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-gray-800 sm:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToSubjects}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar às Matérias
            </Button>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-2"
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {selectedSubject.name}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div
            className={`mx-auto max-w-7xl ${presentationMode ? "p-12" : "p-8"}`}
          >
            <Tabs defaultValue="resumo" className="w-full">
              <TabsList
                className={`grid w-full ${
                  selectedSubject?.id === "projeto-integrador-extensionista"
                    ? "grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                <TabsTrigger value="resumo">Resumo</TabsTrigger>
                {selectedSubject?.id === "projeto-integrador-extensionista" && (
                  <TabsTrigger value="questionario">Questionário</TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="resumo">
                <div className="flex flex-1 overflow-hidden">
                  <AnimatePresence initial={false}>
                    {sidebarOpen && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 320, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col border-r border-gray-100 dark:border-gray-800"
                      >
                        <div className="border-b border-gray-100 p-4 dark:border-gray-800">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Pesquisar tópicos..."
                              className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-gray-300 focus:ring-1 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-gray-600 dark:focus:ring-gray-600"
                              value={searchTerm}
                              onChange={handleSearch}
                            />
                          </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                          <div className="p-4">
                            <AnimatePresence initial={false}>
                              <ul className="space-y-2">
                                {filteredTopics.map((topic) => (
                                  <motion.li
                                    key={topic.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <div>
                                      <button
                                        onClick={() =>
                                          setSelectedTopic(topic.id)
                                        }
                                        className={`w-full rounded-lg p-3 text-left transition-colors ${
                                          selectedTopic === topic.id
                                            ? "bg-gray-100 dark:bg-gray-800"
                                            : "hover:bg-gray-50 dark:hover:bg-gray-900"
                                        }`}
                                      >
                                        <div>
                                          <h3 className="font-medium">
                                            {topic.title}
                                          </h3>
                                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            {topic.description}
                                          </p>

                                          <div className="mt-1 flex flex-wrap gap-1">
                                            {topic.tags
                                              .slice(0, 2)
                                              .map((tag, index) => (
                                                <span
                                                  key={index}
                                                  className="inline-block rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                                >
                                                  {tag}
                                                </span>
                                              ))}
                                            {topic.tags.length > 2 && (
                                              <span className="inline-block rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                                +{topic.tags.length - 2}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </button>
                                    </div>
                                  </motion.li>
                                ))}

                                {filteredTopics.length === 0 && (
                                  <li className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                    Nenhum tópico encontrado para "{searchTerm}"
                                  </li>
                                )}
                              </ul>
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Conteúdo */}
                  <div
                    ref={contentRef}
                    className={`flex-1 overflow-y-auto transition-all ${
                      presentationMode ? "bg-white dark:bg-black" : ""
                    }`}
                  >
                    <div
                      className={`mx-auto max-w-3xl ${
                        presentationMode ? "p-12" : "p-8"
                      }`}
                    >
                      {currentTopic ? (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${currentTopic.id}-"view"`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="mb-8 flex items-center justify-between">
                              <div>
                                <h2 className="text-3xl font-medium">
                                  {currentTopic.title}
                                </h2>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                  {currentTopic.description}
                                </p>

                                <div className="mt-2 flex flex-wrap gap-2">
                                  {currentTopic.tags.map((tag, index) => (
                                    <span
                                      key={index}
                                      className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <MarkdownRenderer content={currentTopic.content} />

                            {/* Navegação entre tópicos */}
                            <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-6 dark:border-gray-800">
                              <Button
                                variant="ghost"
                                onClick={goToPreviousTopic}
                                disabled={currentTopicIndex === 0}
                                className="flex items-center gap-1"
                              >
                                <ChevronLeft className="h-4 w-4" />
                                {currentTopicIndex > 0 && (
                                  <span>
                                    {topics[currentTopicIndex - 1].title}
                                  </span>
                                )}
                              </Button>

                              <Button
                                variant="ghost"
                                onClick={goToNextTopic}
                                disabled={
                                  currentTopicIndex === topics.length - 1
                                }
                                className="flex items-center gap-1"
                              >
                                {currentTopicIndex < topics.length - 1 && (
                                  <span>
                                    {topics[currentTopicIndex + 1].title}
                                  </span>
                                )}
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <p className="text-gray-500 dark:text-gray-400">
                            Selecione um tópico para visualizar o conteúdo
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              {selectedSubject?.id === "projeto-integrador-extensionista" && (
                <TabsContent value="questionario">
                  <Quiz
                    questions={pieQuizProva2}
                    onComplete={(result) => {
                      toast({
                        title: "Questionário Concluído!",
                        description: `Você acertou ${result.correctAnswers} de ${result.totalQuestions} questões (${result.percentage}%)`,
                      });
                    }}
                  />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>

        {presentationMode && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-full bg-white/90 px-6 py-3 shadow-lg backdrop-blur-sm dark:bg-gray-900/90">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPreviousTopic}
              disabled={currentTopicIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Anterior</span>
            </Button>

            <span className="text-sm">
              {currentTopicIndex + 1} / {topics.length}
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={goToNextTopic}
              disabled={currentTopicIndex === topics.length - 1}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Próximo</span>
            </Button>

            <div className="mx-2 h-6 w-px bg-gray-300 dark:bg-gray-700" />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPresentationMode(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Sair</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
