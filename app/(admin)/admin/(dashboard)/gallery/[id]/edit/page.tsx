"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dropzone } from "@/components/admin/dropzone"
import { mockGallery } from "@/mocks/data"
import { toast } from "sonner"

export default function EditGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const item = mockGallery.find((g) => g.id === id)

  const [title, setTitle] = useState(item?.title ?? "")
  const [description, setDescription] = useState(item?.description ?? "")
  const [type, setType] = useState(item?.type ?? "photo")
  const [category, setCategory] = useState(item?.category ?? "")
  const [videoUrl, setVideoUrl] = useState(item?.type === "video" ? item.url : "")
  const [saving, setSaving] = useState(false)

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <p className="text-muted-foreground">Element introuvable.</p>
        <Button asChild variant="outline"><Link href="/admin/gallery"><ArrowLeft className="mr-2 h-4 w-4" />Retour</Link></Button>
      </div>
    )
  }

  const handleSave = () => {
    if (!title.trim()) { toast.error("Le titre est requis"); return }
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast.success("Media modifie", { description: `"${title}" a ete mis a jour.` })
      router.push("/admin/gallery")
    }, 600)
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="gap-2"><Link href="/admin/gallery"><ArrowLeft className="h-4 w-4" />Retour</Link></Button>
        <Button onClick={handleSave} disabled={saving} className="gap-2"><Save className="h-4 w-4" />{saving ? "Enregistrement..." : "Enregistrer"}</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Modifier le media</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2"><Label>Titre *</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
              <div className="flex flex-col gap-2"><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} /></div>
              {type === "photo" ? (
                <div className="flex flex-col gap-2"><Label>Image</Label><Dropzone onFilesSelected={() => {}} accept="image/*" variant="image" currentFile={item.url} /></div>
              ) : (
                <div className="flex flex-col gap-2"><Label>URL video</Label><Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} /></div>
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader><CardTitle>Parametres</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2"><Label>Type</Label><Select value={type} onValueChange={setType}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="photo">Photo</SelectItem><SelectItem value="video">Video</SelectItem></SelectContent></Select></div>
              <div className="flex flex-col gap-2"><Label>Categorie</Label><Input value={category} onChange={(e) => setCategory(e.target.value)} /></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
