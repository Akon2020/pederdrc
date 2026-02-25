"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Heart,
  CreditCard,
  Smartphone,
  Building2,
  Copy,
  Check,
  ArrowRight,
  Users,
  GraduationCap,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useI18n } from "@/lib/i18n"
import { toast } from "sonner"

const presetAmounts = [10, 25, 50, 100, 250, 500]

const impacts = [
  {
    amount: "$25",
    descFr: "Nourrit un enfant pendant un mois",
    descEn: "Feeds a child for one month",
    icon: Users,
  },
  {
    amount: "$50",
    descFr: "Fournitures scolaires pour un enfant",
    descEn: "School supplies for one child",
    icon: GraduationCap,
  },
  {
    amount: "$100",
    descFr: "Un mois d'hebergement pour un enfant",
    descEn: "One month of housing for a child",
    icon: Home,
  },
]

const bankDetails = {
  bankName: "Rawbank",
  accountName: "PEDER ASBL",
  accountNumber: "050-0100023456-78",
  swiftCode: "RAWBCDKI",
}

export default function DonatePage() {
  const { t, locale } = useI18n()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50)
  const [customAmount, setCustomAmount] = useState("")
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success(locale === "en" ? "Copied to clipboard" : "Copie dans le presse-papiers")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDonate = () => {
    const amount = customAmount || selectedAmount
    toast.success(
      locale === "en" ? "Thank you for your generosity!" : "Merci pour votre generosite !",
      {
        description:
          locale === "en"
            ? `Your donation of $${amount} will help transform children's lives.`
            : `Votre don de $${amount} contribuera a transformer la vie des enfants.`,
      }
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white">
            <Heart className="h-4 w-4" />
            <span>{locale === "en" ? "Change a life today" : "Changez une vie aujourd'hui"}</span>
          </div>
          <h1 className="text-balance text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {locale === "en" ? "Make a Donation" : "Faire un don"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-white/70">
            {locale === "en"
              ? "Your generosity directly impacts the lives of street children in Bukavu. Every contribution matters."
              : "Votre generosite impacte directement la vie des enfants de la rue a Bukavu. Chaque contribution compte."}
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section className="relative -mt-8 z-10 mx-auto w-full max-w-4xl px-4 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {impacts.map((impact) => (
            <Card key={impact.amount} className="border-0 shadow-lg">
              <CardContent className="flex flex-col items-center gap-2 p-5 text-center">
                <impact.icon className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">{impact.amount}</span>
                <span className="text-sm text-muted-foreground">
                  {locale === "en" ? impact.descEn : impact.descFr}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Online Donation Form */}
            <Card>
              <CardContent className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {locale === "en" ? "Online Donation" : "Don en ligne"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {locale === "en" ? "Quick and secure" : "Rapide et securise"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Label>{locale === "en" ? "Select an amount (USD)" : "Choisir un montant (USD)"}</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {presetAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount && !customAmount ? "default" : "outline"}
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount("")
                        }}
                        className="text-sm"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="custom">
                      {locale === "en" ? "Or enter a custom amount" : "Ou entrez un montant personnalise"}
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input
                        id="custom"
                        type="number"
                        min="1"
                        placeholder="0.00"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value)
                          setSelectedAmount(null)
                        }}
                        className="pl-7"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleDonate} className="gap-2" size="lg">
                  <Heart className="h-4 w-4" />
                  {locale === "en" ? "Donate Now" : "Faire un don maintenant"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  {locale === "en"
                    ? "This is a demo. In production, this would connect to a payment processor."
                    : "Ceci est une demo. En production, cela serait connecte a un processeur de paiement."}
                </p>
              </CardContent>
            </Card>

            {/* Other Ways to Donate */}
            <div className="flex flex-col gap-6">
              {/* Mobile Money */}
              <Card>
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Mobile Money</h3>
                      <p className="text-sm text-muted-foreground">M-Pesa / Airtel Money</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">M-Pesa</p>
                        <p className="font-mono text-sm font-semibold text-foreground">+243 992 355 009</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy("+243992355009")}
                        aria-label="Copy number"
                      >
                        {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bank Transfer */}
              <Card>
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {locale === "en" ? "Bank Transfer" : "Virement bancaire"}
                      </h3>
                      <p className="text-sm text-muted-foreground">{bankDetails.bankName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 rounded-lg bg-muted/50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {locale === "en" ? "Account Name" : "Nom du compte"}
                        </p>
                        <p className="text-sm font-semibold text-foreground">{bankDetails.accountName}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {locale === "en" ? "Account Number" : "Numero de compte"}
                        </p>
                        <p className="font-mono text-sm font-semibold text-foreground">
                          {bankDetails.accountNumber}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy(bankDetails.accountNumber)}
                        aria-label="Copy account number"
                      >
                        {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">SWIFT</p>
                      <p className="font-mono text-sm font-semibold text-foreground">{bankDetails.swiftCode}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact for more */}
          <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6 text-center">
            <p className="text-muted-foreground">
              {locale === "en"
                ? "For other forms of support (in-kind donations, volunteering, partnerships), please"
                : "Pour d'autres formes de soutien (dons en nature, benevolat, partenariats), veuillez"}
            </p>
            <Button variant="link" asChild className="gap-1 mt-1">
              <Link href="/contact">
                {locale === "en" ? "contact us" : "nous contacter"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
