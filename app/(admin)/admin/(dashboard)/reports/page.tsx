"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus, Pencil, Trash2, Search, FileText, Calendar, Download, Eye,
  BookOpen, FlaskConical, FolderOpen, CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { mockReports } from "@/mocks/data"
import type { Report } from "@/lib/types"
import { toast } from "sonner"

const typeLabels: Record<Report["type"], string> = {
  annual: "Rapport annuel", project: "Rapport de projet", research: "Recherche", guide: "Guide", book: "Ouvrage",
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [search, setSearch] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Report | null>(null)

  const filtered = reports.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()) || r.year.includes(search))
  const annuals = reports.filter((r) => r.type === "annual").length
  const projects = reports.filter((r) => r.type === "project").length
  const research = reports.filter((r) => r.type === "research" || r.type === "guide" || r.type === "book").length

  const handleDelete = () => {
    if (selectedItem) {
      setReports(reports.filter((r) => r.id !== selectedItem.id))
      toast.success("Rapport supprime", { description: `"${selectedItem.title}" a ete supprime.` })
    }
    setDeleteDialogOpen(false)
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total rapports</CardTitle><FileText className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{reports.length}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Rapports annuels</CardTitle><FolderOpen className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">{annuals}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Projets</CardTitle><BookOpen className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">{projects}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Autres</CardTitle><FlaskConical className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{research}</div></CardContent></Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 sm:w-80" /></div>
        <Button asChild className="gap-2"><Link href="/admin/reports/create"><Plus className="h-4 w-4" />Nouveau rapport</Link></Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Titre</TableHead><TableHead>Type</TableHead><TableHead className="hidden md:table-cell">Annee</TableHead><TableHead className="hidden lg:table-cell">Date</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="py-10 text-center"><div className="flex flex-col items-center gap-2"><FileText className="h-8 w-8 text-muted-foreground" /><span className="text-sm text-muted-foreground">Aucun rapport trouve</span></div></TableCell></TableRow>
              ) : filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell><span className="line-clamp-1 text-sm font-medium">{item.title}</span></TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{typeLabels[item.type]}</Badge></TableCell>
                  <TableCell className="hidden md:table-cell"><span className="text-sm text-muted-foreground">{item.year}</span></TableCell>
                  <TableCell className="hidden lg:table-cell"><span className="flex items-center gap-1.5 text-sm text-muted-foreground"><Calendar className="h-3 w-3" />{new Date(item.publishedAt).toLocaleDateString("fr-FR")}</span></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild><Link href={`/admin/reports/${item.id}`}><Eye className="h-4 w-4" /></Link></Button>
                      <Button variant="ghost" size="icon" asChild><Link href={`/admin/reports/${item.id}/edit`}><Pencil className="h-4 w-4" /></Link></Button>
                      <Button variant="ghost" size="sm" className="gap-1 text-xs"><Download className="h-3 w-3" />PDF</Button>
                      <Button variant="ghost" size="icon" onClick={() => { setSelectedItem(item); setDeleteDialogOpen(true) }} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ConfirmDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} title="Supprimer le rapport" description={`Supprimer "${selectedItem?.title}" ?`} confirmLabel="Supprimer" onConfirm={handleDelete} />
    </div>
  )
}
