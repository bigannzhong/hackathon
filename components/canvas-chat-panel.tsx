"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChatMessageBubble } from "./chat-message-bubble"
import { EnhancedChatInput } from "./enhanced-chat-input"
import { LoadingSpinner } from "./loading-spinner"
import { ThinkingProcessMessage } from "./thinking-process-message"
import { SuggestionPills } from "./suggestion-pills"
import { ProjectContextModal } from "./project-context-modal"
import { useProjectContext } from "../hooks/use-project-context"
import { useChatHistory } from "../hooks/use-chat-history"
import type { SearchStyle, ResponseStyle } from "../hooks/use-search-style"
import { SearchSettingsModal } from "./search-settings-modal"
import { SearchSummaryBlock } from "./search-summary-block"

interface CanvasChatPanelProps {
  onSearch: (query: string, filters: any) => void
}

export function CanvasChatPanel({ onSearch }: CanvasChatPanelProps) {
  const router = useRouter()
  const { messages, addMessage, addMessages } = useChatHistory()
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([])
  const [lastSearchData, setLastSearchData] = useState<any>(null)
  const [isContextModalOpen, setIsContextModalOpen] = useState(false)
  const [currentSearchStyle, setCurrentSearchStyle] = useState<SearchStyle>("balanced")
  const [currentResponseStyle, setCurrentResponseStyle] = useState<ResponseStyle>("conversational")
  const [showSearchSettings, setShowSearchSettings] = useState(false)
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false)
  const [currentInputValue, setCurrentInputValue] = useState("")

  // Project context management
  const { context, hasContext, updateContext, clearContext } = useProjectContext()

  const handleSendMessage = async (content: string) => {
    // Mark that user has sent their first message
    if (!hasUserSentMessage) {
      setHasUserSentMessage(true)
    }

    const searchStartTime = Date.now()

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content,
      timestamp: new Date(),
    }
    addMessage(userMessage)
    setIsProcessing(true)
    console.log("[v0] Started processing, isProcessing set to true")

    // Clear current suggestions while processing
    setCurrentSuggestions([])

    try {
      const minLoadingTime = 1500 // 1.5 seconds minimum
      const processingStartTime = Date.now()

      // Call compose API to convert natural language to search params
      const response = await fetch("/api/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          context: hasContext ? { text: context } : null,
          searchStyle: currentSearchStyle,
          responseStyle: currentResponseStyle,
        }),
      })

      const data = await response.json()

      // Calculate search duration
      const searchDuration = Math.round((Date.now() - searchStartTime) / 1000)

      // Add thinking process message BEFORE AI response
      const thinkingMessage = {
        id: (Date.now() + 1).toString(),
        type: "thinking" as const,
        content: "",
        timestamp: new Date(),
        thinkingData: data.thinkingProcess || {
          duration: `${searchDuration}s`,
          steps: [
            {
              title: "Extract key creative themes",
              content: [`"${data.searchQuery || content}"`],
            },
            {
              title: "Map keywords to asset types",
              content: ["• Photos → Focus on visual composition and subject matter"],
            },
            {
              title: "Construct tailored search strings",
              content: [`→ '${data.searchQuery || content}'`],
            },
          ],
        },
      }

      // Add AI response AFTER thinking process
      const aiMessage = {
        id: (Date.now() + 2).toString(),
        type: "ai" as const,
        content: data.response || "I'll search for that now!",
        timestamp: new Date(),
      }

      addMessages([thinkingMessage, aiMessage])

      // Set suggestions from AI response
      if (data.suggestions && data.suggestions.length > 0) {
        setCurrentSuggestions(data.suggestions)
      }

      // Trigger search with the extracted query and filters
      const searchResponse = await onSearch(
        data.searchQuery || content,
        data.filters || {
          orientation: "all",
          category: "photos",
          subcategory: "all",
          resolution: "all",
        },
      )

      console.log("[v0] Search response:", searchResponse)

      // Store search data for the summary block
      const searchData = {
        query: data.searchQuery || content,
        results: searchResponse?.results || [],
        totalResults: searchResponse?.totalResults || 0,
        filters: data.filters || {},
      }
      setLastSearchData(searchData)

      const processingTime = Date.now() - processingStartTime
      const remainingTime = Math.max(0, minLoadingTime - processingTime)

      if (remainingTime > 0) {
        console.log("[v0] Waiting additional", remainingTime, "ms to ensure loading visibility")
        await new Promise((resolve) => setTimeout(resolve, remainingTime))
      }

      setTimeout(() => {
        const searchSummaryMessage = {
          id: (Date.now() + 3).toString(),
          type: "search-summary" as const,
          content: "",
          timestamp: new Date(),
          searchData,
        }
        addMessage(searchSummaryMessage)
        console.log("[v0] Added search summary message for inline display:", searchSummaryMessage)
      }, 1000)
    } catch (error) {
      console.error("Failed to process message:", error)
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai" as const,
        content: "Sorry, I had trouble processing that. Let me search for what you mentioned anyway!",
        timestamp: new Date(),
      }
      addMessage(errorMessage)

      // Clear suggestions on error
      setCurrentSuggestions([])

      // Fallback search with the original user input
      await onSearch(content, {
        orientation: "all",
        category: "photos",
        subcategory: "all",
        resolution: "all",
      })
    } finally {
      setIsProcessing(false)
      console.log("[v0] Processing complete, isProcessing set to false")
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleRevisitSearch = (searchData: any) => {
    onSearch(searchData.query, searchData.filters)
  }

  const handleProjectContextSubmit = async (contextText: string) => {
    updateContext(contextText)

    const confirmationMessage = {
      id: Date.now().toString(),
      type: "ai" as const,
      content: `Context saved! Let me show you some inspirations based on your project.`,
      timestamp: new Date(),
    }
    addMessage(confirmationMessage)

    setIsContextModalOpen(false)

    try {
      setIsProcessing(true)
      const searchStartTime = Date.now()

      const response = await fetch("/api/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages,
            confirmationMessage,
            {
              id: (Date.now() + 1).toString(),
              type: "user",
              content: "Show me some inspirational photos based on my project context",
              timestamp: new Date(),
            },
          ],
          context: { text: contextText },
          searchStyle: currentSearchStyle,
          responseStyle: currentResponseStyle,
        }),
      })

      const data = await response.json()
      const searchDuration = Math.round((Date.now() - searchStartTime) / 1000)

      const thinkingMessage = {
        id: (Date.now() + 2).toString(),
        type: "thinking" as const,
        content: "",
        timestamp: new Date(),
        thinkingData: data.thinkingProcess || {
          duration: `${searchDuration}s`,
          steps: [
            {
              title: "Analyze project context",
              content: [`Extracting visual themes from: "${contextText}"`],
            },
            {
              title: "Generate inspiration keywords",
              content: [`→ '${data.searchQuery || "creative inspiration"}'`],
            },
          ],
        },
      }

      const aiMessage = {
        id: (Date.now() + 3).toString(),
        type: "ai" as const,
        content: data.response || "Here are some inspirational photos based on your project context!",
        timestamp: new Date(),
      }

      addMessages([thinkingMessage, aiMessage])

      if (data.suggestions && data.suggestions.length > 0) {
        setCurrentSuggestions(data.suggestions)
      }

      const searchResponse = await onSearch(
        data.searchQuery || "creative inspiration",
        data.filters || {
          orientation: "all",
          category: "photos",
          subcategory: "all",
          resolution: "all",
        },
      )

      console.log("[v0] Context search response:", searchResponse)

      const searchData = {
        query: data.searchQuery || "creative inspiration",
        results: searchResponse?.results || [],
        totalResults: searchResponse?.totalResults || 0,
        filters: data.filters || {},
      }
      setLastSearchData(searchData)

      setTimeout(() => {
        const searchSummaryMessage = {
          id: (Date.now() + 4).toString(),
          type: "search-summary" as const,
          content: "",
          timestamp: new Date(),
          searchData,
        }
        addMessage(searchSummaryMessage)
        console.log("[v0] Added context search summary message for inline display:", searchSummaryMessage)
      }, 1000)
    } catch (error) {
      console.error("Failed to generate inspiration search:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleContextEdit = () => {
    setIsContextModalOpen(true)
  }

  const handleContextClear = () => {
    clearContext()

    const confirmationMessage = {
      id: Date.now().toString(),
      type: "ai" as const,
      content: "Context cleared. I'll now search without any project-specific bias.",
      timestamp: new Date(),
    }
    addMessage(confirmationMessage)
  }

  const handleImageUpload = () => {
    console.log("Image upload clicked")
  }

  const handleSearchStyleChange = (style: SearchStyle) => {
    setCurrentSearchStyle(style)
  }

  const handleResponseStyleChange = (style: ResponseStyle) => {
    setCurrentResponseStyle(style)
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex-shrink-0 p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Link href="/home" className="hover:opacity-70 transition-opacity">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
              >
                <circle cx="16" cy="16" r="16" fill="none" stroke="#e5e5e5" strokeWidth="1" />
                <path
                  d="M20 16H12M12 16L16 12M12 16L16 20"
                  stroke="#191919"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <h1 className="font-semibold text-gray-900 text-2xl">🐶 🐱 Pet Social Campaign</h1>
          </div>
        </div>
        <p className="text-sm text-gray-600">Pet campaign on Youtube featuring young kids playing with cat, dog</p>
      </div>

      {/* Messages - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => {
          if (message.type === "thinking" && message.thinkingData) {
            return <ThinkingProcessMessage key={message.id} data={message.thinkingData} />
          }

          if (message.type === "search-summary" && message.searchData) {
            return (
              <SearchSummaryBlock
                key={message.id}
                searchQuery={message.searchData.query}
                results={message.searchData.results || []}
                totalResults={message.searchData.totalResults || 0}
                onRevisitSearch={handleRevisitSearch}
                timestamp={message.timestamp}
              />
            )
          }

          const messageElement = <ChatMessageBubble key={message.id} message={message} />

          // Check if this is the first AI message
          if (message.type === "ai" && index === 0) {
            return (
              <div key={message.id}>
                {messageElement}
                <div className="mt-4">
                  <SearchSummaryBlock
                    searchQuery="kids playing with pets"
                    results={[
                      {
                        src: "/kids-playing-with-golden-retriever-in-backyard.jpg",
                        alt: "Kids playing with golden retriever in backyard",
                      },
                      { src: "/children-cuddling-with-cat-on-sofa.jpg", alt: "Children cuddling with cat on sofa" },
                      { src: "/family-with-pets-outdoor-lifestyle.jpg", alt: "Family with pets outdoor lifestyle" },
                      { src: "/kids-feeding-dog-treats-happy-moment.jpg", alt: "Kids feeding dog treats happy moment" },
                    ]}
                    totalResults={156}
                    onRevisitSearch={() => onSearch("kids playing with pets", { category: "photos" })}
                  />
                </div>
              </div>
            )
          }

          return messageElement
        })}

        {isProcessing && (
          <div className="flex items-center gap-2 text-[#707070]">
            <LoadingSpinner size={16} />
            <span className="text-sm">Working on it...</span>
          </div>
        )}
      </div>

      {/* Suggestion Pills - Only show when not processing and suggestions exist */}
      {!isProcessing && currentSuggestions.length > 0 && (
        <SuggestionPills suggestions={currentSuggestions} onSuggestionClick={handleSuggestionClick} />
      )}

      {/* Input - Fixed at bottom */}
      <div className="p-6 flex-shrink-0 bg-white">
        <EnhancedChatInput
          onSend={handleSendMessage}
          onProjectContext={() => setIsContextModalOpen(true)}
          onImageUpload={handleImageUpload}
          disabled={isProcessing}
          onSearchStyleChange={handleSearchStyleChange}
          onResponseStyleChange={handleResponseStyleChange}
        />
      </div>

      {/* Project Context Modal */}
      <ProjectContextModal
        isOpen={isContextModalOpen}
        onClose={() => setIsContextModalOpen(false)}
        onSubmit={handleProjectContextSubmit}
        initialContext={context}
      />

      {/* Search Settings Modal */}
      <SearchSettingsModal
        isOpen={showSearchSettings}
        onClose={() => setShowSearchSettings(false)}
        searchStyle={currentSearchStyle}
        responseStyle={currentResponseStyle}
        onSearchStyleChange={handleSearchStyleChange}
        onResponseStyleChange={handleResponseStyleChange}
      />
    </div>
  )
}
