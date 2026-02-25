"use client"

import { Heart, Eye, Target, Shield, Users, Handshake, Scale } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"

const values = [
  { key: "about.values.dignity", icon: Heart, color: "bg-red-500/10 text-red-600 dark:text-red-400" },
  { key: "about.values.solidarity", icon: Users, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { key: "about.values.justice", icon: Scale, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  { key: "about.values.charity", icon: Handshake, color: "bg-green-500/10 text-green-600 dark:text-green-400" },
]

export default function AboutPage() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            {t("about.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/70">
            {t("about.creation")}
          </p>
        </div>
      </section>

      {/* Presentation */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {t("about.presentation.title")}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t("about.presentation.text")}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t("about.creation")}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardContent className="flex flex-col gap-4 p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <Eye className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t("about.vision.title")}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {t("about.vision.text")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="flex flex-col gap-4 p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/30">
                  <Target className="h-7 w-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t("about.mission.title")}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {t("about.mission.text")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {t("about.values.title")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.key} className="group text-center transition-all hover:shadow-lg hover:-translate-y-0.5">
                <CardContent className="flex flex-col items-center gap-4 p-8">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-full ${value.color}`}>
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(value.key)}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-primary-foreground md:text-3xl">
            Notre parcours
          </h2>
          <div className="mx-auto max-w-2xl">
            {[
              { year: "1989", text: "Creation du PEDER par la Congregation Missionnaire des Soeurs de Sainte Gemma" },
              { year: "1995", text: "Ouverture du premier centre d'accueil a Ibanda, Bukavu" },
              { year: "2002", text: "Extension des activites avec l'ouverture des centres de Kadutu et Bagira" },
              { year: "2010", text: "Lancement du programme de formation professionnelle" },
              { year: "2015", text: "Partenariat avec UNICEF pour la protection de l'enfance" },
              { year: "2020", text: "Creation du Centre de Transit, d'Ecoute et d'Orientation" },
              { year: "2024", text: "Plus de 2 800 enfants encadres depuis la creation" },
            ].map((item, i) => (
              <div key={item.year} className="flex gap-6 pb-8">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <span className="text-xs font-bold">{item.year}</span>
                  </div>
                  {i < 6 && <div className="mt-2 h-full w-px bg-primary-foreground/20" />}
                </div>
                <div className="pb-2 pt-2">
                  <p className="text-sm leading-relaxed text-primary-foreground/80">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
