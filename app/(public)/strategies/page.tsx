"use client"

import { MapPin, Users, Megaphone, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"
import { mockCenters } from "@/mocks/data"

export default function StrategiesPage() {
  const { t, locale } = useI18n()

  const communityActivities = [
    { key: "strategies.community.street", icon: Users },
    { key: "strategies.community.animation", icon: Megaphone },
    { key: "strategies.community.support", icon: Shield },
  ]

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            {t("strategies.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/70">
            {t("strategies.subtitle")}
          </p>
        </div>
      </section>

      {/* Centers */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-foreground">
            {t("strategies.centers.title")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {mockCenters.map((center) => (
              <Card key={center.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="flex h-48 items-center justify-center bg-primary/5">
                  <div className="flex flex-col items-center gap-2">
                    <MapPin className="h-10 w-10 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {center.location}
                    </span>
                  </div>
                </div>
                <CardContent className="flex flex-col gap-2 p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {locale === "en" && center.nameEn
                      ? center.nameEn
                      : center.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {locale === "en" && center.descriptionEn
                      ? center.descriptionEn
                      : center.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Intervention */}
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-foreground">
            {t("strategies.community.title")}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {communityActivities.map((activity) => (
              <Card key={activity.key} className="text-center transition-all hover:shadow-lg hover:-translate-y-0.5">
                <CardContent className="flex flex-col items-center gap-4 p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <activity.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {t(activity.key)}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
