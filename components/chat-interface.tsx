"use client";

import React, { KeyboardEvent } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SendIcon } from "lucide-react";

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  // Submit on Enter (unless Shift is held for a new line)
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-gray-900 text-white">
      <ScrollArea className="flex-1 px-4">
        <div className="max-w-3xl mx-auto py-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-2",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "flex gap-3 max-w-[80%]",
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                {message.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex-shrink-0" />
                )}
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm",
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-200"
                  )}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex-shrink-0" />
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm bg-gray-800 text-gray-200",
                    "animate-pulse"
                  )}
                >
                  Thinking...
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-gray-700 bg-gray-800 p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-4">
          <TextareaAutosize
            placeholder="Type a message..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            minRows={1}
            className="min-h-[44px] max-h-32 flex-grow resize-none bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <SendIcon className="h-4 w-4 text-white" />
          </Button>
        </form>
      </div>
    </div>
  );
}
