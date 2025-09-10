"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ChatProvider } from "@/hooks/use-chat-history"
import { FloatingToggle } from "@/components/floating-toggle"
import { SavedItemsProvider } from "@/contexts/saved-items-context"
import { useToast } from "@/components/toast"

function ToastWrapper() {
  const { ToastContainer } = useToast()
  return <ToastContainer />
}

export default function ClientLayout({
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
              <FloatingToggle />
              <ToastWrapper />
            </SavedItemsProvider>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
