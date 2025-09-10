import { type NextRequest, NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

const keywordVariationsSchema = z.object({
  variations: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe("1-3 alternative keyword combinations that maintain core intent but add creative variety"),
})

export async function POST(request: NextRequest) {
  try {
    const { keywords } = await request.json()

    if (!keywords || typeof keywords !== "string") {
      return NextResponse.json({ error: "Keywords string is required" }, { status: 400 })
    }

    const result = await generateObject({
      model: openai("gpt-4o"),
      schema: keywordVariationsSchema,
      system: `You are a creative keyword generator for photo search. Given a set of keywords, create 1-3 alternative combinations that:

1. **Maintain core intent** - Don't change the main subject dramatically
2. **Add creative variety** through:
   - Synonym substitution (e.g., "beautiful" → "stunning", "gorgeous")
   - Style adjustments (e.g., "modern" → "contemporary", "minimalist")
   - Mood variations (e.g., "bright" → "vibrant", "cheerful")
   - Perspective changes (e.g., "close-up" → "macro", "detailed")
   - Creative modifiers (e.g., adding "artistic", "professional", "candid")

3. **Keep practical for photo search** - All terms should be relevant for finding actual photos
4. **Vary keyword order** for different search emphasis
5. **Maintain similar keyword count** (±1-2 keywords from original)

Examples:
- "dog cute outside" → ["adorable puppy outdoors", "playful dog nature", "cute canine outdoor portrait"]
- "sunset beach waves" → ["golden hour coastline surf", "dramatic ocean sunset", "beach waves evening light"]
- "business meeting professional" → ["corporate conference modern", "professional team collaboration", "business discussion contemporary"]`,
      prompt: `Generate 1-3 creative variations of these keywords: "${keywords}"

Each variation should maintain the core search intent while adding creative variety through synonyms, style adjustments, or perspective changes. Keep them practical for photo search.`,
    })

    return NextResponse.json({
      variations: result.object.variations,
      originalKeywords: keywords,
    })
  } catch (error) {
    console.error("Randomize keywords API error:", error)

    // Fallback variations based on simple transformations
    const fallbackVariations = [
      keywords.replace(/\b(cute|beautiful|nice)\b/gi, "stunning"),
      keywords.replace(/\b(photo|picture|image)\b/gi, "shot"),
      `artistic ${keywords}`,
    ]
      .filter((v) => v !== keywords)
      .slice(0, 2)

    return NextResponse.json(
      {
        variations: fallbackVariations.length > 0 ? fallbackVariations : [keywords],
        originalKeywords: keywords,
        error: "Fallback variations used",
      },
      { status: 500 },
    )
  }
}
