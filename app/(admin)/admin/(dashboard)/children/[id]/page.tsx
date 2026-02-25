"use client"

import { use, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft, Pencil, Calendar, MapPin, Phone, User, Plus, Download, Trash2,
  GraduationCap, Stethoscope, Users, FileText, LogOut as LogOutIcon, BookOpen, Baby,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { mockChildren } from "@/mocks/data"
import type { ChildEvent, ChildRecord } from "@/lib/types"
import { generateChildPDF } from "@/lib/generate-child-pdf"
import { toast } from "sonner"

const statusConfig: Record<ChildRecord["status"], { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Actif", variant: "default" },
  reinserted: { label: "Reinsere", variant: "secondary" },
  in_training: { label: "En formation", variant: "outline" },
  left: { label: "Sorti", variant: "destructive" },
}

const eventIcons: Record<ChildEvent["type"], React.ComponentType<{ className?: string }>> = {
  enrollment: BookOpen, transfer: LogOutIcon, medical: Stethoscope,
  education: GraduationCap, family: Users, note: FileText, exit: LogOutIcon,
}

const eventLabels: Record<ChildEvent["type"], string> = {
  enrollment: "Admission", transfer: "Transfert", medical: "Medical",
  education: "Education", family: "Famille", note: "Note", exit: "Sortie",
}

const eventTypes: { value: ChildEvent["type"]; label: string }[] = [
  { value: "enrollment", label: "Admission" },
  { value: "education", label: "Education" },
  { value: "medical", label: "Medical" },
  { value: "family", label: "Famille" },
  { value: "transfer", label: "Transfert" },
  { value: "note", label: "Note" },
  { value: "exit", label: "Sortie" },
]

export default function ChildDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const child = mockChildren.find((c) => c.id === id)
  const [history, setHistory] = useState<ChildEvent[]>(child?.history ?? [])

  // Add event state
  const [eventOpen, setEventOpen] = useState(false)
  const [eventType, setEventType] = useState<ChildEvent["type"]>("note")
  const [eventDesc, setEventDesc] = useState("")
  const [eventDate, setEventDate] = useState(new Date().toISOString().split("T")[0])

  // Edit event state
  const [editOpen, setEditOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<ChildEvent | null>(null)
  const [editType, setEditType] = useState<ChildEvent["type"]>("note")
  const [editDesc, setEditDesc] = useState("")
  const [editDate, setEditDate] = useState("")

  // Delete event state
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletingEvent, setDeletingEvent] = useState<ChildEvent | null>(null)

  if (!child) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10">
        <Baby className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">Enfant non trouve.</p>
        <Button asChild variant="outline"><Link href="/admin/children"><ArrowLeft className="mr-2 h-4 w-4" />Retour</Link></Button>
      </div>
    )
  }

  const addEvent = () => {
    if (!eventDesc.trim()) { toast.error("La description est requise"); return }
    const newEvent: ChildEvent = {
      id: `e${Date.now()}`, date: eventDate,
      type: eventType, description: eventDesc, author: "Admin",
    }
    setHistory([newEvent, ...history])
    setEventOpen(false)
    setEventDesc("")
    setEventDate(new Date().toISOString().split("T")[0])
    toast.success("Evenement ajoute", { description: `${eventLabels[eventType]} enregistre.` })
  }

  const openEdit = (event: ChildEvent) => {
    setEditingEvent(event)
    setEditType(event.type)
    setEditDesc(event.description)
    setEditDate(event.date)
    setEditOpen(true)
  }

  const saveEdit = () => {
    if (!editingEvent || !editDesc.trim()) { toast.error("La description est requise"); return }
    setHistory(history.map((e) =>
      e.id === editingEvent.id
        ? { ...e, type: editType, description: editDesc, date: editDate }
        : e
    ))
    setEditOpen(false)
    setEditingEvent(null)
    toast.success("Evenement modifie")
  }

  const confirmDeleteEvent = () => {
    if (!deletingEvent) return
    setHistory(history.filter((e) => e.id !== deletingEvent.id))
    setDeleteOpen(false)
    setDeletingEvent(null)
    toast.success("Evenement supprime")
  }

  const handleExportPDF = () => {
    try {
      generateChildPDF({ ...child, history })
      toast.success("PDF telecharge", { description: `Fiche de ${child.firstName} ${child.lastName} exportee.` })
    } catch {
      toast.error("Erreur lors de la generation du PDF")
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" asChild className="gap-2 self-start"><Link href="/admin/children"><ArrowLeft className="h-4 w-4" />Retour</Link></Button>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleExportPDF} className="gap-2"><Download className="h-4 w-4" />Exporter PDF</Button>
          <Button variant="outline" onClick={() => setEventOpen(true)} className="gap-2"><Plus className="h-4 w-4" />Ajouter un evenement</Button>
          <Button asChild className="gap-2"><Link href={`/admin/children/${id}/edit`}><Pencil className="h-4 w-4" />Modifier</Link></Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            {child.photo ? (
              <img src={child.photo} alt={`${child.firstName} ${child.lastName}`} className="h-24 w-24 rounded-full object-cover border-4 border-border" crossOrigin="anonymous" />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">{child.firstName[0]}{child.lastName[0]}</div>
            )}
            <div className="text-center">
              <h3 className="text-lg font-semibold">{child.firstName} {child.lastName}</h3>
              <Badge variant={statusConfig[child.status].variant} className="mt-1">{statusConfig[child.status].label}</Badge>
            </div>
            <Separator />
            <div className="flex w-full flex-col gap-3 text-sm">
              <div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /><span>{child.gender === "M" ? "Garcon" : "Fille"}, {child.age} ans</span></div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><span>Ne(e) le {new Date(child.birthDate).toLocaleDateString("fr-FR")}</span></div>
              <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-muted-foreground" /><span>{child.program}</span></div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /><span>{child.center}</span></div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><span>Inscrit le {new Date(child.enrollmentDate).toLocaleDateString("fr-FR")}</span></div>
              {child.exitDate && <div className="flex items-center gap-2"><LogOutIcon className="h-4 w-4 text-muted-foreground" /><span>Sorti le {new Date(child.exitDate).toLocaleDateString("fr-FR")}</span></div>}
              {child.parentContact && <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /><span>{child.parentContact}</span></div>}
            </div>
            {child.notes && (
              <>
                <Separator />
                <div className="w-full"><p className="text-sm leading-relaxed text-muted-foreground">{child.notes}</p></div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Historique de suivi</CardTitle>
            <CardDescription>{history.length} evenement{history.length > 1 ? "s" : ""} enregistre{history.length > 1 ? "s" : ""}</CardDescription>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Aucun evenement enregistre.</p>
            ) : (
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-px bg-border" />
                <div className="flex flex-col gap-6">
                  {[...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((event) => {
                    const Icon = eventIcons[event.type]
                    return (
                      <div key={event.id} className="group relative flex gap-4 pl-10">
                        <div className="absolute left-1.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-primary">
                          <Icon className="h-2.5 w-2.5 text-primary-foreground" />
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px]">{eventLabels[event.type]}</Badge>
                            <span className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</span>
                            {/* Edit/Delete buttons */}
                            <div className="ml-auto flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => openEdit(event)}>
                                <Pencil className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive" onClick={() => { setDeletingEvent(event); setDeleteOpen(true) }}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed text-foreground">{event.description}</p>
                          <span className="text-xs text-muted-foreground">Par {event.author}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={eventOpen} onOpenChange={setEventOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Ajouter un evenement</DialogTitle><DialogDescription>Enregistrez un nouvel evenement dans le suivi de {child.firstName}.</DialogDescription></DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Type</Label>
              <Select value={eventType} onValueChange={(v) => setEventType(v as ChildEvent["type"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {eventTypes.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2"><Label>Date</Label><Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} /></div>
            <div className="flex flex-col gap-2"><Label>Description *</Label><Textarea value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} placeholder="Decrivez l'evenement..." rows={3} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setEventOpen(false)}>Annuler</Button><Button onClick={addEvent}>Enregistrer</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Modifier l{"'"}evenement</DialogTitle><DialogDescription>Modifiez les details de cet evenement.</DialogDescription></DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Type</Label>
              <Select value={editType} onValueChange={(v) => setEditType(v as ChildEvent["type"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {eventTypes.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2"><Label>Date</Label><Input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} /></div>
            <div className="flex flex-col gap-2"><Label>Description *</Label><Textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} rows={3} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setEditOpen(false)}>Annuler</Button><Button onClick={saveEdit}>Sauvegarder</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Event Confirm */}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Supprimer l'evenement"
        description={`Supprimer cet evenement (${deletingEvent ? eventLabels[deletingEvent.type] : ""}) ? Cette action est irreversible.`}
        confirmLabel="Supprimer"
        onConfirm={confirmDeleteEvent}
      />
    </div>
  )
}
