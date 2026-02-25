"use client"

import { use } from "react"
import Link from "next/link"
import { Calendar, User, ArrowLeft, Newspaper } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { mockArticles } from "@/mocks/data"

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { t, locale } = useI18n()
  const article = mockArticles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32">
        <Newspaper className="h-16 w-16 text-muted-foreground" />
        <p className="text-lg text-muted-foreground">Article introuvable</p>
        <Button variant="outline" asChild>
          <Link href="/news">{t("common.back")}</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-6 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link href="/news" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("common.back")}
            </Link>
          </Button>
          <div className="mx-auto max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              {article.category}
            </Badge>
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-primary-foreground md:text-4xl">
              {locale === "en" && article.titleEn
                ? article.titleEn
                : article.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-primary-foreground/60">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(article.publishedAt).toLocaleDateString(
                  locale === "en" ? "en-US" : "fr-FR",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {article.author}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
            <p>
              {locale === "en" && article.contentEn
                ? article.contentEn
                : article.content}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
