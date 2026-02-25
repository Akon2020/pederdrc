"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, User, ArrowRight, Newspaper } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { mockArticles } from "@/mocks/data"

const categories = [
  { value: "all", label: "Tout", labelEn: "All" },
  { value: "activites", label: "Activites", labelEn: "Activities" },
  { value: "sensibilisation", label: "Sensibilisation", labelEn: "Awareness" },
  { value: "celebration", label: "Celebrations", labelEn: "Celebrations" },
  { value: "portes-ouvertes", label: "Portes ouvertes", labelEn: "Open doors" },
]

export default function NewsPage() {
  const { t, locale } = useI18n()
  const [activeCategory, setActiveCategory] = useState("all")

  const filtered =
    activeCategory === "all"
      ? mockArticles.filter((a) => a.status === "published")
      : mockArticles.filter(
          (a) => a.status === "published" && a.category === activeCategory
        )

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            {t("news.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/70">
            {t("news.subtitle")}
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={activeCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.value)}
              >
                {locale === "en" ? cat.labelEn : cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <Newspaper className="h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">{t("common.noResults")}</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => (
                <Card
                  key={article.id}
                  className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className="flex h-48 items-center justify-center bg-primary/5">
                    <Newspaper className="h-12 w-12 text-primary/40" />
                  </div>
                  <CardContent className="flex flex-col gap-3 p-6">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                    </div>
                    <h3 className="line-clamp-2 text-base font-semibold leading-tight text-foreground">
                      {locale === "en" && article.titleEn
                        ? article.titleEn
                        : article.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {locale === "en" && article.excerptEn
                        ? article.excerptEn
                        : article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.publishedAt).toLocaleDateString(
                          locale === "en" ? "en-US" : "fr-FR"
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {article.author}
                      </span>
                    </div>
                    <Link
                      href={`/news/${article.slug}`}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
                    >
                      {t("news.readMore")}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
