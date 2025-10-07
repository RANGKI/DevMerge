"use client"

// Change from Next.js imports:
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import axios from "axios"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Search, PenSquare, Hash, FileText, AtSign, Paperclip, Plus, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useForm, usePage } from "@inertiajs/react"


export function ChatInterface({ directMessages }) {
  console.log(directMessages)
  const { props } = usePage()
  const [selectedUser, setSelectedUser] = useState(
    directMessages?.[0] || { id: null, name: "", avatar: "", initials: "" },
  )

  const currentUser = props.auth.user
  console.log(currentUser)
  const conversationId = selectedUser && currentUser
    ? selectedUser.id * currentUser.id
    : null
  const { data, setData, post, processing, reset, errors } = useForm({
    content: "",
    receiver_id: selectedUser?.id,
    sender_id: currentUser.id,
    conversation_id: conversationId,
  })

  // Replace static messages with state and request flags
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [messageInput, setMessageInput] = useState("") // Declare messageInput

  useEffect(() => {
  if (selectedUser?.id) {
    const newConversationId = selectedUser.id * currentUser.id
    setData((prev) => ({
      ...prev,
      receiver_id: selectedUser.id,
      sender_id: currentUser.id,
      conversation_id: newConversationId,
    }))
  }
}, [selectedUser, currentUser]) // runs whenever selectedUser changes


  // send messages

  const handleSendMessage = (e) => {
    e.preventDefault()
    console.log("==================")
    console.log(conversationId)
    if (!selectedUser?.id || !data.content.trim()) return
    post("/user/chat", {
      preserveScroll: true,
      onSuccess: () => {
        // Reset the input field after successful send
        reset('content')
        // Optionally fetch new messages after sending
        fetchMessages(selectedUser?.id)
      },
      onError: (err) => {
        console.error("Send message error:", err)
        setError("Failed to send message")
      },
    })
  }

  // Fetch helper with cancellation
  const fetchMessages = async (userId, controller) => {
    if (!userId) return
    try {
      setLoading(true)
      setError(null)
      console.log("[v0] Fetching messages for user:", userId)
      // NOTE: adjust this endpoint to your backend route
      const res = await axios.get(`/user/chat/direct_messages/${conversationId}`, {
        signal: controller?.signal,
      })
      // Accept either { messages: [...] } or raw array
      console.log("messages",res)
      const next = Array.isArray(res.data) ? res.data : res.data?.messages || []
      setMessages(next)
      console.log("[v0] Messages received:", next.length)
    } catch (err) {
      if (axios.isCancel?.(err)) {
        console.log("[v0] Request canceled")
        return
      }
      console.log("[v0] Fetch error:", err?.message)
      setError("Failed to load messages")
    } finally {
      setLoading(false)
    }
  }

  // Trigger fetch when selected user changes
  useEffect(() => {
    const controller = new AbortController()
    fetchMessages(selectedUser?.id, controller)
    return () => controller.abort()
  }, [selectedUser?.id])

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
            {loading && (
              <div className="flex items-center justify-center py-8">
                <span className="text-sm text-muted-foreground">Loading messages…</span>
              </div>
            )}
            {!loading && error && (
              <div className="flex items-center justify-center py-8">
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}
            {!loading && !error && messages.length === 0 && (
              <div className="flex items-center justify-center py-8">
                <span className="text-sm text-muted-foreground">
                  {selectedUser?.id ? "No messages yet." : "Select a user to view messages."}
                </span>
              </div>
            )}

            {/* Date Separator */}
            {!loading && !error && messages.length > 0 && (
              <div className="flex items-center justify-center">
                <span className="text-xs text-muted-foreground bg-background px-3 py-1 rounded-full">
                  Wednesday, July 26th
                </span>
              </div>
            )}

            {!loading &&
              !error &&
              messages.map((message) => (
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

            {/* Typing Indicator (optional) */}
            {!loading && !error && messages.length > 0 && (
              <div className="flex gap-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={selectedUser?.avatar || "/placeholder.svg"} alt={selectedUser?.name} />
                  <AvatarFallback>{selectedUser?.initials}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1 bg-accent rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <form onSubmit={handleSendMessage}>
          <div className="border-t border-border p-4 bg-card">
            <div className="max-w-4xl mx-auto flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2 bg-background border border-border rounded-lg px-4 py-3">
                <Input
                  value={data.content}
                  onChange={(e) => setData('content', e.target.value)}
                  placeholder={`Message ${selectedUser.name}`}
                  className="flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={processing}
                />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
              <Button 
                type="submit" 
                className="bg-foreground text-background hover:bg-foreground/90 px-6" 
                disabled={processing || !data.content.trim()}
              >
                Send
              </Button>
            </div>
            {errors.content && (
              <p className="text-red-600 text-sm mt-2">{errors.content}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
