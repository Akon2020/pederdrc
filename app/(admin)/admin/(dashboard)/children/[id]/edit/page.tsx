"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Baby } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockChildren } from "@/mocks/data"
import type { ChildRecord } from "@/lib/types"
import { toast } from "sonner"

export default function EditChildPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const child = mockChildren.find((c) => c.id === id)

  const [firstName, setFirstName] = useState(child?.firstName ?? "")
  const [lastName, setLastName] = useState(child?.lastName ?? "")
  const [gender, setGender] = useState(child?.gender ?? "M")
  const [birthDate, setBirthDate] = useState(child?.birthDate ?? "")
  const [program, setProgram] = useState(child?.program ?? "")
  const [center, setCenter] = useState(child?.center ?? "")
  const [status, setStatus] = useState<ChildRecord["status"]>(child?.status ?? "active")
  const [parentContact, setParentContact] = useState(child?.parentContact ?? "")
  const [notes, setNotes] = useState(child?.notes ?? "")

  if (!child) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10">
        <Baby className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">Enfant non trouve.</p>
        <Button asChild variant="outline"><Link href="/admin/children"><ArrowLeft className="mr-2 h-4 w-4" />Retour</Link></Button>
      </div>
    )
  }

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) { toast.error("Prenom et nom requis"); return }
    toast.success("Enfant modifie", { description: `Les informations de ${firstName} ${lastName} ont ete mises a jour.` })
    router.push(`/admin/children/${id}`)
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild className="gap-2"><Link href={`/admin/children/${id}`}><ArrowLeft className="h-4 w-4" />Retour au profil</Link></Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Modifier : {child.firstName} {child.lastName}</CardTitle>
          <CardDescription>Mettez a jour les informations de cet enfant.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2"><Label>Prenom *</Label><Input value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
            <div className="flex flex-col gap-2"><Label>Nom *</Label><Input value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
            <div className="flex flex-col gap-2"><Label>Genre</Label><Select value={gender} onValueChange={setGender}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="M">Garcon</SelectItem><SelectItem value="F">Fille</SelectItem></SelectContent></Select></div>
            <div className="flex flex-col gap-2"><Label>Date de naissance</Label><Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} /></div>
            <div className="flex flex-col gap-2"><Label>Programme</Label><Select value={program} onValueChange={setProgram}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Integration sociale">Integration sociale</SelectItem><SelectItem value="Formation professionnelle">Formation professionnelle</SelectItem><SelectItem value="Orientation scolaire">Orientation scolaire</SelectItem><SelectItem value="Insertion professionnelle">Insertion professionnelle</SelectItem><SelectItem value="Sante et protection">Sante et protection</SelectItem><SelectItem value="Plaidoyer">Plaidoyer et droits</SelectItem></SelectContent></Select></div>
            <div className="flex flex-col gap-2"><Label>Centre</Label><Select value={center} onValueChange={setCenter}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Centre Tumaini">Centre Tumaini</SelectItem><SelectItem value="Centre Mapendo">Centre Mapendo</SelectItem><SelectItem value="Centre de Transit">Centre de Transit</SelectItem><SelectItem value="Centre de Formation">Centre de Formation</SelectItem></SelectContent></Select></div>
            <div className="flex flex-col gap-2"><Label>Statut</Label><Select value={status} onValueChange={(v) => setStatus(v as ChildRecord["status"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">Actif</SelectItem><SelectItem value="in_training">En formation</SelectItem><SelectItem value="reinserted">Reinsere</SelectItem><SelectItem value="left">Sorti</SelectItem></SelectContent></Select></div>
            <div className="flex flex-col gap-2"><Label>Contact parent/tuteur</Label><Input value={parentContact} onChange={(e) => setParentContact(e.target.value)} placeholder="+243..." /></div>
          </div>
          <div className="flex flex-col gap-2"><Label>Notes</Label><Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} /></div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" asChild><Link href={`/admin/children/${id}`}>Annuler</Link></Button>
            <Button onClick={handleSave} className="gap-2"><Save className="h-4 w-4" />Enregistrer</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
