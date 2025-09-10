"use client"

import { useState, useEffect, useCallback, createContext, useContext } from "react"
import type { ReactNode } from "react"

export interface Message {
  id: string
  type: "user" | "ai" | "thinking" | "search-summary"
  content: string
  timestamp: Date
  thinkingData?: any
  searchData?: any
}

interface ChatHistoryContext {
  messages: Message[]
  addMessage: (message: Message) => void
  addMessages: (messages: Message[]) => void
  clearMessages: () => void
  lastSearchData: any
  setLastSearchData: (data: any) => void
}

const STORAGE_KEY = "chat-history"

const ChatHistoryContext = createContext<ChatHistoryContext | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [lastSearchData, setLastSearchDataState] = useState<any>(null)

  // Load messages from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Convert timestamp strings back to Date objects
        const messagesWithDates =
          parsed.messages?.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })) || []

        setMessages(messagesWithDates)
        setLastSearchDataState(parsed.lastSearchData || null)
      } else {
        // Initialize with welcome message if no stored history
        const welcomeMessage: Message = {
          id: "welcome",
          type: "ai",
          content:
            "Since your last visit, I've found some trending images that match your Pet Social Campaign theme — kids and pets together, warm lifestyle vibes. Want to refine further? ✨",
          timestamp: new Date(),
        }
        setMessages([welcomeMessage])
      }
    } catch (error) {
      console.error("Failed to load chat history:", error)
      // Initialize with welcome message on error
      const welcomeMessage: Message = {
        id: "welcome",
        type: "ai",
        content:
          "Since your last visit, I've found some trending images that match your Pet Social Campaign theme — kids and pets together, warm lifestyle vibes. Want to refine further? ✨",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [])

  // Save to sessionStorage whenever messages or lastSearchData changes
  useEffect(() => {
    try {
      const dataToStore = {
        messages,
        lastSearchData,
        timestamp: new Date().toISOString(),
      }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore))
    } catch (error) {
      console.error("Failed to save chat history:", error)
    }
  }, [messages, lastSearchData])

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message])
  }, [])

  const addMessages = useCallback((newMessages: Message[]) => {
    setMessages((prev) => [...prev, ...newMessages])
  }, [])

  const clearMessages = useCallback(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      type: "ai",
      content:
        "Since your last visit, I've found some trending images that match your Pet Social Campaign theme — kids and pets together, warm lifestyle vibes. Want to refine further? ✨",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
    setLastSearchDataState(null)
    sessionStorage.removeItem(STORAGE_KEY)
  }, [])

  const setLastSearchData = useCallback((data: any) => {
    setLastSearchDataState(data)
  }, [])

  const contextValue: ChatHistoryContext = {
    messages,
    addMessage,
    addMessages,
    clearMessages,
    lastSearchData,
    setLastSearchData,
  }

  return <ChatHistoryContext.Provider value={contextValue}>{children}</ChatHistoryContext.Provider>
}

export function useChatHistory(): ChatHistoryContext {
  const context = useContext(ChatHistoryContext)
  if (context === undefined) {
    throw new Error("useChatHistory must be used within a ChatProvider")
  }
  return context
}
