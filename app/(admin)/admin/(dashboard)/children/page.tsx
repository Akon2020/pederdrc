"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search, Plus, Eye, Pencil, Trash2, Users, UserCheck,
  GraduationCap, LogOut as LogOutIcon, Calendar, Baby, Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { mockChildren } from "@/mocks/data"
import type { ChildRecord } from "@/lib/types"
import { generateChildrenListPDF } from "@/lib/generate-child-pdf"
import { toast } from "sonner"

const statusConfig: Record<ChildRecord["status"], { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Actif", variant: "default" },
  reinserted: { label: "Reinsere", variant: "secondary" },
  in_training: { label: "En formation", variant: "outline" },
  left: { label: "Sorti", variant: "destructive" },
}

export default function AdminChildrenPage() {
  const [children, setChildren] = useState<ChildRecord[]>(mockChildren)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selected, setSelected] = useState<ChildRecord | null>(null)

  const filtered = children.filter((c) => {
    const matchSearch = `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      c.program.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || c.status === statusFilter
    return matchSearch && matchStatus
  })

  const active = children.filter((c) => c.status === "active").length
  const reinserted = children.filter((c) => c.status === "reinserted").length
  const inTraining = children.filter((c) => c.status === "in_training").length
  const boys = children.filter((c) => c.gender === "M").length
  const girls = children.filter((c) => c.gender === "F").length

  const handleDelete = () => {
    if (selected) {
      setChildren(children.filter((c) => c.id !== selected.id))
      toast.success("Enfant supprime", { description: `${selected.firstName} ${selected.lastName} a ete retire du systeme.` })
    }
    setDeleteOpen(false)
    setSelected(null)
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total enfants</CardTitle>
            <Baby className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{children.length}</div>
            <p className="text-xs text-muted-foreground">{boys} garcons, {girls} filles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Actifs</CardTitle>
            <Users className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{active}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">En formation</CardTitle>
            <GraduationCap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{inTraining}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reinseres</CardTitle>
            <UserCheck className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{reinserted}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taux reinsertion</CardTitle>
            <LogOutIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{children.length > 0 ? Math.round((reinserted / children.length) * 100) : 0}%</div></CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher un enfant..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 sm:w-72" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Statut" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="in_training">En formation</SelectItem>
              <SelectItem value="reinserted">Reinsere</SelectItem>
              <SelectItem value="left">Sorti</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => { try { generateChildrenListPDF(filtered); toast.success("PDF telecharge") } catch { toast.error("Erreur lors de l'export") } }}>
            <Download className="h-4 w-4" />Exporter PDF
          </Button>
          <Button asChild className="gap-2"><Link href="/admin/children/create"><Plus className="h-4 w-4" />Ajouter un enfant</Link></Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Enfant</TableHead>
                <TableHead className="hidden md:table-cell">Programme</TableHead>
                <TableHead className="hidden lg:table-cell">Centre</TableHead>
                <TableHead className="hidden lg:table-cell">Inscription</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="py-10 text-center"><div className="flex flex-col items-center gap-2"><Baby className="h-8 w-8 text-muted-foreground" /><span className="text-sm text-muted-foreground">Aucun enfant trouve</span></div></TableCell></TableRow>
              ) : filtered.map((child) => (
                <TableRow key={child.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {child.photo ? (
                        <img src={child.photo} alt={`${child.firstName} ${child.lastName}`} className="h-9 w-9 rounded-full object-cover" />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {child.firstName[0]}{child.lastName[0]}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{child.firstName} {child.lastName}</span>
                        <span className="text-xs text-muted-foreground">{child.gender === "M" ? "Garcon" : "Fille"}, {child.age} ans</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell"><Badge variant="outline" className="text-xs">{child.program}</Badge></TableCell>
                  <TableCell className="hidden lg:table-cell"><span className="text-sm text-muted-foreground">{child.center}</span></TableCell>
                  <TableCell className="hidden lg:table-cell"><span className="flex items-center gap-1 text-sm text-muted-foreground"><Calendar className="h-3 w-3" />{new Date(child.enrollmentDate).toLocaleDateString("fr-FR")}</span></TableCell>
                  <TableCell><Badge variant={statusConfig[child.status].variant} className="text-xs">{statusConfig[child.status].label}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild><Link href={`/admin/children/${child.id}`}><Eye className="h-4 w-4" /></Link></Button>
                      <Button variant="ghost" size="icon" asChild><Link href={`/admin/children/${child.id}/edit`}><Pencil className="h-4 w-4" /></Link></Button>
                      <Button variant="ghost" size="icon" onClick={() => { setSelected(child); setDeleteOpen(true) }} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ConfirmDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Supprimer l'enfant" description={`Supprimer ${selected?.firstName} ${selected?.lastName} du systeme ?`} confirmLabel="Supprimer" onConfirm={handleDelete} />
    </div>
  )
}
