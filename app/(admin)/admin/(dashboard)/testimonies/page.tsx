"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  MessageSquareQuote,
  Calendar,
  Eye,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { mockTestimonies } from "@/mocks/data"
import type { Testimony } from "@/lib/types"
import { toast } from "sonner"

export default function AdminTestimoniesPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>(mockTestimonies)
  const [search, setSearch] = useState("")
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Testimony | null>(null)
  const [isNew, setIsNew] = useState(false)

  const [formName, setFormName] = useState("")
  const [formAge, setFormAge] = useState("")
  const [formStory, setFormStory] = useState("")
  const [formProgram, setFormProgram] = useState("")
  const [formYear, setFormYear] = useState("")
  const [formStatus, setFormStatus] = useState<Testimony["status"]>("draft")

  const filtered = testimonies.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) || t.program.toLowerCase().includes(search.toLowerCase())
  )
  const published = testimonies.filter((t) => t.status === "published").length
  const drafts = testimonies.filter((t) => t.status === "draft").length
  const programs = [...new Set(testimonies.map((t) => t.program))].length

  const openCreate = () => {
    setIsNew(true); setSelectedItem(null); setFormName(""); setFormAge(""); setFormStory(""); setFormProgram(""); setFormYear(new Date().getFullYear().toString()); setFormStatus("draft"); setEditDialogOpen(true)
  }
  const openEdit = (item: Testimony) => {
    setIsNew(false); setSelectedItem(item); setFormName(item.name); setFormAge(item.age?.toString() || ""); setFormStory(item.story); setFormProgram(item.program); setFormYear(item.year); setFormStatus(item.status); setEditDialogOpen(true)
  }

  const handleSave = () => {
    if (isNew) {
      const newItem: Testimony = { id: String(testimonies.length + 1), name: formName, age: formAge ? parseInt(formAge) : undefined, story: formStory, program: formProgram, year: formYear, status: formStatus }
      setTestimonies([newItem, ...testimonies])
      toast.success("Temoignage cree", { description: `Le temoignage de "${formName}" a ete cree.` })
    } else if (selectedItem) {
      setTestimonies(testimonies.map((t) => t.id === selectedItem.id ? { ...t, name: formName, age: formAge ? parseInt(formAge) : undefined, story: formStory, program: formProgram, year: formYear, status: formStatus } : t))
      toast.success("Temoignage modifie", { description: `Le temoignage de "${formName}" a ete mis a jour.` })
    }
    setEditDialogOpen(false)
  }

  const handleDelete = () => {
    if (selectedItem) {
      setTestimonies(testimonies.filter((t) => t.id !== selectedItem.id))
      toast.success("Temoignage supprime", { description: `Le temoignage de "${selectedItem.name}" a ete supprime.` })
    }
    setDeleteDialogOpen(false)
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle><MessageSquareQuote className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{testimonies.length}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Publies</CardTitle><CheckCircle className="h-4 w-4 text-emerald-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{published}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Brouillons</CardTitle><Clock className="h-4 w-4 text-amber-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{drafts}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Programmes</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{programs}</div></CardContent></Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 sm:w-80" /></div>
        <Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" />Nouveau temoignage</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Nom</TableHead><TableHead className="hidden md:table-cell">Programme</TableHead><TableHead className="hidden md:table-cell">Annee</TableHead><TableHead>Statut</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="py-10 text-center"><div className="flex flex-col items-center gap-2"><MessageSquareQuote className="h-8 w-8 text-muted-foreground" /><span className="text-sm text-muted-foreground">Aucun temoignage trouve</span></div></TableCell></TableRow>
              ) : filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell><div className="flex flex-col"><span className="text-sm font-medium">{item.name}</span>{item.age && <span className="text-xs text-muted-foreground">{item.age} ans</span>}</div></TableCell>
                  <TableCell className="hidden md:table-cell"><span className="text-sm text-muted-foreground">{item.program}</span></TableCell>
                  <TableCell className="hidden md:table-cell"><span className="flex items-center gap-1.5 text-sm text-muted-foreground"><Calendar className="h-3 w-3" />{item.year}</span></TableCell>
                  <TableCell><Badge variant={item.status === "published" ? "default" : "secondary"} className="text-xs">{item.status === "published" ? "Publie" : "Brouillon"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild><Link href={`/admin/testimonies/${item.id}`}><Eye className="h-4 w-4" /></Link></Button>
                      <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => { setSelectedItem(item); setDeleteDialogOpen(true) }} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{isNew ? "Nouveau temoignage" : "Modifier le temoignage"}</DialogTitle><DialogDescription>{isNew ? "Ajoutez un nouveau temoignage." : "Modifiez les informations."}</DialogDescription></DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2"><Label>Nom</Label><Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Prenom N." /></div>
              <div className="flex flex-col gap-2"><Label>Age</Label><Input type="number" value={formAge} onChange={(e) => setFormAge(e.target.value)} /></div>
            </div>
            <div className="flex flex-col gap-2"><Label>Temoignage</Label><Textarea value={formStory} onChange={(e) => setFormStory(e.target.value)} rows={4} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2"><Label>Programme</Label><Select value={formProgram} onValueChange={setFormProgram}><SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger><SelectContent><SelectItem value="Integration sociale">Integration sociale</SelectItem><SelectItem value="Formation professionnelle">Formation professionnelle</SelectItem><SelectItem value="Orientation scolaire">Orientation scolaire</SelectItem><SelectItem value="Insertion professionnelle">Insertion professionnelle</SelectItem><SelectItem value="Soutien aux familles">Soutien aux familles</SelectItem></SelectContent></Select></div>
              <div className="flex flex-col gap-2"><Label>Annee</Label><Input value={formYear} onChange={(e) => setFormYear(e.target.value)} /></div>
            </div>
            <div className="flex flex-col gap-2"><Label>Statut</Label><Select value={formStatus} onValueChange={(v) => setFormStatus(v as Testimony["status"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="draft">Brouillon</SelectItem><SelectItem value="published">Publie</SelectItem></SelectContent></Select></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setEditDialogOpen(false)}>Annuler</Button><Button onClick={handleSave}>{isNew ? "Creer" : "Enregistrer"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} title="Supprimer le temoignage" description={`Supprimer le temoignage de "${selectedItem?.name}" ?`} confirmLabel="Supprimer" onConfirm={handleDelete} />
    </div>
  )
}
