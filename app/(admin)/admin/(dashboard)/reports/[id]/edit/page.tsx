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
import { mockReports } from "@/mocks/data"
import { toast } from "sonner"

export default function EditReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const item = mockReports.find((r) => r.id === id)
  const [title, setTitle] = useState(item?.title ?? "")
  const [type, setType] = useState(item?.type ?? "annual")
  const [year, setYear] = useState(item?.year ?? "")
  const [description, setDescription] = useState(item?.description ?? "")
  const [saving, setSaving] = useState(false)

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <p className="text-muted-foreground">Rapport introuvable.</p>
        <Button asChild variant="outline"><Link href="/admin/reports"><ArrowLeft className="mr-2 h-4 w-4" />Retour</Link></Button>
      </div>
    )
  }

  const handleSave = () => {
    if (!title.trim()) { toast.error("Le titre est requis"); return }
    setSaving(true)
    setTimeout(() => { setSaving(false); toast.success("Rapport modifie"); router.push("/admin/reports") }, 600)
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="gap-2"><Link href="/admin/reports"><ArrowLeft className="h-4 w-4" />Retour</Link></Button>
        <Button onClick={handleSave} disabled={saving} className="gap-2"><Save className="h-4 w-4" />{saving ? "Enregistrement..." : "Enregistrer"}</Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Modifier le rapport</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2"><Label>Titre *</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
              <div className="flex flex-col gap-2"><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} /></div>
              <div className="flex flex-col gap-2"><Label>Fichier PDF</Label><Dropzone onFilesSelected={() => {}} accept=".pdf,application/pdf" variant="document" label="Remplacer le fichier" maxSize={50} /></div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader><CardTitle>Parametres</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2"><Label>Type</Label><Select value={type} onValueChange={setType}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="annual">Rapport annuel</SelectItem><SelectItem value="project">Rapport de projet</SelectItem><SelectItem value="research">Recherche</SelectItem><SelectItem value="guide">Guide</SelectItem><SelectItem value="book">Ouvrage</SelectItem></SelectContent></Select></div>
              <div className="flex flex-col gap-2"><Label>Annee</Label><Input value={year} onChange={(e) => setYear(e.target.value)} /></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
