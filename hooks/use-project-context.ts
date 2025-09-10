"use client"

import { useState, useEffect } from "react"

const STORAGE_KEY = "envato-project-context"

export function useProjectContext() {
  const [context, setContext] = useState<string>("")

  // Load context from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedContext = sessionStorage.getItem(STORAGE_KEY)
      if (savedContext) {
        setContext(savedContext)
      }
    }
  }, [])

  // Save context to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (context) {
        sessionStorage.setItem(STORAGE_KEY, context)
      } else {
        sessionStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [context])

  const updateContext = (newContext: string) => {
    setContext(newContext)
  }

  const clearContext = () => {
    setContext("")
  }

  const hasContext = Boolean(context.trim())

  return {
    context,
    hasContext,
    updateContext,
    clearContext,
  }
}
