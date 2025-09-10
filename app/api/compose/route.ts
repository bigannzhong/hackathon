import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface ConversationMessage {
  id: string
  type: "user" | "ai" | "thinking" | "search-summary"
  content: string
  timestamp: Date
  searchData?: {
    query: string
    results: any[]
    totalResults: number
    filters: any
  }
}

function createConversationSummary(messages: ConversationMessage[]): string {
  if (messages.length <= 3) return "" // No summary needed for short conversations

  // Extract key information from conversation history
  const userMessages = messages.filter((m) => m.type === "user").slice(0, -1) // Exclude current message
  const searchMessages = messages.filter((m) => m.type === "search-summary")

  if (userMessages.length === 0) return ""

  const subjects = new Set<string>()
  const styles = new Set<string>()
  const constraints = new Set<string>()

  // Extract key themes from previous user messages
  userMessages.forEach((msg) => {
    const content = msg.content.toLowerCase()

    // Extract subjects (nouns that might be photo subjects)
    const subjectWords = content.match(
      /\b(sunset|beach|mountain|forest|city|portrait|landscape|nature|architecture|food|fashion|business|technology|abstract|vintage|modern|minimalist|colorful|dark|bright|moody)\b/g,
    )
    subjectWords?.forEach((word) => subjects.add(word))

    // Extract style indicators
    const styleWords = content.match(
      /\b(vintage|modern|minimalist|artistic|creative|professional|casual|dramatic|soft|bold|elegant|rustic|industrial|organic)\b/g,
    )
    styleWords?.forEach((word) => styles.add(word))

    // Extract constraints
    if (content.includes("vertical") || content.includes("portrait")) constraints.add("vertical orientation")
    if (content.includes("horizontal") || content.includes("landscape")) constraints.add("horizontal orientation")
    if (content.includes("bright")) constraints.add("bright lighting")
    if (content.includes("dark") || content.includes("moody")) constraints.add("dark/moody")
  })

  // Get recent search queries for context
  const recentSearches = searchMessages
    .slice(-2)
    .map((m) => m.searchData?.query)
    .filter(Boolean)

  let summary = "CONVERSATION CONTEXT:\n"

  if (subjects.size > 0) {
    summary += `Previous subjects discussed: ${Array.from(subjects).join(", ")}\n`
  }

  if (styles.size > 0) {
    summary += `Style preferences mentioned: ${Array.from(styles).join(", ")}\n`
  }

  if (constraints.size > 0) {
    summary += `Constraints noted: ${Array.from(constraints).join(", ")}\n`
  }

  if (recentSearches.length > 0) {
    summary += `Recent searches: ${recentSearches.join(", ")}\n`
  }

  return summary
}

function getRecentContext(messages: ConversationMessage[]): string {
  if (messages.length <= 1) return ""

  // Get last 3-4 exchanges (user + ai pairs) for immediate context
  const recentMessages = messages.slice(-6) // Last 6 messages (3 exchanges)

  let context = "RECENT CONVERSATION:\n"
  recentMessages.forEach((msg) => {
    if (msg.type === "user") {
      context += `User: "${msg.content}"\n`
    } else if (msg.type === "ai") {
      context += `AI: "${msg.content}"\n`
    } else if (msg.type === "search-summary" && msg.searchData) {
      context += `Search: "${msg.searchData.query}" (${msg.searchData.totalResults} results)\n`
    }
  })

  return context
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, context, searchStyle = "balanced", responseStyle = "conversational" } = body

    // Get the latest user message
    const userMessage = messages[messages.length - 1]?.content || ""

    const conversationSummary = createConversationSummary(messages)
    const recentContext = getRecentContext(messages)

    // Build the system prompt with search style and response style
    let systemPrompt = `You are an AI assistant that helps users find photos by converting their natural language requests into search queries and providing helpful responses.

${conversationSummary}

${recentContext}

SEARCH INTENT (${searchStyle.toUpperCase()}):
${
  searchStyle === "creative"
    ? `
- Focus on artistic and conceptual interpretations
- Use abstract and mood-based keywords
- Prioritize aesthetic and emotional qualities
- Include artistic styles and creative concepts
`
    : searchStyle === "exact"
      ? `
- Use literal and specific keywords from user input
- Focus on concrete objects and subjects
- Minimize interpretation and abstraction
- Stick closely to what was explicitly mentioned
`
      : `
