"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Calendar,
  User,
  Newspaper,
  Eye,
  FileText,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { mockArticles } from "@/mocks/data"
import type { Article } from "@/lib/types"
import { toast } from "sonner"

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>(mockArticles)
  const [search, setSearch] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  )

  const published = articles.filter((a) => a.status === "published").length
  const drafts = articles.filter((a) => a.status === "draft").length
  const categories = [...new Set(articles.map((a) => a.category))].length

  const openDelete = (article: Article) => {
    setSelectedArticle(article)
    setDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (selectedArticle) {
      setArticles(articles.filter((a) => a.id !== selectedArticle.id))
      toast.success("Article supprime", {
        description: `L'article "${selectedArticle.title}" a ete supprime.`,
      })
    }
    setDeleteDialogOpen(false)
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total articles</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Publies</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{published}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Brouillons</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{drafts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories}</div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 sm:w-80"
          />
        </div>
        <Button asChild className="gap-2">
          <Link href="/admin/articles/create">
            <Plus className="h-4 w-4" />
            Nouvel article
          </Link>
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead className="hidden md:table-cell">Categorie</TableHead>
                <TableHead className="hidden md:table-cell">Auteur</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Newspaper className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Aucun article trouve
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="max-w-[200px]">
                      <span className="line-clamp-1 text-sm font-medium">
                        {article.title}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {article.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <User className="h-3 w-3" />
                        {article.author}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={article.status === "published" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {article.status === "published" ? "Publie" : "Brouillon"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" asChild aria-label="Voir">
                          <Link href={`/admin/articles/${article.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild aria-label="Modifier">
                          <Link href={`/admin/articles/${article.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDelete(article)}
                          aria-label="Supprimer"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Supprimer l'article"
        description={`Etes-vous sur de vouloir supprimer l'article "${selectedArticle?.title}" ? Cette action est irreversible.`}
        confirmLabel="Supprimer"
        onConfirm={handleDelete}
      />
    </div>
  )
}
