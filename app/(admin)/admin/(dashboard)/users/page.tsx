"use client"

import { useState } from "react"
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Users,
  Calendar,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { mockUsers } from "@/mocks/data"
import type { User, UserRole } from "@/lib/types"
import { toast } from "sonner"

const roleLabels: Record<UserRole, string> = {
  visitor: "Visiteur",
  redacteur: "Redacteur",
  admin: "Administrateur",
  superadmin: "Super Admin",
}

const roleColors: Record<UserRole, "default" | "secondary" | "destructive" | "outline"> = {
  visitor: "outline",
  redacteur: "secondary",
  admin: "default",
  superadmin: "default",
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [search, setSearch] = useState("")
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<User | null>(null)
  const [isNew, setIsNew] = useState(false)

  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formRole, setFormRole] = useState<UserRole>("redacteur")

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  const admins = users.filter((u) => u.role === "admin" || u.role === "superadmin").length
  const redacteurs = users.filter((u) => u.role === "redacteur").length

  const openCreate = () => {
    setIsNew(true)
    setSelectedItem(null)
    setFormName("")
    setFormEmail("")
    setFormRole("redacteur")
    setEditDialogOpen(true)
  }

  const openEdit = (item: User) => {
    setIsNew(false)
    setSelectedItem(item)
    setFormName(item.name)
    setFormEmail(item.email)
    setFormRole(item.role)
    setEditDialogOpen(true)
  }

  const openDelete = (item: User) => {
    setSelectedItem(item)
    setDeleteDialogOpen(true)
  }

  const handleSave = () => {
    if (isNew) {
      const newUser: User = {
        id: String(users.length + 1),
        name: formName,
        email: formEmail,
        role: formRole,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setUsers([newUser, ...users])
      toast.success("Utilisateur cree", {
        description: `"${formName}" a ete ajoute.`,
      })
    } else if (selectedItem) {
      setUsers(
        users.map((u) =>
          u.id === selectedItem.id
            ? { ...u, name: formName, email: formEmail, role: formRole }
            : u
        )
      )
      toast.success("Utilisateur modifie", {
        description: `"${formName}" a ete mis a jour.`,
      })
    }
    setEditDialogOpen(false)
  }

  const handleDelete = () => {
    if (selectedItem) {
      setUsers(users.filter((u) => u.id !== selectedItem.id))
      toast.success("Utilisateur supprime", {
        description: `"${selectedItem.name}" a ete supprime.`,
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Total utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{users.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Administrateurs</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{admins}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Redacteurs</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{redacteurs}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Actifs</CardTitle>
              <Calendar className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{users.length}</div></CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un utilisateur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 sm:w-80"
            />
          </div>
          <Button onClick={openCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvel utilisateur
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden lg:table-cell">Date de creation</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Aucun utilisateur trouve
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <span className="text-xs font-semibold">
                              {item.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </span>
                          </div>
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {item.email}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={roleColors[item.role]}
                          className="gap-1 text-xs"
                        >
                          <Shield className="h-3 w-3" />
                          {roleLabels[item.role]}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.createdAt).toLocaleDateString("fr-FR")}
                        </span>
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
                            disabled={item.role === "superadmin"}
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
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {isNew ? "Nouvel utilisateur" : "Modifier l'utilisateur"}
              </DialogTitle>
              <DialogDescription>
                {isNew
                  ? "Ajoutez un nouvel utilisateur au systeme."
                  : "Modifiez les informations de l'utilisateur."}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Nom complet</Label>
                <Input
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Nom complet"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="email@pederdrc.org"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Role</Label>
                <Select value={formRole} onValueChange={(v) => setFormRole(v as UserRole)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="redacteur">Redacteur</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="superadmin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSave}>
                {isNew ? "Creer" : "Enregistrer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title="Supprimer l'utilisateur"
          description={`Etes-vous sur de vouloir supprimer "${selectedItem?.name}" ? Cette action est irreversible.`}
          confirmLabel="Supprimer"
          onConfirm={handleDelete}
        />
      </div>
    </>
  )
}
