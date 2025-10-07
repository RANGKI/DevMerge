// Change from Next.js imports:
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Search, PenSquare, Hash, FileText, AtSign, Paperclip, Plus, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for direct messages
// const directMessages = [
//   { id: 1, name: "Ethan Anderson", avatar: "/man.jpg", initials: "EA" },
//   { id: 2, name: "Noah Martinez", avatar: "/man-beard.jpg", initials: "NM", active: true },
//   { id: 3, name: "Olivia Mitchell", avatar: "/woman-red.jpg", initials: "OM" },
//   { id: 4, name: "Ava Williams", avatar: "/woman-dark.jpg", initials: "AW" },
//   { id: 5, name: "Liam Johnson", avatar: "/man-dark.jpg", initials: "LJ" },
//   { id: 6, name: "Benjamin Parker", avatar: "/man-brown.jpg", initials: "BP" },
//   { id: 7, name: "Olivia Adams", avatar: "/woman-blonde.jpg", initials: "OA" },
//   { id: 8, name: "Sophie Jones", avatar: "/woman-brunette.jpg", initials: "SJ" },
// ]

// Mock messages
const messages = [
  {
    id: 1,
    sender: "Noah Martinez",
    content: "Hey Amanda, are you around? 🙂",
    timestamp: "09:03 AM",
    avatar: "/man-beard.jpg",
    initials: "NM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Hey 👋 What's up?",
    timestamp: "09:03 AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Noah Martinez",
    content:
      "Do you mind sending me the brief for the new campaign? Ethan told me about it and I want to go over it with him.",
    timestamp: "09:08 AM",
    avatar: "/man-beard.jpg",
    initials: "NM",
    isOwn: false,
  },
  {
    id: 4,
    sender: "You",
    content: "Of course. I'll go through the specs and get back to you shortly.",
    timestamp: "09:11 AM",
    isOwn: true,
  },
]

export function ChatInterface({directMessages}) {
  console.log(directMessages)
  const [selectedUser, setSelectedUser] = useState(
  directMessages?.[0] || { id: null, name: "", avatar: "", initials: "" }
  )

  const [messageInput, setMessageInput] = useState("")

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-60 border-r border-border flex flex-col bg-card">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              Messages / <span className="text-foreground font-medium">Team Chat</span>
            </div>
          </div>

          {/* New Message Button */}
          <Button className="w-full justify-start gap-2 bg-foreground text-background hover:bg-foreground/90">
            <PenSquare className="h-4 w-4" />
            New Message
          </Button>
        </div>

        {/* Navigation Items */}
        <div className="px-3 py-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors">
            <Hash className="h-4 w-4" />
            Channels
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors">
            <FileText className="h-4 w-4" />
            Drafts
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors">
            <AtSign className="h-4 w-4" />
            Mentions
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors">
            <Paperclip className="h-4 w-4" />
            Files & Media
          </button>
        </div>

        <Separator />

        {/* Direct Messages */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="px-4 py-3">
            <h3 className="text-sm font-medium text-muted-foreground">Direct Messages</h3>
          </div>

          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1 pb-4">
              {directMessages.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    selectedUser.id === user.id ? "bg-accent" : "hover:bg-accent/50",
                  )}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">{user.name}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b border-border px-6 flex items-center justify-between bg-card">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search" className="w-64 h-9 bg-background border-border" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Chat Title */}
        <div className="px-6 py-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Chat with {selectedUser.name}</h1>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Date Separator */}
            <div className="flex items-center justify-center">
              <span className="text-xs text-muted-foreground bg-background px-3 py-1 rounded-full">
                Wednesday, July 26th
              </span>
            </div>

            {/* Messages */}
            {messages.map((message) => (
              <div key={message.id} className={cn("flex gap-3", message.isOwn && "justify-end")}>
                {!message.isOwn && (
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                    <AvatarFallback>{message.initials}</AvatarFallback>
                  </Avatar>
                )}

                <div className={cn("flex flex-col gap-1 max-w-xl", message.isOwn && "items-end")}>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3",
                      message.isOwn
                        ? "bg-accent text-foreground"
                        : "bg-purple-100 dark:bg-purple-900/30 text-foreground",
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    {!message.isOwn && <span className="text-xs font-medium text-foreground">{message.sender}</span>}
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src="/man-beard.jpg" alt="Noah Martinez" />
                <AvatarFallback>NM</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1 bg-accent rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t border-border p-4 bg-card">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-background border border-border rounded-lg px-4 py-3">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={`Message ${selectedUser.name}`}
                className="flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <Button className="bg-foreground text-background hover:bg-foreground/90 px-6">Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
