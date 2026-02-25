"use client"

import { useState } from "react"
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Handshake,
  Globe,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { mockPartners } from "@/mocks/data"
import type { Partner } from "@/lib/types"
import { toast } from "sonner"

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>(mockPartners)
  const [search, setSearch] = useState("")
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Partner | null>(null)
  const [isNew, setIsNew] = useState(false)

  const [formName, setFormName] = useState("")
  const [formCountry, setFormCountry] = useState("")
  const [formWebsite, setFormWebsite] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [formType, setFormType] = useState<Partner["type"]>("international")

  const filtered = partners.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase())
  )

  const international = partners.filter((p) => p.type === "international").length
  const local = partners.filter((p) => p.type === "local").length
  const countries = [...new Set(partners.map((p) => p.country))].length

  const openCreate = () => {
    setIsNew(true)
    setSelectedItem(null)
    setFormName("")
    setFormCountry("")
    setFormWebsite("")
    setFormDescription("")
    setFormType("international")
    setEditDialogOpen(true)
  }

  const openEdit = (item: Partner) => {
    setIsNew(false)
    setSelectedItem(item)
    setFormName(item.name)
    setFormCountry(item.country)
    setFormWebsite(item.website || "")
    setFormDescription(item.description)
    setFormType(item.type)
    setEditDialogOpen(true)
  }

  const openDelete = (item: Partner) => {
    setSelectedItem(item)
    setDeleteDialogOpen(true)
  }

  const handleSave = () => {
    if (isNew) {
      const newItem: Partner = {
        id: String(partners.length + 1),
        name: formName,
        logo: "/images/partner-new.png",
        country: formCountry,
        website: formWebsite || undefined,
        description: formDescription,
        type: formType,
      }
      setPartners([newItem, ...partners])
      toast.success("Partenaire ajoute", {
        description: `"${formName}" a ete ajoute aux partenaires.`,
      })
    } else if (selectedItem) {
      setPartners(
        partners.map((p) =>
          p.id === selectedItem.id
            ? {
              ...p,
              name: formName,
              country: formCountry,
              website: formWebsite || undefined,
              description: formDescription,
              type: formType,
            }
            : p
        )
      )
      toast.success("Partenaire modifie", {
        description: `"${formName}" a ete mis a jour.`,
      })
    }
    setEditDialogOpen(false)
  }

  const handleDelete = () => {
    if (selectedItem) {
      setPartners(partners.filter((p) => p.id !== selectedItem.id))
      toast.success("Partenaire supprime", {
        description: `"${selectedItem.name}" a ete retire des partenaires.`,
      })
    }
    setDeleteDialogOpen(false)
  }

  return (
    <>
      <div className="flex flex-col gap-6 p-4 lg:p-6">
        {/* Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total partenaires</CardTitle>
              <Handshake className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{partners.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Internationaux</CardTitle>
              <Globe className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{international}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Locaux</CardTitle>
              <Handshake className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{local}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pays representes</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{countries}</div></CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un partenaire..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 sm:w-80"
            />
          </div>
          <Button onClick={openCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Nouveau partenaire
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead className="hidden md:table-cell">Pays</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden lg:table-cell">Site web</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Handshake className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Aucun partenaire trouve
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <span className="text-sm font-medium">{item.name}</span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Globe className="h-3 w-3" />
                          {item.country}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={item.type === "international" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {item.type === "international" ? "International" : "Local"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {item.website && item.website !== "#" ? (
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Visiter
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(item)}
                            aria-label="Modifier"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDelete(item)}
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

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {isNew ? "Nouveau partenaire" : "Modifier le partenaire"}
              </DialogTitle>
              <DialogDescription>
                {isNew
                  ? "Ajoutez un nouveau partenaire du PEDER."
                  : "Modifiez les informations du partenaire."}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Nom</Label>
                <Input
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Nom du partenaire"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Pays</Label>
                  <Input
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                    placeholder="Pays"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Type</Label>
                  <Select value={formType} onValueChange={(v) => setFormType(v as Partner["type"])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="international">International</SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Site web</Label>
                <Input
                  value={formWebsite}
                  onChange={(e) => setFormWebsite(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Description du partenariat"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSave}>
                {isNew ? "Ajouter" : "Enregistrer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title="Supprimer le partenaire"
          description={`Etes-vous sur de vouloir supprimer "${selectedItem?.name}" ? Cette action est irreversible.`}
          confirmLabel="Supprimer"
          onConfirm={handleDelete}
        />
      </div>
    </>
  )
}
