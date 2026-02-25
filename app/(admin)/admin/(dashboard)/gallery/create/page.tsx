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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dropzone } from "@/components/admin/dropzone"
import { toast } from "sonner"

export default function CreateGalleryPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("photo")
  const [category, setCategory] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    if (!title.trim()) { toast.error("Le titre est requis"); return }
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast.success("Media ajoute avec succes", { description: `"${title}" a ete ajoute a la galerie.` })
      router.push("/admin/gallery")
    }, 600)
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="gap-2"><Link href="/admin/gallery"><ArrowLeft className="h-4 w-4" />Retour a la galerie</Link></Button>
        <Button onClick={handleSave} disabled={saving} className="gap-2"><Save className="h-4 w-4" />{saving ? "Enregistrement..." : "Enregistrer"}</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Ajouter un media</CardTitle>
              <CardDescription>Uploadez une photo ou ajoutez une video a la galerie.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Titre *</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre du media" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description du media..." rows={3} />
              </div>
              {type === "photo" ? (
                <div className="flex flex-col gap-2">
                  <Label>Image</Label>
                  <Dropzone onFilesSelected={() => {}} accept="image/*" variant="image" label="Glissez vos photos ici" description="JPG, PNG ou WebP (max 10MB)" multiple />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Label>URL de la video</Label>
                  <Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader><CardTitle>Parametres</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photo">Photo</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Categorie</Label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Ex: activites, formation" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
