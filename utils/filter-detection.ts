// Dynamic filter detection utilities

export interface DetectedFilter {
  type: "dogBreed" | "style" | "mood" | "season"
  label: string
  options: string[]
  preSelected?: string
}

// Filter option definitions
export const FILTER_OPTIONS = {
  dogBreed: [
    "Labrador Retriever",
    "Golden Retriever",
    "German Shepherd",
    "Poodle",
    "Bulldog",
    "Beagle",
    "Husky",
    "Dachshund",
    "Chihuahua",
    "Mixed Breed",
  ],
  style: [
    "Cinematic",
    "Minimal",
    "Vintage",
    "Retro",
    "Modern",
    "Artistic",
    "Abstract",
    "Realistic",
    "High Contrast",
    "Pastel",
  ],
  mood: ["Happy", "Playful", "Calm", "Energetic", "Romantic", "Serious", "Inspired", "Moody", "Excited", "Relaxed"],
  season: [
    "Summer",
    "Winter",
    "Spring",
    "Autumn / Fall",
    "Christmas",
    "Halloween",
    "Easter",
    "Valentine's Day",
    "New Year",
    "Thanksgiving",
  ],
}

// Trigger keyword mappings
const TRIGGER_KEYWORDS = {
  dogBreed: {
    explicit: ["dog", "dogs", "canine", "puppy", "puppies", "breed"],
    breeds: {
      labrador: "Labrador Retriever",
      lab: "Labrador Retriever",
      "golden retriever": "Golden Retriever",
      golden: "Golden Retriever",
      "german shepherd": "German Shepherd",
      shepherd: "German Shepherd",
      poodle: "Poodle",
      bulldog: "Bulldog",
      beagle: "Beagle",
      husky: "Husky",
      dachshund: "Dachshund",
      "wiener dog": "Dachshund",
      chihuahua: "Chihuahua",
      mixed: "Mixed Breed",
      mutt: "Mixed Breed",
    },
  },
  style: {
    explicit: ["style", "vibe", "aesthetic", "look"],
    styles: {
      cinematic: "Cinematic",
      minimal: "Minimal",
      minimalist: "Minimal",
      vintage: "Vintage",
      retro: "Retro",
      modern: "Modern",
      contemporary: "Modern",
      artistic: "Artistic",
      abstract: "Abstract",
      realistic: "Realistic",
      "high contrast": "High Contrast",
      pastel: "Pastel",
    },
  },
  mood: {
    explicit: ["mood", "feeling", "emotion"],
    moods: {
      happy: "Happy",
      joyful: "Happy",
      playful: "Playful",
      fun: "Playful",
      calm: "Calm",
      peaceful: "Calm",
      serene: "Calm",
      energetic: "Energetic",
      dynamic: "Energetic",
      romantic: "Romantic",
      love: "Romantic",
      serious: "Serious",
      professional: "Serious",
      inspired: "Inspired",
      creative: "Inspired",
      moody: "Moody",
      dramatic: "Moody",
      excited: "Excited",
      enthusiastic: "Excited",
      relaxed: "Relaxed",
      chill: "Relaxed",
      angry: "Serious",
      sad: "Moody",
    },
  },
  season: {
    explicit: ["season", "time", "occasion", "holiday"],
    seasons: {
      summer: "Summer",
      beach: "Summer",
      sunny: "Summer",
      winter: "Winter",
      snow: "Winter",
      snowy: "Winter",
      cold: "Winter",
      spring: "Spring",
      bloom: "Spring",
      flowers: "Spring",
      autumn: "Autumn / Fall",
      fall: "Autumn / Fall",
      leaves: "Autumn / Fall",
      christmas: "Christmas",
      xmas: "Christmas",
      santa: "Christmas",
      halloween: "Halloween",
      spooky: "Halloween",
      pumpkin: "Halloween",
      easter: "Easter",
      bunny: "Easter",
      valentine: "Valentine's Day",
      valentines: "Valentine's Day",
      love: "Valentine's Day",
      "new year": "New Year",
      thanksgiving: "Thanksgiving",
      turkey: "Thanksgiving",
    },
  },
}

export function detectFiltersFromQuery(query: string): DetectedFilter[] {
  const detectedFilters: DetectedFilter[] = []
  const lowerQuery = query.toLowerCase()

  // Check for dog breed filters
  const dogTriggers = TRIGGER_KEYWORDS.dogBreed
  const hasDogKeyword = dogTriggers.explicit.some((keyword) => lowerQuery.includes(keyword))
  let dogBreedMatch: string | undefined

  // Check for specific breed mentions
  for (const [keyword, breed] of Object.entries(dogTriggers.breeds)) {
    if (lowerQuery.includes(keyword)) {
      dogBreedMatch = breed
      break
    }
  }

  if (hasDogKeyword || dogBreedMatch) {
    detectedFilters.push({
      type: "dogBreed",
      label: "Dog Breed",
      options: FILTER_OPTIONS.dogBreed,
      preSelected: dogBreedMatch,
    })
  }

  // Check for style filters
  const styleTriggers = TRIGGER_KEYWORDS.style
  const hasStyleKeyword = styleTriggers.explicit.some((keyword) => lowerQuery.includes(keyword))
  let styleMatch: string | undefined

  for (const [keyword, style] of Object.entries(styleTriggers.styles)) {
    if (lowerQuery.includes(keyword)) {
      styleMatch = style
      break
    }
  }

  if (hasStyleKeyword || styleMatch) {
    detectedFilters.push({
      type: "style",
      label: "Style",
      options: FILTER_OPTIONS.style,
      preSelected: styleMatch,
    })
  }

  // Check for mood filters
  const moodTriggers = TRIGGER_KEYWORDS.mood
  const hasMoodKeyword = moodTriggers.explicit.some((keyword) => lowerQuery.includes(keyword))
  let moodMatch: string | undefined

  for (const [keyword, mood] of Object.entries(moodTriggers.moods)) {
    if (lowerQuery.includes(keyword)) {
      moodMatch = mood
      break
    }
  }

  if (hasMoodKeyword || moodMatch) {
    detectedFilters.push({
      type: "mood",
      label: "Mood",
      options: FILTER_OPTIONS.mood,
      preSelected: moodMatch,
    })
  }

  // Check for season/occasion filters
  const seasonTriggers = TRIGGER_KEYWORDS.season
  const hasSeasonKeyword = seasonTriggers.explicit.some((keyword) => lowerQuery.includes(keyword))
  let seasonMatch: string | undefined

  for (const [keyword, season] of Object.entries(seasonTriggers.seasons)) {
    if (lowerQuery.includes(keyword)) {
      seasonMatch = season
      break
    }
  }

  if (hasSeasonKeyword || seasonMatch) {
    detectedFilters.push({
      type: "season",
      label: "Season / Occasion",
      options: FILTER_OPTIONS.season,
      preSelected: seasonMatch,
    })
  }

  return detectedFilters
}
