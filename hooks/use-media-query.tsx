"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const media = window.matchMedia(query)

    // Atualizar o estado inicialmente
    setMatches(media.matches)

    // Configurar o callback para mudanças
    const listener = () => setMatches(media.matches)

    // Adicionar o listener
    media.addEventListener("change", listener)

    // Limpar o listener
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}

