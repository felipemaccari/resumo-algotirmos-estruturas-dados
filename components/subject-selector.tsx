"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { subjects, Subject } from "@/data/subjects";
import { motion } from "framer-motion";

interface SubjectSelectorProps {
  onSubjectSelect: (subject: Subject) => void;
}

export function SubjectSelector({ onSubjectSelect }: SubjectSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Resumos Acadêmicos
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Selecione uma matéria para acessar os resumos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-blue-300 dark:hover:border-blue-600">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {subject.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {subject.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {subject.topics.length} tópicos disponíveis
                    </div>
                    <Button
                      onClick={() => onSubjectSelect(subject)}
                      className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      Acessar Resumos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Selecione uma matéria para começar a estudar
          </p>
        </motion.div>
      </div>
    </div>
  );
}
