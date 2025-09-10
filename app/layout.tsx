import type React from "react"
import type { Metadata } from "next"
import "./fonts.css"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ChatProvider } from "@/hooks/use-chat-history"
import { ConditionalFloatingToggle } from "@/components/conditional-floating-toggle"
import { SavedItemsProvider } from "@/contexts/saved-items-context"

export const metadata: Metadata = {
  title: "AI Photo Search",
  description: "A collection of reusable components for Envato's design system.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-poly-neutral">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ChatProvider>
            <SavedItemsProvider>
              {children}
              <ConditionalFloatingToggle />
            </SavedItemsProvider>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
