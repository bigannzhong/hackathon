"use client"

import { usePathname, useRouter } from "next/navigation"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function FloatingToggle() {
  const pathname = usePathname()
  const router = useRouter()

  // Determine active value based on current route
  const activeValue = pathname.startsWith("/project-canvas") ? "canvas" : "chat"

  const handleValueChange = (value: string) => {
    if (value === "chat") {
      router.push("/chat")
    } else if (value === "canvas") {
      router.push("/project-canvas")
    }
  }

  return (
    <div className="fixed bottom-6 left-[calc(35%+32.5%)] transform -translate-x-1/2 z-50">
      <div className="bg-white border border-gray-200 rounded-full shadow-lg px-1 py-1">
        <ToggleGroup type="single" value={activeValue} onValueChange={handleValueChange} className="gap-0">
          <ToggleGroupItem
            value="chat"
            className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 data-[state=on]:bg-gray-900 data-[state=on]:text-white data-[state=off]:text-gray-600 data-[state=off]:hover:text-gray-900 data-[state=off]:hover:bg-gray-50"
          >
            Search
          </ToggleGroupItem>
          <ToggleGroupItem
            value="canvas"
            className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 data-[state=on]:bg-gray-900 data-[state=on]:text-white data-[state=off]:text-gray-600 data-[state=off]:hover:text-gray-900 data-[state=off]:hover:bg-gray-50"
          >
            Workspace
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}
