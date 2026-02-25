"use client"

import { useState } from "react"
import {
  Trash2, Search, Mail, MailOpen, Calendar, User, Send,
  MessageSquare, Inbox, MailWarning,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { mockMessages } from "@/mocks/data"
import type { Message, MessageReply } from "@/lib/types"
import { toast } from "sonner"

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [search, setSearch] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [replyContent, setReplyContent] = useState("")

  const filtered = messages.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase())
  )
  const unreadCount = messages.filter((m) => !m.read).length
  const totalReplies = messages.reduce((acc, m) => acc + m.replies.length, 0)

  const openMessage = (msg: Message) => {
    setSelectedMessage(msg)
    setReplyContent("")
    if (!msg.read) {
      setMessages(messages.map((m) => (m.id === msg.id ? { ...m, read: true } : m)))
    }
  }

  const handleReply = () => {
    if (!replyContent.trim() || !selectedMessage) return
    const newReply: MessageReply = {
      id: `r-${Date.now()}`,
      content: replyContent,
      author: "Admin PEDER",
      createdAt: new Date().toISOString().split("T")[0],
    }
    const updated = messages.map((m) =>
      m.id === selectedMessage.id ? { ...m, replies: [...m.replies, newReply] } : m
    )
    setMessages(updated)
    setSelectedMessage({ ...selectedMessage, replies: [...selectedMessage.replies, newReply] })
    setReplyContent("")
    toast.success("Reponse envoyee", { description: `Votre reponse a ete envoyee a ${selectedMessage.name}.` })
  }

  const handleDelete = () => {
    if (selectedMessage) {
      setMessages(messages.filter((m) => m.id !== selectedMessage.id))
      toast.success("Message supprime")
      setSelectedMessage(null)
    }
    setDeleteDialogOpen(false)
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total messages</CardTitle><Inbox className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{messages.length}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Non lus</CardTitle><MailWarning className="h-4 w-4 text-amber-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{unreadCount}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Lus</CardTitle><MailOpen className="h-4 w-4 text-emerald-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{messages.length - unreadCount}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Reponses</CardTitle><MessageSquare className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">{totalReplies}</div></CardContent></Card>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        {unreadCount > 0 && <Badge variant="destructive">{unreadCount} non lu{unreadCount > 1 ? "s" : ""}</Badge>}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Message List */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="max-h-[600px] divide-y divide-border overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-10">
                    <Mail className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Aucun message</span>
                  </div>
                ) : filtered.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => openMessage(msg)}
                    className={`flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-muted/50 ${
                      selectedMessage?.id === msg.id ? "bg-primary/5 border-l-2 border-l-primary" : ""
                    } ${!msg.read ? "bg-primary/5" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${!msg.read ? "font-semibold" : "font-medium"} text-foreground`}>{msg.name}</span>
                      {!msg.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                    </div>
                    <span className={`line-clamp-1 text-sm ${!msg.read ? "font-medium" : ""} text-foreground`}>{msg.subject}</span>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{msg.email}</span>
                      <span className="text-xs text-muted-foreground">{new Date(msg.createdAt).toLocaleDateString("fr-FR")}</span>
                    </div>
                    {msg.replies.length > 0 && (
                      <span className="flex items-center gap-1 text-xs text-primary"><MessageSquare className="h-3 w-3" />{msg.replies.length} reponse{msg.replies.length > 1 ? "s" : ""}</span>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail & Thread */}
        <div className="lg:col-span-3">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold text-foreground">{selectedMessage.subject}</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-3.5 w-3.5" />
                      <span>{selectedMessage.name}</span>
                      <span className="text-muted-foreground/50">|</span>
                      <span>{selectedMessage.email}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(selectedMessage.createdAt).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteDialogOpen(true)} className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                {/* Thread */}
                <div className="flex flex-col gap-4">
                  {/* Original message */}
                  <div className="rounded-lg border border-input bg-muted/20 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {selectedMessage.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground">{selectedMessage.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{new Date(selectedMessage.createdAt).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">{selectedMessage.message}</p>
                  </div>

                  {/* Replies */}
                  {selectedMessage.replies.map((reply) => (
                    <div key={reply.id} className="ml-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                          {reply.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-foreground">{reply.author}</span>
                          <span className="ml-2 text-xs text-muted-foreground">{new Date(reply.createdAt).toLocaleDateString("fr-FR")}</span>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground">{reply.content}</p>
                    </div>
                  ))}

                  {/* Reply form */}
                  <Separator className="my-2" />
                  <div className="flex flex-col gap-3">
                    <span className="text-sm font-medium text-foreground">Repondre</span>
                    <Textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={`Repondre a ${selectedMessage.name}...`}
                      rows={4}
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleReply} disabled={!replyContent.trim()} className="gap-2">
                        <Send className="h-4 w-4" />
                        Envoyer la reponse
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-20">
                <Mail className="h-12 w-12 text-muted-foreground/30" />
                <p className="mt-3 text-sm text-muted-foreground">Selectionnez un message pour le lire</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ConfirmDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} title="Supprimer le message" description={`Supprimer le message de "${selectedMessage?.name}" ?`} confirmLabel="Supprimer" onConfirm={handleDelete} />
    </div>
  )
}
