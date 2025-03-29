"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, Heading3, Link, Image, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function MarkdownEditor({ value, onChange, className }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)

  useEffect(() => {
    if (textareaRef.current) {
      const { selectionStart, selectionEnd } = textareaRef.current
      setSelectionStart(selectionStart)
      setSelectionEnd(selectionEnd)
    }
  }, [value])

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)

    // Atualizar posição do cursor
    const { selectionStart, selectionEnd } = e.target
    setSelectionStart(selectionStart)
    setSelectionEnd(selectionEnd)
  }

  const insertMarkdown = (before: string, after = "") => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    onChange(newText)

    // Definir nova posição do cursor após a inserção
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length + after.length
      textarea.setSelectionRange(
        selectedText ? start : start + before.length,
        selectedText ? newCursorPos : start + before.length,
      )
    }, 0)
  }

  const formatters = [
    {
      icon: <Bold className="h-4 w-4" />,
      tooltip: "Negrito (Ctrl+B)",
      action: () => insertMarkdown("**", "**"),
      hotkey: { key: "b", ctrl: true },
    },
    {
      icon: <Italic className="h-4 w-4" />,
      tooltip: "Itálico (Ctrl+I)",
      action: () => insertMarkdown("*", "*"),
      hotkey: { key: "i", ctrl: true },
    },
    {
      icon: <Heading1 className="h-4 w-4" />,
      tooltip: "Título 1",
      action: () => insertMarkdown("# ", "\n"),
      hotkey: { key: "1", ctrl: true, alt: true },
    },
    {
      icon: <Heading2 className="h-4 w-4" />,
      tooltip: "Título 2",
      action: () => insertMarkdown("## ", "\n"),
      hotkey: { key: "2", ctrl: true, alt: true },
    },
    {
      icon: <Heading3 className="h-4 w-4" />,
      tooltip: "Título 3",
      action: () => insertMarkdown("### ", "\n"),
      hotkey: { key: "3", ctrl: true, alt: true },
    },
    {
      icon: <List className="h-4 w-4" />,
      tooltip: "Lista com marcadores",
      action: () => insertMarkdown("- ", "\n"),
      hotkey: { key: "u", ctrl: true, alt: true },
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      tooltip: "Lista numerada",
      action: () => insertMarkdown("1. ", "\n"),
      hotkey: { key: "o", ctrl: true, alt: true },
    },
    {
      icon: <Quote className="h-4 w-4" />,
      tooltip: "Citação",
      action: () => insertMarkdown("> ", "\n"),
      hotkey: { key: "q", ctrl: true, alt: true },
    },
    {
      icon: <Code className="h-4 w-4" />,
      tooltip: "Código",
      action: () => insertMarkdown("```\n", "\n```"),
      hotkey: { key: "k", ctrl: true },
    },
    {
      icon: <Link className="h-4 w-4" />,
      tooltip: "Link",
      action: () => insertMarkdown("[", "](url)"),
      hotkey: { key: "l", ctrl: true },
    },
    {
      icon: <Image className="h-4 w-4" />,
      tooltip: "Imagem",
      action: () => insertMarkdown("![alt text](", ")"),
      hotkey: { key: "p", ctrl: true, alt: true },
    },
  ]

  // Manipular atalhos de teclado
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    for (const formatter of formatters) {
      const { hotkey } = formatter
      if (
        hotkey &&
        e.key.toLowerCase() === hotkey.key.toLowerCase() &&
        e.ctrlKey === !!hotkey.ctrl &&
        e.altKey === !!hotkey.alt
      ) {
        e.preventDefault()
        formatter.action()
        return
      }
    }
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex flex-wrap items-center gap-1 border-b p-2 bg-gray-50 dark:bg-gray-900 rounded-t-md">
        {formatters.map((formatter, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={formatter.action}
            title={formatter.tooltip}
            className="h-8 w-8 p-0"
          >
            {formatter.icon}
            <span className="sr-only">{formatter.tooltip}</span>
          </Button>
        ))}
      </div>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleTextareaChange}
        onKeyDown={handleKeyDown}
        className="flex-1 resize-none border-0 bg-transparent p-4 text-sm outline-none"
        placeholder="Digite seu conteúdo em Markdown aqui..."
      />
    </div>
  )
}

