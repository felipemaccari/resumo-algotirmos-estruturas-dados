"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  FileText,
  Heart,
  History,
  Menu,
  X,
  Download,
  Maximize,
  Minimize,
  ChevronLeft,
  ChevronRight,
  Save,
  Edit,
  LogIn,
  LogOut,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { MarkdownEditor } from "@/components/markdown-editor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { initialTopics } from "@/data/topics";

export interface Topic {
  id: number;
  title: string;
  description: string;
  content: string;
  tags: string[];
}

export default function Home() {
  // Estado para autenticação (em um app real, isso viria de um sistema de autenticação)
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [password, setPassword] = useState("");

  // Estados principais
  const [topics, setTopics] = useLocalStorage<Topic[]>("topics", initialTopics);
  const [selectedTopic, setSelectedTopic] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTopics, setFilteredTopics] = useState(topics);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [presentationMode, setPresentationMode] = useState(false);
  const [favorites, setFavorites] = useLocalStorage<number[]>("favorites", []);
  const [viewHistory, setViewHistory] = useLocalStorage<
    { id: number; timestamp: number }[]
  >("viewHistory", []);

  // Estados para edição
  const [isEditing, setIsEditing] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [newTopicDialogOpen, setNewTopicDialogOpen] = useState(false);
  const [newTopic, setNewTopic] = useState<Omit<Topic, "id">>({
    title: "",
    description: "",
    content: "",
    tags: [],
  });
  const [newTagInput, setNewTagInput] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();

  // Atualizar histórico quando um tópico é selecionado
  useEffect(() => {
    if (selectedTopic) {
      // Adicionar ao histórico
      const now = Date.now();
      const newHistory = [
        { id: selectedTopic, timestamp: now },
        ...viewHistory.filter((item) => item.id !== selectedTopic).slice(0, 9), // Manter apenas os 10 mais recentes
      ];
      setViewHistory(newHistory);

      // Rolar para o topo do conteúdo quando mudar de tópico
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }

      // Resetar modo de edição ao trocar de tópico
      setIsEditing(false);
      setPreviewMode(false);
    }
  }, [selectedTopic, setViewHistory]);

  // Filtrar tópicos com base na pesquisa
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTopics(topics);
      return;
    }

    const lowercaseSearch = searchTerm.toLowerCase();
    const filtered = topics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(lowercaseSearch) ||
        topic.description.toLowerCase().includes(lowercaseSearch) ||
        topic.content.toLowerCase().includes(lowercaseSearch) ||
        topic.tags.some((tag) => tag.toLowerCase().includes(lowercaseSearch))
    );

    setFilteredTopics(filtered);

    // Se houver resultados e o tópico atual não estiver nos resultados, selecione o primeiro resultado
    if (filtered.length > 0 && !filtered.find((t) => t.id === selectedTopic)) {
      setSelectedTopic(filtered[0].id);
    }
  }, [searchTerm, selectedTopic, topics]);

  // Ajustar sidebar em dispositivos móveis
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const currentTopic = topics.find((topic) => topic.id === selectedTopic);
  const currentTopicIndex = topics.findIndex(
    (topic) => topic.id === selectedTopic
  );

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

  // Gerenciar favoritos
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
      toast({
        title: "Removido dos favoritos",
        description: `"${
          topics.find((t) => t.id === id)?.title
        }" foi removido dos seus favoritos.`,
      });
    } else {
      setFavorites([...favorites, id]);
      toast({
        title: "Adicionado aos favoritos",
        description: `"${
          topics.find((t) => t.id === id)?.title
        }" foi adicionado aos seus favoritos.`,
      });
    }
  };

  // Exportar para PDF
  const exportToPDF = () => {
    toast({
      title: "Exportando para PDF",
      description: "O conteúdo está sendo preparado para download.",
    });

    // Aqui você implementaria a lógica real de exportação para PDF
    // Usando bibliotecas como jsPDF, html2pdf, ou uma API de backend

    setTimeout(() => {
      toast({
        title: "PDF pronto para download",
        description: "Seu arquivo foi gerado com sucesso.",
      });
    }, 1500);
  };

  // Funções de administração
  const handleLogin = () => {
    // Em um app real, você faria uma verificação adequada de credenciais
    if (password === "admin123") {
      setIsAdmin(true);
      setLoginDialogOpen(false);
      toast({
        title: "Login bem-sucedido",
        description:
          "Você agora tem acesso às funcionalidades de administrador.",
      });
    } else {
      toast({
        title: "Falha no login",
        description: "Senha incorreta. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setIsEditing(false);
    setPreviewMode(false);
    toast({
      title: "Logout realizado",
      description: "Você saiu do modo administrador.",
    });
  };

  // Funções de edição
  const startEditing = () => {
    if (!currentTopic) return;
    setIsEditing(true);
    setEditingTopic({ ...currentTopic });
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingTopic(null);
    setPreviewMode(false);
  };

  const saveEdits = () => {
    if (!editingTopic) return;

    const updatedTopics = topics.map((topic) =>
      topic.id === editingTopic.id ? editingTopic : topic
    );

    setTopics(updatedTopics);
    setIsEditing(false);
    setEditingTopic(null);
    setPreviewMode(false);

    toast({
      title: "Alterações salvas",
      description: "O conteúdo foi atualizado com sucesso.",
    });
  };

  const openEditMetadataDialog = () => {
    if (!currentTopic) return;
    setEditingTopic({ ...currentTopic });
    setEditDialogOpen(true);
  };

  const saveMetadataEdits = () => {
    if (!editingTopic) return;

    const updatedTopics = topics.map((topic) =>
      topic.id === editingTopic.id ? editingTopic : topic
    );

    setTopics(updatedTopics);
    setEditDialogOpen(false);

    toast({
      title: "Metadados atualizados",
      description: "As informações do tópico foram atualizadas com sucesso.",
    });
  };

  const handleContentChange = (content: string) => {
    if (!editingTopic) return;
    setEditingTopic({ ...editingTopic, content });
  };

  const createNewTopic = () => {
    // Encontrar o próximo ID disponível
    const maxId = Math.max(...topics.map((t) => t.id), 0);
    const newId = maxId + 1;

    const topicToAdd: Topic = {
      id: newId,
      ...newTopic,
    };

    setTopics([...topics, topicToAdd]);
    setSelectedTopic(newId);
    setNewTopicDialogOpen(false);
    setNewTopic({
      title: "",
      description: "",
      content: "",
      tags: [],
    });

    toast({
      title: "Tópico criado",
      description: "O novo tópico foi adicionado com sucesso.",
    });
  };

  const addTagToNewTopic = () => {
    if (!newTagInput.trim()) return;

    setNewTopic({
      ...newTopic,
      tags: [...newTopic.tags, newTagInput.trim()],
    });

    setNewTagInput("");
  };

  const removeTagFromNewTopic = (tagToRemove: string) => {
    setNewTopic({
      ...newTopic,
      tags: newTopic.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const addTagToEditingTopic = () => {
    if (!editingTopic || !newTagInput.trim()) return;

    setEditingTopic({
      ...editingTopic,
      tags: [...editingTopic.tags, newTagInput.trim()],
    });

    setNewTagInput("");
  };

  const removeTagFromEditingTopic = (tagToRemove: string) => {
    if (!editingTopic) return;

    setEditingTopic({
      ...editingTopic,
      tags: editingTopic.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const deleteTopic = (id: number) => {
    if (topics.length <= 1) {
      toast({
        title: "Não é possível excluir",
        description: "Deve haver pelo menos um tópico disponível.",
        variant: "destructive",
      });
      return;
    }

    const updatedTopics = topics.filter((topic) => topic.id !== id);
    setTopics(updatedTopics);

    // Se o tópico atual foi excluído, selecione o primeiro tópico disponível
    if (id === selectedTopic) {
      setSelectedTopic(updatedTopics[0].id);
    }

    toast({
      title: "Tópico excluído",
      description: "O tópico foi removido com sucesso.",
    });
  };

  return (
    <div
      className={`min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 ${
        presentationMode ? "overflow-hidden" : ""
      }`}
    >
      <div className="mx-auto flex h-screen max-w-7xl flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-gray-800 sm:px-6">
          <div className="flex items-center gap-2">
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
            <h1 className="text-xl font-medium sm:text-2xl">
              Resumos da Matéria
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setNewTopicDialogOpen(true)}
                    >
                      <FileText className="h-5 w-5" />
                      <span className="sr-only">Novo tópico</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Criar novo tópico</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={exportToPDF}>
                    <Download className="h-5 w-5" />
                    <span className="sr-only">Exportar para PDF</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Exportar para PDF</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPresentationMode(!presentationMode)}
                  >
                    {presentationMode ? (
                      <Minimize className="h-5 w-5" />
                    ) : (
                      <Maximize className="h-5 w-5" />
                    )}
                    <span className="sr-only">Modo de apresentação</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {presentationMode
                    ? "Sair do modo de apresentação"
                    : "Modo de apresentação"}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={
                      isAdmin ? handleLogout : () => setLoginDialogOpen(true)
                    }
                  >
                    {isAdmin ? (
                      <LogOut className="h-5 w-5" />
                    ) : (
                      <LogIn className="h-5 w-5" />
                    )}
                    <span className="sr-only">
                      {isAdmin ? "Logout" : "Login"}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isAdmin
                    ? "Sair do modo administrador"
                    : "Entrar como administrador"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Painel de tópicos */}
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
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col overflow-hidden">
                  <div className="flex items-center border-b border-gray-100 px-4 py-2 dark:border-gray-800">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs"
                        >
                          Visualizar por{" "}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => setSearchTerm("")}
                        >
                          <FileText className="h-4 w-4" /> Todos os tópicos
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => {
                            setFilteredTopics(
                              topics.filter((topic) =>
                                favorites.includes(topic.id)
                              )
                            );
                          }}
                        >
                          <Heart className="h-4 w-4" /> Favoritos
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => {
                            const historyIds = viewHistory.map((h) => h.id);
                            setFilteredTopics(
                              topics.filter((topic) =>
                                historyIds.includes(topic.id)
                              )
                            );
                          }}
                        >
                          <History className="h-4 w-4" /> Recentes
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex-1 overflow-y-auto p-2">
                    <AnimatePresence initial={false}>
                      <ul className="space-y-1">
                        {filteredTopics.map((topic) => (
                          <motion.li
                            key={topic.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="group relative rounded-md">
                              <button
                                onClick={() => setSelectedTopic(topic.id)}
                                className={`w-full rounded-md px-4 py-3 text-left transition-colors ${
                                  selectedTopic === topic.id
                                    ? "bg-gray-100 dark:bg-gray-800"
                                    : "hover:bg-gray-50 dark:hover:bg-gray-900"
                                }`}
                              >
                                <h3 className="text-sm font-medium">
                                  {topic.title}
                                </h3>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                  {topic.description}
                                </p>

                                <div className="mt-1 flex flex-wrap gap-1">
                                  {topic.tags.slice(0, 2).map((tag, index) => (
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
                              </button>

                              <div className="absolute right-2 top-2 flex items-center gap-1">
                                {isAdmin && (
                                  <button
                                    onClick={() => deleteTopic(topic.id)}
                                    className="rounded-full p-1.5 text-gray-400 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                                  >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Excluir</span>
                                  </button>
                                )}

                                <button
                                  onClick={() => toggleFavorite(topic.id)}
                                  className={`rounded-full p-1.5 transition-opacity ${
                                    favorites.includes(topic.id)
                                      ? "text-red-500 opacity-100"
                                      : "text-gray-400 opacity-0 hover:text-gray-600 group-hover:opacity-100 dark:text-gray-500 dark:hover:text-gray-300"
                                  }`}
                                >
                                  <Heart
                                    className="h-4 w-4"
                                    fill={
                                      favorites.includes(topic.id)
                                        ? "currentColor"
                                        : "none"
                                    }
                                  />
                                  <span className="sr-only">Favoritar</span>
                                </button>
                              </div>
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

                  {viewHistory.length > 0 && (
                    <div className="border-t border-gray-100 p-4 dark:border-gray-800">
                      <h3 className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Visualizados recentemente
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {viewHistory.slice(0, 3).map((historyItem) => {
                          const topic = topics.find(
                            (t) => t.id === historyItem.id
                          );
                          if (!topic) return null;

                          return (
                            <button
                              key={`history-${historyItem.id}`}
                              onClick={() => setSelectedTopic(historyItem.id)}
                              className="rounded-md bg-gray-50 px-2 py-1 text-xs hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                              {topic.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
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
            {currentTopic ? (
              <div
                className={`mx-auto max-w-3xl ${
                  presentationMode ? "p-12" : "p-8"
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentTopic.id}-${isEditing ? "edit" : "view"}`}
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

                      <div className="flex items-center gap-2">
                        {isAdmin && !isEditing && (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={openEditMetadataDialog}
                            >
                              <Edit className="h-5 w-5" />
                              <span className="sr-only">Editar metadados</span>
                            </Button>

                            <Button variant="outline" onClick={startEditing}>
                              Editar conteúdo
                            </Button>
                          </>
                        )}

                        {isAdmin && isEditing && (
                          <>
                            <Button variant="outline" onClick={cancelEditing}>
                              Cancelar
                            </Button>

                            <Button
                              variant={previewMode ? "outline" : "secondary"}
                              onClick={() => setPreviewMode(!previewMode)}
                              className="gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              {previewMode ? "Editor" : "Visualizar"}
                            </Button>

                            <Button variant="default" onClick={saveEdits}>
                              <Save className="mr-2 h-4 w-4" />
                              Salvar
                            </Button>
                          </>
                        )}

                        {!isEditing && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => toggleFavorite(currentTopic.id)}
                            className={
                              favorites.includes(currentTopic.id)
                                ? "text-red-500"
                                : ""
                            }
                          >
                            <Heart
                              className="h-5 w-5"
                              fill={
                                favorites.includes(currentTopic.id)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                            <span className="sr-only">Favoritar</span>
                          </Button>
                        )}
                      </div>
                    </div>

                    {isEditing ? (
                      previewMode ? (
                        <div className="border rounded-md p-6 bg-gray-50 dark:bg-gray-900">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                            Pré-visualização
                          </h3>
                          <MarkdownRenderer
                            content={editingTopic?.content || ""}
                          />
                        </div>
                      ) : (
                        <MarkdownEditor
                          value={editingTopic?.content || ""}
                          onChange={handleContentChange}
                          className="min-h-[400px] border rounded-md"
                        />
                      )
                    ) : (
                      <MarkdownRenderer content={currentTopic.content} />
                    )}

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
                          <span>{topics[currentTopicIndex - 1].title}</span>
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        onClick={goToNextTopic}
                        disabled={currentTopicIndex === topics.length - 1}
                        className="flex items-center gap-1"
                      >
                        {currentTopicIndex < topics.length - 1 && (
                          <span>{topics[currentTopicIndex + 1].title}</span>
                        )}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Selecione um tópico para visualizar o conteúdo
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Controles do modo de apresentação */}
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

      {/* Diálogo de login */}
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login de Administrador</DialogTitle>
            <DialogDescription>
              Entre com suas credenciais para acessar as funcionalidades de
              administrador.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha de administrador"
              />
              <p className="text-xs text-muted-foreground">
                Dica: A senha é "admin123" (apenas para demonstração)
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setLoginDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleLogin}>Entrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de edição de metadados */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Tópico</DialogTitle>
            <DialogDescription>
              Atualize as informações deste tópico.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={editingTopic?.title || ""}
                onChange={(e) =>
                  setEditingTopic((prev) =>
                    prev ? { ...prev, title: e.target.value } : null
                  )
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={editingTopic?.description || ""}
                onChange={(e) =>
                  setEditingTopic((prev) =>
                    prev ? { ...prev, description: e.target.value } : null
                  )
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {editingTopic?.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      onClick={() => removeTagFromEditingTopic(tag)}
                      className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 h-4 w-4 inline-flex items-center justify-center"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remover tag</span>
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Nova tag"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTagToEditingTopic();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addTagToEditingTopic}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveMetadataEdits}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de novo tópico */}
      <Dialog open={newTopicDialogOpen} onOpenChange={setNewTopicDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Criar Novo Tópico</DialogTitle>
            <DialogDescription>
              Adicione um novo tópico à sua lista de conteúdos.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-title">Título</Label>
              <Input
                id="new-title"
                value={newTopic.title}
                onChange={(e) =>
                  setNewTopic({ ...newTopic, title: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="new-description">Descrição</Label>
              <Input
                id="new-description"
                value={newTopic.description}
                onChange={(e) =>
                  setNewTopic({ ...newTopic, description: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="new-content">Conteúdo (Markdown)</Label>
              <Tabs defaultValue="edit" className="w-full">
                <TabsList className="mb-2">
                  <TabsTrigger value="edit">Editar</TabsTrigger>
                  <TabsTrigger value="preview">Visualizar</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                  <MarkdownEditor
                    value={newTopic.content}
                    onChange={(content) =>
                      setNewTopic({ ...newTopic, content })
                    }
                    className="min-h-[300px] border rounded-md"
                  />
                </TabsContent>
                <TabsContent value="preview">
                  <div className="border rounded-md p-6 min-h-[300px] bg-gray-50 dark:bg-gray-900">
                    {newTopic.content ? (
                      <MarkdownRenderer content={newTopic.content} />
                    ) : (
                      <p className="text-gray-400 dark:text-gray-500">
                        Nenhum conteúdo para visualizar
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="grid gap-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newTopic.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      onClick={() => removeTagFromNewTopic(tag)}
                      className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 h-4 w-4 inline-flex items-center justify-center"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remover tag</span>
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Nova tag"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTagToNewTopic();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addTagToNewTopic}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNewTopicDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={createNewTopic}
              disabled={!newTopic.title.trim() || !newTopic.description.trim()}
            >
              Criar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
