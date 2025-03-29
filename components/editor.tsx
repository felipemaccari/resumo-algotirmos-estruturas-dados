"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface EditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function Editor({ value, onChange, className }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  return (
    <div
      ref={editorRef}
      contentEditable
      onInput={handleInput}
      className={cn("prose max-w-none dark:prose-invert min-h-[200px] focus:outline-none", className)}
    />
  )
}

