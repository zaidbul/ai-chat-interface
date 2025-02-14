"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import type React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-background">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary" />
            <span className="font-semibold">GenerativeAgent</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-64px)] p-4">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">About the bot</h2>
              <p className="text-sm text-muted-foreground">
                This AI assistant is designed to help with various tasks and answer your questions.
              </p>
            </div>
            <Button onClick={() => setShowInfo(true)} className="w-full">
              Learn more
            </Button>
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 border-b border-border px-4 flex items-center justify-between w-full">
          <h1 className="text-sm font-medium">Voice conversation</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Save conversation
            </Button>
          </div>
        </header>
        {children}
      </div>

      {/* Info Card */}
      {showInfo && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <Card className="w-[90%] max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                About GenerativeAgent
                <Button variant="ghost" size="sm" onClick={() => setShowInfo(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                GenerativeAgent is an advanced AI assistant designed to help with a wide range of tasks. It can answer
                questions, provide information, and assist with various activities.
              </p>
              <p className="mt-4">Key features:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Natural language processing</li>
                <li>Context-aware responses</li>
                <li>Multi-turn conversations</li>
                <li>Knowledge across various domains</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

