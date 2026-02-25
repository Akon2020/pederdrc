"use client"

import { use, useState } from "react"
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
import { mockArticles } from "@/mocks/data"
import { toast } from "sonner"

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const article = mockArticles.find((a) => a.id === id)

  const [title, setTitle] = useState(article?.title ?? "")
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "")
  const [content, setContent] = useState(article?.content ?? "")
  const [category, setCategory] = useState(article?.category ?? "activites")
  const [status, setStatus] = useState(article?.status ?? "draft")
  const [saving, setSaving] = useState(false)

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <p className="text-muted-foreground">Article introuvable.</p>
        <Button asChild variant="outline">
          <Link href="/admin/articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux articles
          </Link>
        </Button>
      </div>
    )
  }

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Le titre est requis")
      return
    }
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast.success("Article modifie avec succes", {
        description: `L'article "${title}" a ete mis a jour.`,
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
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Modifier l&apos;article</CardTitle>
              <CardDescription>Mettez a jour le contenu de votre article.</CardDescription>
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
                  placeholder="Bref resume..."
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Contenu</Label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Contenu complet de l'article..."
                  minHeight="350px"
                />
              </div>
            </CardContent>
          </Card>
        </div>

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
                label="Changer l'image"
                currentFile={article.image}
                maxSize={5}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
