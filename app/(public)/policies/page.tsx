"use client"

import { Shield, FileText, Lock, Users, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"

const policies = [
  {
    titleFr: "Politique de protection de l'enfance",
    titleEn: "Child Protection Policy",
    descriptionFr: "Cadre de reference pour la protection des enfants dans toutes les activites du PEDER, incluant les procedures de signalement et les mesures de prevention.",
    descriptionEn: "Framework for child protection in all PEDER activities, including reporting procedures and prevention measures.",
    icon: Shield,
  },
  {
    titleFr: "Politique de confidentialite",
    titleEn: "Privacy Policy",
    descriptionFr: "Regles de gestion des donnees personnelles des beneficiaires, du personnel et des partenaires du PEDER.",
    descriptionEn: "Rules for managing personal data of PEDER beneficiaries, staff and partners.",
    icon: Lock,
  },
  {
    titleFr: "Code de conduite du personnel",
    titleEn: "Staff Code of Conduct",
    descriptionFr: "Normes de comportement et d'ethique applicables a tous les membres du personnel et aux benevoles du PEDER.",
    descriptionEn: "Standards of behavior and ethics applicable to all PEDER staff and volunteers.",
    icon: Users,
  },
  {
    titleFr: "Procedures de gestion des plaintes",
    titleEn: "Complaints Management Procedures",
    descriptionFr: "Mecanisme de reception, de traitement et de suivi des plaintes et retours des beneficiaires et parties prenantes.",
    descriptionEn: "Mechanism for receiving, processing and following up on complaints and feedback from beneficiaries and stakeholders.",
    icon: FileText,
  },
  {
    titleFr: "Politique de genre et d'inclusion",
    titleEn: "Gender and Inclusion Policy",
    descriptionFr: "Engagement du PEDER pour l'egalite des genres et l'inclusion des groupes vulnerables dans tous ses programmes.",
    descriptionEn: "PEDER's commitment to gender equality and inclusion of vulnerable groups in all its programs.",
    icon: Users,
  },
  {
    titleFr: "Manuel de procedures operationnelles",
    titleEn: "Operational Procedures Manual",
    descriptionFr: "Guide detaille des procedures operationnelles standard du PEDER pour la mise en oeuvre de ses programmes.",
    descriptionEn: "Detailed guide to PEDER standard operating procedures for program implementation.",
    icon: BookOpen,
  },
]

export default function PoliciesPage() {
  const { t, locale } = useI18n()

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            {t("policies.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/70">
            {t("policies.subtitle")}
          </p>
        </div>
      </section>

      {/* Policies */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {policies.map((policy) => (
              <Card
                key={policy.titleFr}
                className="group transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <policy.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {locale === "en" ? policy.titleEn : policy.titleFr}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {locale === "en" ? policy.descriptionEn : policy.descriptionFr}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
