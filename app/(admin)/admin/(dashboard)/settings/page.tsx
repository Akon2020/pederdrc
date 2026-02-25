"use client"

import { useState, useRef } from "react"
import {
  Save, User, Lock, Settings, Mail, Phone, MapPin, Plus, X,
  Facebook, Twitter, Instagram, Youtube, Camera,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth"
import { mockSiteSettings } from "@/mocks/data"
import { toast } from "sonner"

export default function AdminSettingsPage() {
  const { user } = useAuth()

  // Profile tab
  const [profileName, setProfileName] = useState(user?.name ?? "")
  const [profileEmail, setProfileEmail] = useState(user?.email ?? "")
  const [profilePhone, setProfilePhone] = useState("")
  const [profileBio, setProfileBio] = useState("")
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  // Password tab
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Site settings tab
  const [contactEmails, setContactEmails] = useState<string[]>(mockSiteSettings.contactEmails)
  const [contactPhones, setContactPhones] = useState<string[]>(mockSiteSettings.contactPhones)
  const [address, setAddress] = useState(mockSiteSettings.address)
  const [facebook, setFacebook] = useState(mockSiteSettings.socialLinks.facebook || "")
  const [twitter, setTwitter] = useState(mockSiteSettings.socialLinks.twitter || "")
  const [instagram, setInstagram] = useState(mockSiteSettings.socialLinks.instagram || "")
  const [youtube, setYoutube] = useState(mockSiteSettings.socialLinks.youtube || "")

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) { toast.error("L'image ne doit pas depasser 2 Mo"); return }
      const reader = new FileReader()
      reader.onload = (ev) => {
        setAvatarPreview(ev.target?.result as string)
        toast.success("Photo mise a jour", { description: "N'oubliez pas d'enregistrer votre profil." })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    toast.success("Profil mis a jour", { description: "Vos informations ont ete enregistrees." })
  }

  const handleChangePassword = () => {
    if (!oldPassword) { toast.error("Ancien mot de passe requis"); return }
    if (newPassword.length < 6) { toast.error("Le nouveau mot de passe doit contenir au moins 6 caracteres"); return }
    if (newPassword !== confirmPassword) { toast.error("Les mots de passe ne correspondent pas"); return }
    toast.success("Mot de passe modifie", { description: "Votre mot de passe a ete mis a jour." })
    setOldPassword(""); setNewPassword(""); setConfirmPassword("")
  }

  const handleSaveSettings = () => {
    toast.success("Parametres enregistres", { description: "Les parametres du site ont ete mis a jour." })
  }

  const addEmail = () => setContactEmails([...contactEmails, ""])
  const removeEmail = (i: number) => setContactEmails(contactEmails.filter((_, idx) => idx !== i))
  const updateEmail = (i: number, val: string) => setContactEmails(contactEmails.map((e, idx) => idx === i ? val : e))

  const addPhone = () => setContactPhones([...contactPhones, ""])
  const removePhone = (i: number) => setContactPhones(contactPhones.filter((_, idx) => idx !== i))
  const updatePhone = (i: number, val: string) => setContactPhones(contactPhones.map((p, idx) => idx === i ? val : p))

  const initials = profileName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Parametres</h2>
        <p className="text-sm text-muted-foreground">Gerez votre profil et les parametres du site.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="profile" className="gap-2"><User className="h-4 w-4" />Profil</TabsTrigger>
          <TabsTrigger value="password" className="gap-2"><Lock className="h-4 w-4" />Mot de passe</TabsTrigger>
          <TabsTrigger value="site" className="gap-2"><Settings className="h-4 w-4" />Site</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><User className="h-4 w-4 text-primary" />Informations du profil</CardTitle>
              <CardDescription>Mettez a jour vos informations personnelles et votre photo.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              {/* Avatar upload section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Photo de profil"
                      className="h-20 w-20 rounded-full object-cover border-2 border-border"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                      {initials}
                    </div>
                  )}
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                    aria-label="Changer la photo"
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-base font-semibold text-foreground">{profileName}</span>
                  <span className="text-sm capitalize text-muted-foreground">{user?.role}</span>
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    className="mt-1 text-xs font-medium text-primary hover:underline"
                  >
                    Changer la photo de profil
                  </button>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2"><Label>Nom complet</Label><Input value={profileName} onChange={(e) => setProfileName(e.target.value)} /></div>
                <div className="flex flex-col gap-2"><Label>Email</Label><Input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} /></div>
                <div className="flex flex-col gap-2"><Label>Telephone</Label><Input value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} placeholder="+243..." /></div>
              </div>
              <div className="flex flex-col gap-2"><Label>Bio</Label><Textarea value={profileBio} onChange={(e) => setProfileBio(e.target.value)} placeholder="Parlez de vous..." rows={3} /></div>
              <div className="flex justify-end"><Button onClick={handleSaveProfile} className="gap-2"><Save className="h-4 w-4" />Enregistrer le profil</Button></div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Tab - full width */}
        <TabsContent value="password" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><Lock className="h-4 w-4 text-primary" />Changer le mot de passe</CardTitle>
              <CardDescription>Pour votre securite, utilisez un mot de passe fort et unique.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <Label>Ancien mot de passe</Label>
                  <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Votre mot de passe actuel" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Nouveau mot de passe</Label>
                  <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Minimum 6 caracteres" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Confirmer le nouveau mot de passe</Label>
                  <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Retapez le nouveau mot de passe" />
                </div>
              </div>
              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <p className="mt-3 text-sm text-destructive">Les mots de passe ne correspondent pas.</p>
              )}
              {newPassword && newPassword.length > 0 && newPassword.length < 6 && (
                <p className="mt-3 text-sm text-amber-600">Le mot de passe doit contenir au moins 6 caracteres.</p>
              )}
              <div className="mt-6 flex justify-end">
                <Button onClick={handleChangePassword} className="gap-2"><Save className="h-4 w-4" />Modifier le mot de passe</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Site Tab */}
        <TabsContent value="site" className="mt-6">
          <div className="flex flex-col gap-6">
            {/* Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><Mail className="h-4 w-4 text-primary" />Coordonnees</CardTitle>
                <CardDescription>Gerez les emails, telephones et adresse du site.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-1.5"><Mail className="h-3 w-3" />Adresses email</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addEmail} className="gap-1"><Plus className="h-3 w-3" />Ajouter</Button>
                  </div>
                  {contactEmails.map((email, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input type="email" value={email} onChange={(e) => updateEmail(i, e.target.value)} placeholder="email@exemple.com" />
                      {contactEmails.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeEmail(i)} className="shrink-0 text-destructive hover:text-destructive"><X className="h-4 w-4" /></Button>
                      )}
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-1.5"><Phone className="h-3 w-3" />Numeros de telephone</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addPhone} className="gap-1"><Plus className="h-3 w-3" />Ajouter</Button>
                  </div>
                  {contactPhones.map((phone, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input value={phone} onChange={(e) => updatePhone(i, e.target.value)} placeholder="+243..." />
                      {contactPhones.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removePhone(i)} className="shrink-0 text-destructive hover:text-destructive"><X className="h-4 w-4" /></Button>
                      )}
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex flex-col gap-2">
                  <Label className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />Adresse</Label>
                  <Textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2} />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><Settings className="h-4 w-4 text-primary" />Reseaux sociaux</CardTitle>
                <CardDescription>Liens vers les profils reseaux sociaux du PEDER.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2"><Label className="flex items-center gap-1.5"><Facebook className="h-3 w-3" />Facebook</Label><Input value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="https://facebook.com/..." /></div>
                  <div className="flex flex-col gap-2"><Label className="flex items-center gap-1.5"><Twitter className="h-3 w-3" />Twitter / X</Label><Input value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="https://twitter.com/..." /></div>
                  <div className="flex flex-col gap-2"><Label className="flex items-center gap-1.5"><Instagram className="h-3 w-3" />Instagram</Label><Input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="https://instagram.com/..." /></div>
                  <div className="flex flex-col gap-2"><Label className="flex items-center gap-1.5"><Youtube className="h-3 w-3" />YouTube</Label><Input value={youtube} onChange={(e) => setYoutube(e.target.value)} placeholder="https://youtube.com/..." /></div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end"><Button onClick={handleSaveSettings} className="gap-2"><Save className="h-4 w-4" />Enregistrer les parametres</Button></div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
