import { cn } from "@/lib/utils"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

interface ChatMessageBubbleProps {
  message: Message
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.type === "user"

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] text-base",
          isUser
            ? "bg-brand-softserve text-brand-content-primary rounded-2xl px-6 py-4"
            : "bg-transparent text-brand-content-primary",
        )}
      >
        <p className={cn(isUser ? "" : "w-full")}>{message.content}</p>
      </div>
    </div>
  )
}
