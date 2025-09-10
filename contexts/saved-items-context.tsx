"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface SavedItem {
  id: string
  src: string
  alt: string
  title: string
  author: string
  savedAt: number
}

interface SavedItemsContextType {
  savedItems: SavedItem[]
  saveItem: (item: Omit<SavedItem, "savedAt">) => void
  removeItem: (id: string) => void
  isItemSaved: (id: string) => boolean
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined)

export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])

  // Load saved items from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("saved-items")
    if (stored) {
      try {
        setSavedItems(JSON.parse(stored))
      } catch (error) {
        console.error("Failed to parse saved items:", error)
      }
    }
  }, [])

  // Save to sessionStorage whenever savedItems changes
  useEffect(() => {
    sessionStorage.setItem("saved-items", JSON.stringify(savedItems))
  }, [savedItems])

  const saveItem = (item: Omit<SavedItem, "savedAt">) => {
    const newItem: SavedItem = {
      ...item,
      savedAt: Date.now(),
    }
    setSavedItems((prev) => {
      // Avoid duplicates
      if (prev.some((existing) => existing.id === item.id)) {
        return prev
      }
      return [...prev, newItem]
    })
  }

  const removeItem = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id))
  }

  const isItemSaved = (id: string) => {
    return savedItems.some((item) => item.id === id)
  }

  return (
    <SavedItemsContext.Provider value={{ savedItems, saveItem, removeItem, isItemSaved }}>
      {children}
    </SavedItemsContext.Provider>
  )
}

export function useSavedItems() {
  const context = useContext(SavedItemsContext)
  if (context === undefined) {
    throw new Error("useSavedItems must be used within a SavedItemsProvider")
  }
  return context
}
