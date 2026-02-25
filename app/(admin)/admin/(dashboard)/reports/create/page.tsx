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

export default function CreateReportPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [type, setType] = useState("annual")
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [description, setDescription] = useState("")
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    if (!title.trim()) { toast.error("Le titre est requis"); return }
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast.success("Rapport ajoute", { description: `"${title}" a ete ajoute.` })
      router.push("/admin/reports")
    }, 600)
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="gap-2"><Link href="/admin/reports"><ArrowLeft className="h-4 w-4" />Retour aux rapports</Link></Button>
        <Button onClick={handleSave} disabled={saving} className="gap-2"><Save className="h-4 w-4" />{saving ? "Enregistrement..." : "Enregistrer"}</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Nouveau rapport</CardTitle><CardDescription>Uploadez un fichier PDF et renseignez les informations.</CardDescription></CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2"><Label>Titre *</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre du rapport" /></div>
              <div className="flex flex-col gap-2"><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description du rapport..." rows={4} /></div>
              <div className="flex flex-col gap-2"><Label>Fichier PDF</Label><Dropzone onFilesSelected={() => {}} accept=".pdf,application/pdf" variant="document" label="Glissez votre fichier PDF ici" description="PDF uniquement (max 50MB)" maxSize={50} /></div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader><CardTitle>Parametres</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2"><Label>Type</Label><Select value={type} onValueChange={setType}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="annual">Rapport annuel</SelectItem><SelectItem value="project">Rapport de projet</SelectItem><SelectItem value="research">Recherche</SelectItem><SelectItem value="guide">Guide</SelectItem><SelectItem value="book">Ouvrage</SelectItem></SelectContent></Select></div>
              <div className="flex flex-col gap-2"><Label>Annee</Label><Input value={year} onChange={(e) => setYear(e.target.value)} placeholder="2025" /></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
