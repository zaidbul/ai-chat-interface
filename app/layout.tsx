"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type React from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100">
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-700 bg-gray-800">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-blue-500" />
                <span className="font-semibold">Regular Ai</span>
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-64px)] p-4">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">About the bot</h2>
                  <p className="text-sm text-gray-400">
                    This is a regular Ai bot. Nothing special.
                  </p>
                </div>
                <Button
                  onClick={() => setShowInfo(true)}
                  className="w-full bg-blue-500 hover:bg-blue-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Learn more
                </Button>
              </div>
            </ScrollArea>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <header className="h-14 border-b border-gray-700 px-4 flex items-center justify-between w-full bg-gray-800">
              <h1 className="text-sm font-medium">AI Chat</h1>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-gray-100">
                  Save conversation
                </Button>
              </div>
            </header>
            {children}
          </div>

          {/* Info Card */}
          {showInfo && (
            <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
              <Card className="w-[90%] max-w-2xl bg-gray-800 text-gray-100">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    About GenerativeAgent
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowInfo(false)}
                      className="text-gray-300 hover:text-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Use trigger word "Hello World"
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
