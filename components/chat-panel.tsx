"use client"

import { useState } from "react"
import { ChatMessageBubble } from "./chat-message-bubble"
import { EnhancedChatInput } from "./enhanced-chat-input"
import { ThinkingProcessMessage } from "./thinking-process-message"
import { SuggestionPills } from "./suggestion-pills"
import { SearchSummaryBlock } from "./search-summary-block"
import { ProjectContextModal } from "./project-context-modal"
import { ProjectContextChip } from "./project-context-chip"
import { useProjectContext } from "../hooks/use-project-context"
import { useChatHistory } from "../hooks/use-chat-history"
import type { SearchStyle, ResponseStyle } from "../hooks/use-search-style"
import { SearchStyleChip } from "./search-style-chip"
import { SearchSettingsModal } from "./search-settings-modal"
import { ResponseStyleChip } from "./response-style-chip"
import Link from "next/link"

interface ChatPanelProps {
  onSearch: (query: string, filters: any) => void
}

export function ChatPanel({ onSearch }: ChatPanelProps) {
  const { messages, addMessage, addMessages } = useChatHistory()
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([])
  const [lastSearchData, setLastSearchData] = useState<any>(null)
  const [isContextModalOpen, setIsContextModalOpen] = useState(false)
  const [currentSearchStyle, setCurrentSearchStyle] = useState<SearchStyle>("balanced")
  const [currentResponseStyle, setCurrentResponseStyle] = useState<ResponseStyle>("conversational")
  const [showSearchSettings, setShowSearchSettings] = useState(false)

  // Project context management
  const { context, hasContext, updateContext, clearContext } = useProjectContext()

  const handleSendMessage = async (content: string) => {
    const searchStartTime = Date.now()

    const userMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content,
      timestamp: new Date(),
    }
    addMessage(userMessage)
    setIsProcessing(true)

    // Clear current suggestions while processing
    setCurrentSuggestions([])

    try {
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

      // Store search data for the summary block
      const searchData = {
        query: data.searchQuery || content,
        results: searchResponse?.results || [],
        totalResults: searchResponse?.totalResults || 0,
        filters: data.filters || {},
      }
      setLastSearchData(searchData)

      // Add search summary block after search completes (only if we have results)
      if (searchResponse?.results && searchResponse.results.length > 0) {
        setTimeout(() => {
          const searchSummaryMessage = {
            id: (Date.now() + 3).toString(),
            type: "search-summary" as const,
            content: "",
            timestamp: new Date(),
            searchData,
          }
          addMessage(searchSummaryMessage)
        }, 1000)
      }
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
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    // Send the suggestion as if the user typed it
    handleSendMessage(suggestion)
  }

  const handleRevisitSearch = (searchData: any) => {
    // Trigger the search again with the same parameters
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

      // Call compose API to extract search terms from the project context
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

      // Set suggestions from AI response
      if (data.suggestions && data.suggestions.length > 0) {
        setCurrentSuggestions(data.suggestions)
      }

      // Trigger search with the extracted query and filters
      const searchResponse = await onSearch(
        data.searchQuery || "creative inspiration",
        data.filters || {
          orientation: "all",
          category: "photos",
          subcategory: "all",
          resolution: "all",
        },
      )

      // Store search data for the summary block
      const searchData = {
        query: data.searchQuery || "creative inspiration",
        results: searchResponse?.results || [],
        totalResults: searchResponse?.totalResults || 0,
        filters: data.filters || {},
      }
      setLastSearchData(searchData)

      // Add search summary block after search completes (only if we have results)
      if (searchResponse?.results && searchResponse.results.length > 0) {
        setTimeout(() => {
          const searchSummaryMessage = {
            id: (Date.now() + 4).toString(),
            type: "search-summary" as const,
            content: "",
            timestamp: new Date(),
            searchData,
          }
          addMessage(searchSummaryMessage)
        }, 1000)
      }
    } catch (error) {
      console.error("Failed to generate inspiration search:", error)
      // Fallback: just show the confirmation without search
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
    // TODO: Implement image upload functionality
    console.log("Image upload clicked")
  }

  const handleSearchStyleChange = (style: SearchStyle) => {
    setCurrentSearchStyle(style)
  }

  const handleResponseStyleChange = (style: ResponseStyle) => {
    setCurrentResponseStyle(style)
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
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
            <h1 className="text-2xl font-bold text-[#191919]">🐶 🐱 Pet Social Campaign</h1>
          </div>
          <div className="flex items-center gap-2">
            {hasContext && (
              <ProjectContextChip context={context} onEdit={handleContextEdit} onClear={handleContextClear} />
            )}
            {currentSearchStyle !== "balanced" && (
              <SearchStyleChip
                searchStyle={currentSearchStyle}
                onEdit={() => setShowSearchSettings(true)}
                onReset={() => handleSearchStyleChange("balanced")}
              />
            )}
            {currentResponseStyle !== "conversational" && (
              <ResponseStyleChip
                responseStyle={currentResponseStyle}
                onEdit={() => setShowSearchSettings(true)}
                onReset={() => handleResponseStyleChange("conversational")}
              />
            )}
          </div>
        </div>
        <p className="text-[#707070] text-sm">Pet campaign on Youtube featuring young kids playing with cat, dog</p>
      </div>

      {/* Messages - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 border border-transparent">
        {messages.map((message, index) => {
          if (message.type === "thinking" && message.thinkingData) {
            return <ThinkingProcessMessage key={message.id} data={message.thinkingData} />
          }

          if (message.type === "search-summary" && message.searchData) {
            return (
              <SearchSummaryBlock
                key={message.id}
                searchQuery={message.searchData.query}
                results={message.searchData.results}
                totalResults={message.searchData.totalResults}
                onRevisitSearch={() => handleRevisitSearch(message.searchData)}
                timestamp={message.timestamp}
              />
            )
          }

          const isFirstAiMessage = message.type === "ai" && index === 0

          return (
            <div key={message.id}>
              <ChatMessageBubble message={message} />
              {isFirstAiMessage && (
                <div className="mt-4">
                  <SearchSummaryBlock
                    searchQuery="kids playing with cat dog pets lifestyle"
                    results={[
                      {
                        id: "1",
                        src: "/kids-playing-with-golden-retriever-in-backyard.jpg",
                        alt: "Kids playing with golden retriever",
                        title: "Kids playing with golden retriever",
                        author: "Stock Photo",
                      },
                      {
                        id: "2",
                        src: "/children-cuddling-with-cat-on-sofa.jpg",
                        alt: "Children cuddling with cat",
                        title: "Children cuddling with cat",
                        author: "Stock Photo",
                      },
                      {
                        id: "3",
                        src: "/family-with-pets-outdoor-lifestyle.jpg",
                        alt: "Family with pets outdoor",
                        title: "Family with pets outdoor",
                        author: "Stock Photo",
                      },
                      {
                        id: "4",
                        src: "/kids-feeding-dog-treats-happy-moment.jpg",
                        alt: "Kids feeding dog treats",
                        title: "Kids feeding dog treats",
                        author: "Stock Photo",
                      },
                    ]}
                    totalResults={156}
                    onRevisitSearch={() =>
                      onSearch("kids playing with cat dog pets lifestyle", {
                        orientation: "all",
                        category: "photos",
                        subcategory: "all",
                        resolution: "all",
                      })
                    }
                    timestamp={new Date()}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Suggestion Pills - Only show when not processing and suggestions exist */}
      {!isProcessing && currentSuggestions.length > 0 && (
        <SuggestionPills suggestions={currentSuggestions} onSuggestionClick={handleSuggestionClick} />
      )}

      {/* Input - Fixed at bottom */}
      <div className="p-6 flex-shrink-0 bg-white relative border-t-0 border-transparent pt-0 pb-8">
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
