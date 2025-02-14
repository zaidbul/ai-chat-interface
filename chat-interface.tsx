"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { SendIcon } from "lucide-react"

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)]">
      <ScrollArea className="flex-1 px-4">
        <div className="max-w-3xl mx-auto py-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={cn("flex gap-2", message.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("flex gap-3 max-w-[80%]", message.role === "user" ? "flex-row-reverse" : "flex-row")}>
                {message.role === "assistant" && <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />}
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Fixed input area at bottom */}
      <div className="border-t border-border bg-background p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-4">
          <Textarea
            placeholder="Type a message..."
            value={input}
            onChange={handleInputChange}
            rows={1}
            className="min-h-[44px] max-h-32 flex-grow resize-none"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

