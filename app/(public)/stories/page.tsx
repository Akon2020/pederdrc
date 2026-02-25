"use client"

import { Quote, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"
import { mockTestimonies } from "@/mocks/data"

export default function StoriesPage() {
  const { t, locale } = useI18n()
  const published = mockTestimonies.filter((t) => t.status === "published")

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            {t("stories.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/70">
            {t("stories.subtitle")}
          </p>
        </div>
      </section>

      {/* Stories */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {published.map((testimony) => (
              <Card
                key={testimony.id}
                className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <CardContent className="flex flex-col gap-4 p-6">
                  <Quote className="h-8 w-8 text-primary/30" />
                  <p className="text-sm leading-relaxed text-muted-foreground italic">
                    {locale === "en" && testimony.storyEn
                      ? testimony.storyEn
                      : testimony.story}
                  </p>
                  <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {testimony.name}
                        {testimony.age && (
                          <span className="font-normal text-muted-foreground">
                            , {testimony.age} ans
                          </span>
                        )}
                      </p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {testimony.program}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
