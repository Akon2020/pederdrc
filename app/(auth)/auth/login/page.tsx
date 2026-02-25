"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, LogIn, Eye, EyeOff, ArrowLeft, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"
import { toast } from "sonner"
import { useTheme } from "next-themes"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs")
      return
    }
    setLoading(true)

    const success = await login(email, password)

    if (success) {
      toast.success("Connexion reussie", {
        description: "Bienvenue dans l'espace d'administration.",
      })
      router.push("/admin")
    } else {
      toast.error("Erreur de connexion", {
        description: "Email ou mot de passe incorrect.",
      })
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      {/* Top actions */}
      <div className="fixed left-4 top-4 flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Accueil
          </Link>
        </Button>
      </div>
      <div className="fixed right-4 top-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>

      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col gap-6 p-8">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-lg">
              <Heart className="h-7 w-7 text-primary-foreground" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                PEDER Admin
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Connectez-vous a votre espace d{"'"}administration
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@pederdrc.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Mot de passe oublie ?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" disabled={loading} className="mt-2 gap-2">
              <LogIn className="h-4 w-4" />
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="mb-2 text-xs font-semibold text-foreground">
              Identifiants de demonstration :
            </p>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Super Admin :</span>{" "}
                admin@pederdrc.org / admin123
              </p>
              <p>
                <span className="font-medium text-foreground">Admin :</span>{" "}
                akonkwa.ushindi@pederdrc.org / admin123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
