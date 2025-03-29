"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para armazenar o valor
  // Passamos a função inicial para useState para que seja executada apenas uma vez
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Obter do localStorage pelo key
      if (typeof window === "undefined") {
        return initialValue
      }

      const item = window.localStorage.getItem(key)
      // Analisar o item armazenado ou retornar initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // Se ocorrer um erro, retornar initialValue
      console.log(error)
      return initialValue
    }
  })

  // Retorna uma versão encapsulada da função setter do useState que ...
  // ... persiste o novo valor no localStorage.
  const setValue = (value: T) => {
    try {
      // Permitir que value seja uma função para que tenhamos a mesma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Salvar state
      setStoredValue(valueToStore)
      // Salvar no localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // Uma implementação mais avançada lidaria com o caso de erro
      console.log(error)
    }
  }

  // Sincronizar com localStorage quando a janela estiver disponível
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue))
      }
    }

    // Adicionar event listener para sincronizar entre abas
    window.addEventListener("storage", handleStorageChange)

    // Remover event listener ao desmontar
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [key])

  return [storedValue, setValue] as const
}

