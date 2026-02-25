"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  ImageIcon,
  Video,
  Calendar,
  Eye,
  Film,
  Camera,
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
import { mockGallery } from "@/mocks/data"
import type { GalleryItem } from "@/lib/types"
import { toast } from "sonner"

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(mockGallery)
  const [search, setSearch] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const filtered = items.filter(
    (i) =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  )

  const photos = items.filter((i) => i.type === "photo").length
  const videos = items.filter((i) => i.type === "video").length
  const categories = [...new Set(items.map((i) => i.category))].length

  const handleDelete = () => {
    if (selectedItem) {
      setItems(items.filter((i) => i.id !== selectedItem.id))
      toast.success("Element supprime", {
        description: `"${selectedItem.title}" a ete retire de la galerie.`,
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Total medias</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{items.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Photos</CardTitle>
            <Camera className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{photos}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Videos</CardTitle>
            <Film className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{videos}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{categories}</div></CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 sm:w-80" />
        </div>
        <Button asChild className="gap-2">
          <Link href="/admin/gallery/create"><Plus className="h-4 w-4" />Ajouter un media</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Apercu</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">Categorie</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Aucun element trouve</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="h-12 w-16 overflow-hidden rounded-md bg-muted">
                        {item.type === "photo" ? (
                          <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" crossOrigin="anonymous" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Video className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell><span className="line-clamp-1 text-sm font-medium">{item.title}</span></TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="gap-1 text-xs">
                        {item.type === "photo" ? <Camera className="h-3 w-3" /> : <Film className="h-3 w-3" />}
                        {item.type === "photo" ? "Photo" : "Video"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm capitalize text-muted-foreground">{item.category}</span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" asChild><Link href={`/admin/gallery/${item.id}`}><Eye className="h-4 w-4" /></Link></Button>
                        <Button variant="ghost" size="icon" asChild><Link href={`/admin/gallery/${item.id}/edit`}><Pencil className="h-4 w-4" /></Link></Button>
                        <Button variant="ghost" size="icon" onClick={() => { setSelectedItem(item); setDeleteDialogOpen(true) }} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ConfirmDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} title="Supprimer le media" description={`Supprimer "${selectedItem?.title}" de la galerie ?`} confirmLabel="Supprimer" onConfirm={handleDelete} />
    </div>
  )
}
