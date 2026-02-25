"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { Dropzone } from "@/components/admin/dropzone"
import { toast } from "sonner"

export default function CreateArticlePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("activites")
  const [status, setStatus] = useState("draft")
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Le titre est requis")
      return
    }
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast.success("Article cree avec succes", {
        description: `L'article "${title}" a ete cree.`,
      })
      router.push("/admin/articles")
    }, 600)
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/admin/articles">
            <ArrowLeft className="h-4 w-4" />
            Retour aux articles
          </Link>
        </Button>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" />
          {saving ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contenu de l&apos;article</CardTitle>
              <CardDescription>Redigez le contenu de votre article avec l&apos;editeur.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Titre *</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titre de l'article"
                  className="text-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Extrait</Label>
                <Textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Bref resume affiche dans les listes..."
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Contenu</Label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Redigez le contenu complet de l'article..."
                  minHeight="350px"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Publication</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Categorie</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activites">Activites</SelectItem>
                    <SelectItem value="sensibilisation">Sensibilisation</SelectItem>
                    <SelectItem value="celebration">Celebration</SelectItem>
                    <SelectItem value="portes-ouvertes">Portes ouvertes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Statut</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">Publie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Image de couverture</CardTitle>
            </CardHeader>
            <CardContent>
              <Dropzone
                onFilesSelected={() => {}}
                accept="image/*"
                variant="image"
                label="Glissez une image ici"
                description="JPG, PNG ou WebP (max 5MB)"
                maxSize={5}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
