"use client"

import { useState } from "react"
import {
  Search, Plus, Pencil, Trash2, Tag, Newspaper, ImageIcon, FileText, FolderOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { mockCategories } from "@/mocks/data"
import type { Category } from "@/lib/types"
import { toast } from "sonner"

const typeConfig: Record<Category["type"], { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  article: { label: "Article", icon: Newspaper, color: "text-primary" },
  gallery: { label: "Galerie", icon: ImageIcon, color: "text-emerald-500" },
  report: { label: "Rapport", icon: FileText, color: "text-amber-500" },
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [selected, setSelected] = useState<Category | null>(null)

  const [formName, setFormName] = useState("")
  const [formSlug, setFormSlug] = useState("")
  const [formDesc, setFormDesc] = useState("")
  const [formType, setFormType] = useState<Category["type"]>("article")

  const filtered = categories.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.slug.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === "all" || c.type === typeFilter
    return matchSearch && matchType
  })

  const articleCats = categories.filter((c) => c.type === "article").length
  const galleryCats = categories.filter((c) => c.type === "gallery").length
  const reportCats = categories.filter((c) => c.type === "report").length

  const openCreate = () => {
    setEditing(null)
    setFormName(""); setFormSlug(""); setFormDesc(""); setFormType("article")
    setFormOpen(true)
  }

  const openEdit = (cat: Category) => {
    setEditing(cat)
    setFormName(cat.name); setFormSlug(cat.slug); setFormDesc(cat.description || ""); setFormType(cat.type)
    setFormOpen(true)
  }

  const handleNameChange = (name: string) => {
    setFormName(name)
    if (!editing) {
      setFormSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))
    }
  }

  const handleSave = () => {
    if (!formName.trim()) { toast.error("Nom de la categorie requis"); return }
    if (!formSlug.trim()) { toast.error("Slug requis"); return }

    if (editing) {
      setCategories(categories.map((c) => c.id === editing.id ? { ...c, name: formName, slug: formSlug, description: formDesc, type: formType } : c))
      toast.success("Categorie modifiee", { description: `"${formName}" a ete mise a jour.` })
    } else {
      const newCat: Category = {
        id: String(categories.length + 1), name: formName, slug: formSlug,
        description: formDesc, type: formType, count: 0, createdAt: new Date().toISOString().split("T")[0],
      }
      setCategories([newCat, ...categories])
      toast.success("Categorie creee", { description: `"${formName}" a ete ajoutee.` })
    }
    setFormOpen(false)
  }

  const handleDelete = () => {
    if (selected) {
      setCategories(categories.filter((c) => c.id !== selected.id))
      toast.success("Categorie supprimee", { description: `"${selected.name}" a ete supprimee.` })
    }
    setDeleteOpen(false); setSelected(null)
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total categories</CardTitle><Tag className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{categories.length}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Articles</CardTitle><Newspaper className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">{articleCats}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Galerie</CardTitle><ImageIcon className="h-4 w-4 text-emerald-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{galleryCats}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Rapports</CardTitle><FileText className="h-4 w-4 text-amber-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{reportCats}</div></CardContent></Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 sm:w-72" /></div>
          <Select value={typeFilter} onValueChange={setTypeFilter}><SelectTrigger className="w-36"><SelectValue placeholder="Type" /></SelectTrigger><SelectContent><SelectItem value="all">Tous les types</SelectItem><SelectItem value="article">Articles</SelectItem><SelectItem value="gallery">Galerie</SelectItem><SelectItem value="report">Rapports</SelectItem></SelectContent></Select>
        </div>
        <Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" />Nouvelle categorie</Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Nom</TableHead><TableHead>Slug</TableHead><TableHead>Type</TableHead><TableHead className="hidden md:table-cell">Description</TableHead><TableHead className="text-center">Elements</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="py-10 text-center"><div className="flex flex-col items-center gap-2"><FolderOpen className="h-8 w-8 text-muted-foreground" /><span className="text-sm text-muted-foreground">Aucune categorie trouvee</span></div></TableCell></TableRow>
              ) : filtered.map((cat) => {
                const TypeIcon = typeConfig[cat.type].icon
                return (
                  <TableRow key={cat.id}>
                    <TableCell><span className="text-sm font-medium">{cat.name}</span></TableCell>
                    <TableCell><code className="rounded bg-muted px-1.5 py-0.5 text-xs">{cat.slug}</code></TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1 text-xs">
                        <TypeIcon className={`h-3 w-3 ${typeConfig[cat.type].color}`} />
                        {typeConfig[cat.type].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell"><span className="line-clamp-1 text-sm text-muted-foreground">{cat.description || "—"}</span></TableCell>
                    <TableCell className="text-center"><Badge variant="secondary" className="text-xs">{cat.count}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(cat)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => { setSelected(cat); setDeleteOpen(true) }} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editing ? "Modifier la categorie" : "Nouvelle categorie"}</DialogTitle><DialogDescription>{editing ? `Modification de "${editing.name}"` : "Creez une nouvelle categorie pour organiser votre contenu."}</DialogDescription></DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2"><Label>Nom *</Label><Input value={formName} onChange={(e) => handleNameChange(e.target.value)} placeholder="Nom de la categorie" /></div>
            <div className="flex flex-col gap-2"><Label>Slug</Label><Input value={formSlug} onChange={(e) => setFormSlug(e.target.value)} placeholder="slug-de-la-categorie" /></div>
            <div className="flex flex-col gap-2"><Label>Type</Label><Select value={formType} onValueChange={(v) => setFormType(v as Category["type"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="article">Article</SelectItem><SelectItem value="gallery">Galerie</SelectItem><SelectItem value="report">Rapport</SelectItem></SelectContent></Select></div>
            <div className="flex flex-col gap-2"><Label>Description</Label><Textarea value={formDesc} onChange={(e) => setFormDesc(e.target.value)} placeholder="Description optionnelle..." rows={2} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setFormOpen(false)}>Annuler</Button><Button onClick={handleSave}>{editing ? "Enregistrer" : "Creer"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Supprimer la categorie" description={`Supprimer la categorie "${selected?.name}" ? Les elements associes ne seront pas supprimes.`} confirmLabel="Supprimer" onConfirm={handleDelete} />
    </div>
  )
}
