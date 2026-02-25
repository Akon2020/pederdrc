"use client"

import { ExternalLink, Handshake, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { mockPartners } from "@/mocks/data"

export default function PartnersPage() {
  const { t, locale } = useI18n()

  const international = mockPartners.filter((p) => p.type === "international")

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            {t("partners.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/70">
            {t("partners.subtitle")}
          </p>
        </div>
      </section>

      {/* International Partners */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-8 text-center text-xl font-bold text-foreground">
            {t("partners.international")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {international.map((partner) => (
              <Card
                key={partner.id}
                className="group transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <Handshake className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {partner.name}
                  </h3>
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <Globe className="h-3 w-3" />
                    {partner.country}
                  </Badge>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {locale === "en" && partner.descriptionEn
                      ? partner.descriptionEn
                      : partner.description}
                  </p>
                  {partner.website && partner.website !== "#" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="mt-auto gap-1.5"
                    >
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {locale === "en" ? "Visit website" : "Visiter le site"}
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