- Balance literal keywords with creative interpretation
- Include both specific subjects and mood/style elements
- Consider context and implied meanings
- Provide comprehensive but focused search terms
`
}

RESPONSE STYLE (${responseStyle.toUpperCase()}):
${
  responseStyle === "conversational"
    ? `
- Use a friendly, casual tone with 1-2 paragraphs
- Include light suggestions and prompts for exploration
- Optional use of 1-2 emoji maximum
- End with a gentle next step or refinement suggestion
`
    : responseStyle === "inquisitive"
      ? `
- Start with 1 intro sentence, then ask 2 targeted questions in bullet points
- Use a curious, exploratory tone to uncover possibilities
- End with an invitation to choose one direction
- Focus on clarifying user needs and sparking ideas
`
      : responseStyle === "direct"
        ? `
- Keep responses to 3 lines maximum
- No small talk or casual conversation
- No emoji usage
- End with a terse, clear next step
- Straight to the point with minimal commentary
`
        : `
- Provide a summary followed by 3-5 key bullet points
- Include specific style, mood, and orientation ideas
- Thorough and descriptive with relevant context
- End with 1-2 precise next steps for refinement
`
}

CONTEXT HANDLING:
${
  context
    ? `
Project Context: "${context.text}"
- Use this context to inform search keywords when relevant
- When users ask for "inspirational photos based on context", extract visual themes from the context rather than using literal request words
- Focus on mood, style, subjects, and visual elements that would support this project
`
    : "- No project context provided"
}

CONVERSATIONAL MEMORY RULES:
- Handle follow-up requests like "more like the first one", "make it moodier", "similar but brighter"
- Reference previous subjects, styles, and constraints from conversation history
- When user says "like the first one" or "similar", use the first search query as base
- When user requests modifications (moodier, brighter, different style), apply changes to the most recent search
- Preserve established preferences unless explicitly overridden
- Use conversation context to understand ambiguous requests

Your response should include:
1. "searchQuery": The optimized search keywords (string)
2. "response": Your reply to the user following the response style
3. "suggestions": Array of 3-4 follow-up suggestions
4. "filters": Object with category, orientation, etc.

IMPORTANT: 
- Never use words like "inspirational", "based", "context", "project" in search queries
- When handling inspiration requests, extract concrete visual themes from the context
- Always end responses with a clear next step
- Never claim to create images - only help find photos
- Use conversation history to understand references to previous searches`

    // Check if this is an inspiration request with context
    const isInspirationRequest =
      context &&
      (userMessage.toLowerCase().includes("inspiration") ||
        userMessage.toLowerCase().includes("based on") ||
        userMessage.toLowerCase().includes("project context"))

    if (isInspirationRequest) {
      systemPrompt += `

SPECIAL INSTRUCTION: The user is asking for inspiration based on their project context. Extract visual themes, subjects, moods, and styles from the project context to create search keywords. Do NOT use the user's request words literally.`
    }

    let prompt = `User message: "${userMessage}"`

    // Add context about follow-up requests
    if (
      userMessage.toLowerCase().includes("like the first") ||
      userMessage.toLowerCase().includes("similar to") ||
      userMessage.toLowerCase().includes("more like")
    ) {
      prompt += `

This appears to be a follow-up request referencing previous searches. Use the conversation history to understand what they're referring to.`
    }

    if (
      userMessage.toLowerCase().includes("moodier") ||
      userMessage.toLowerCase().includes("brighter") ||
      userMessage.toLowerCase().includes("darker") ||
      userMessage.toLowerCase().includes("lighter")
    ) {
      prompt += `

This is a modification request. Apply the requested changes to the most recent search context.`
    }

    prompt += `

Please provide a JSON response with searchQuery, response, suggestions, and filters.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: prompt,
    })

    // Parse the AI response
    let parsedResponse
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No JSON found in response")
      }
    } catch (parseError) {
      // Fallback if JSON parsing fails
      parsedResponse = {
        searchQuery: userMessage,
        response: "I'll search for that now!",
        suggestions: ["Try a different style", "Add more details", "Specify colors"],
        filters: {
          category: "photos",
          orientation: "all",
          subcategory: "all",
          resolution: "all",
        },
      }
    }

    return NextResponse.json(parsedResponse)
  } catch (error) {
    console.error("Compose API error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
