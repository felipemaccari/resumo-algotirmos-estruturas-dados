"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuizQuestion, QuizResult, calculateQuizResult } from "@/data/quiz";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, RotateCcw, Trophy, Brain } from "lucide-react";
import { useState } from "react";

interface QuizProps {
  questions: QuizQuestion[];
  onComplete?: (result: QuizResult) => void;
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const isLastQuestion = currentQuestion === questions.length - 1;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);

      if (isLastQuestion) {
        const result = calculateQuizResult(newAnswers, questions);
        setShowResult(true);
        onComplete?.(result);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Excelente! Você domina o conteúdo! 🎉";
    if (percentage >= 80) return "Muito bom! Continue estudando! 👏";
    if (percentage >= 60) return "Bom! Revise alguns conceitos! 📚";
    return "Continue estudando! Você consegue! 💪";
  };

  if (showResult) {
    const result = calculateQuizResult(answers, questions);

    return (
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Trophy className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl">
                Questionário Concluído!
              </CardTitle>
              <CardDescription>
                Veja como você se saiu no questionário
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div
                  className={`text-4xl font-bold ${getScoreColor(
                    result.percentage
                  )}`}
                >
                  {result.percentage}%
                </div>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                  {result.correctAnswers} de {result.totalQuestions} questões
                  corretas
                </p>
                <p className="mt-2 text-sm font-medium">
                  {getScoreMessage(result.percentage)}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {result.correctAnswers}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Corretas
                  </div>
                </div>
                <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {result.wrongAnswers}
                  </div>
                  <div className="text-sm text-red-600 dark:text-red-400">
                    Incorretas
                  </div>
                </div>
                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {result.totalQuestions}
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    Total
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Revisão das Respostas:
                </h3>
                <div className="space-y-3">
                  {questions.map((question, index) => {
                    const userAnswer = answers[index];
                    const isCorrect = userAnswer === question.correctAnswer;

                    return (
                      <div
                        key={question.id}
                        className={`rounded-lg border p-3 ${
                          isCorrect
                            ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                            : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{question.question}</p>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              <strong>Sua resposta:</strong>{" "}
                              {question.options[userAnswer]}
                            </p>
                            {!isCorrect && (
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                <strong>Resposta correta:</strong>{" "}
                                {question.options[question.correctAnswer]}
                              </p>
                            )}
                            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                              <strong>Explicação:</strong>{" "}
                              {question.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button onClick={handleRestart} className="w-full">
                <RotateCcw className="mr-2 h-4 w-4" />
                Refazer Questionário
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Questão {currentQuestion + 1} de {questions.length}
                </CardTitle>
                <CardDescription>
                  Projeto Integrador Extensionista
                </CardDescription>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(progress)}% concluído
              </div>
            </div>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {question.question}
              </h3>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full rounded-lg border p-4 text-left transition-all ${
                      selectedAnswer === index
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          selectedAnswer === index
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {selectedAnswer === index && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="min-w-[120px]"
              >
                {isLastQuestion ? "Finalizar" : "Próxima"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
