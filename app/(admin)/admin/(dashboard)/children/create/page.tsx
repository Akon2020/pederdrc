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
import { toast } from "sonner"

export default function CreateChildPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState("M")
  const [birthDate, setBirthDate] = useState("")
  const [program, setProgram] = useState("")
  const [center, setCenter] = useState("")
  const [parentContact, setParentContact] = useState("")
  const [notes, setNotes] = useState("")

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) { toast.error("Prenom et nom requis"); return }
    if (!program) { toast.error("Programme requis"); return }
    toast.success("Enfant ajoute", { description: `${firstName} ${lastName} a ete enregistre.` })
    router.push("/admin/children")
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild className="gap-2"><Link href="/admin/children"><ArrowLeft className="h-4 w-4" />Retour</Link></Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ajouter un enfant</CardTitle>
          <CardDescription>Enregistrez un nouvel enfant dans le systeme de suivi.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2"><Label>Prenom *</Label><Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prenom de l'enfant" /></div>
            <div className="flex flex-col gap-2"><Label>Nom *</Label><Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom de famille" /></div>
            <div className="flex flex-col gap-2">
              <Label>Genre</Label>
              <Select value={gender} onValueChange={setGender}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="M">Garcon</SelectItem><SelectItem value="F">Fille</SelectItem></SelectContent></Select>
            </div>
            <div className="flex flex-col gap-2"><Label>Date de naissance</Label><Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} /></div>
            <div className="flex flex-col gap-2">
              <Label>Programme *</Label>
              <Select value={program} onValueChange={setProgram}><SelectTrigger><SelectValue placeholder="Choisir un programme" /></SelectTrigger><SelectContent><SelectItem value="Integration sociale">Integration sociale</SelectItem><SelectItem value="Formation professionnelle">Formation professionnelle</SelectItem><SelectItem value="Orientation scolaire">Orientation scolaire</SelectItem><SelectItem value="Insertion professionnelle">Insertion professionnelle</SelectItem><SelectItem value="Sante et protection">Sante et protection</SelectItem><SelectItem value="Plaidoyer">Plaidoyer et droits</SelectItem></SelectContent></Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Centre</Label>
              <Select value={center} onValueChange={setCenter}><SelectTrigger><SelectValue placeholder="Choisir un centre" /></SelectTrigger><SelectContent><SelectItem value="Centre Tumaini">Centre Tumaini</SelectItem><SelectItem value="Centre Mapendo">Centre Mapendo</SelectItem><SelectItem value="Centre de Transit">Centre de Transit</SelectItem><SelectItem value="Centre de Formation">Centre de Formation</SelectItem></SelectContent></Select>
            </div>
            <div className="flex flex-col gap-2"><Label>Contact parent/tuteur</Label><Input value={parentContact} onChange={(e) => setParentContact(e.target.value)} placeholder="+243..." /></div>
          </div>
          <div className="flex flex-col gap-2"><Label>Notes</Label><Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Observations, remarques..." rows={4} /></div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" asChild><Link href="/admin/children">Annuler</Link></Button>
            <Button onClick={handleSave} className="gap-2"><Save className="h-4 w-4" />Enregistrer</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
