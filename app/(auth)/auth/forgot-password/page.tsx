"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, ArrowLeft, Mail, Sun, Moon, KeyRound, Check, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { useTheme } from "next-themes"

type Step = "email" | "code" | "reset" | "success"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error("Veuillez entrer votre adresse email")
      return
    }
    setLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500))
    toast.success("Code envoye", {
      description: `Un code de verification a ete envoye a ${email}`,
    })
    setLoading(false)
    setStep("code")
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code || code.length < 6) {
      toast.error("Veuillez entrer un code valide a 6 chiffres")
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    // Mock: accept any 6-digit code
    if (code.length === 6) {
      toast.success("Code verifie")
      setStep("reset")
    } else {
      toast.error("Code invalide")
    }
    setLoading(false)
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPassword || newPassword.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caracteres")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas")
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    toast.success("Mot de passe reinitialise avec succes")
    setLoading(false)
    setStep("success")
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
          </div>

          {/* STEP 1: Email */}
          {step === "email" && (
            <>
              <div className="text-center">
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  Mot de passe oublie
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Entrez votre adresse email pour recevoir un code de verification.
                </p>
              </div>
              <form onSubmit={handleSendCode} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Adresse email</Label>
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
                <Button type="submit" disabled={loading} className="gap-2">
                  <Mail className="h-4 w-4" />
                  {loading ? "Envoi en cours..." : "Envoyer le code"}
                </Button>
              </form>
              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Retour a la connexion
                </Link>
              </div>
            </>
          )}

          {/* STEP 2: Verify Code */}
          {step === "code" && (
            <>
              <div className="text-center">
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  Verification du code
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Entrez le code a 6 chiffres envoye a{" "}
                  <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>
              <form onSubmit={handleVerifyCode} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="code">Code de verification</Label>
                  <Input
                    id="code"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    required
                    className="text-center text-lg font-mono tracking-widest"
                  />
                </div>
                <Button type="submit" disabled={loading} className="gap-2">
                  <KeyRound className="h-4 w-4" />
                  {loading ? "Verification..." : "Verifier le code"}
                </Button>
              </form>
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    toast.info("Code renvoye", {
                      description: `Un nouveau code a ete envoye a ${email}`,
                    })
                  }}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Renvoyer le code
                </button>
                <button
                  onClick={() => setStep("email")}
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Changer d{"'"}adresse email
                </button>
              </div>
            </>
          )}

          {/* STEP 3: Reset Password */}
          {step === "reset" && (
            <>
              <div className="text-center">
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  Nouveau mot de passe
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choisissez un nouveau mot de passe pour votre compte.
                </p>
              </div>
              <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimum 6 caracteres"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Retapez le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                {newPassword && confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-destructive">
                    Les mots de passe ne correspondent pas
                  </p>
                )}
                <Button type="submit" disabled={loading} className="gap-2">
                  <KeyRound className="h-4 w-4" />
                  {loading ? "Reinitialisation..." : "Reinitialiser le mot de passe"}
                </Button>
              </form>
            </>
          )}

          {/* STEP 4: Success */}
          {step === "success" && (
            <>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  Mot de passe reinitialise !
                </h1>
                <p className="text-sm text-muted-foreground">
                  Votre mot de passe a ete reinitialise avec succes. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
                </p>
                <Button asChild className="mt-2 gap-2 w-full">
                  <Link href="/auth/login">
                    Se connecter
                  </Link>
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
