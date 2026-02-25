"use client"

import { useState } from "react"
import { FileText, Download, Calendar, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { mockReports } from "@/mocks/data"
import { toast } from "sonner"

const typeFilters = [
  { value: "all", labelFr: "Tout", labelEn: "All" },
  { value: "annual", labelFr: "Rapports annuels", labelEn: "Annual reports" },
  { value: "project", labelFr: "Rapports projets", labelEn: "Project reports" },
  { value: "research", labelFr: "Etudes", labelEn: "Studies" },
  { value: "book", labelFr: "Ouvrages", labelEn: "Books" },
  { value: "guide", labelFr: "Guides", labelEn: "Guides" },
]

export default function ReportsPage() {
  const { t, locale } = useI18n()
  const [filter, setFilter] = useState("all")

  const filtered =
    filter === "all"
      ? mockReports
      : mockReports.filter((r) => r.type === filter)

  const handleDownload = (title: string) => {
    toast.success(
      locale === "en"
        ? `Downloading: ${title}`
        : `Telechargement : ${title}`,
      { description: locale === "en" ? "The file will be available shortly." : "Le fichier sera disponible sous peu." }
    )
  }

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            {t("reports.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/70">
            {t("reports.subtitle")}
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4">
            {typeFilters.map((tf) => (
              <Button
                key={tf.value}
                variant={filter === tf.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(tf.value)}
              >
                {locale === "en" ? tf.labelEn : tf.labelFr}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Reports List */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">{t("common.noResults")}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map((report) => (
                <Card key={report.id} className="transition-all hover:shadow-md">
                  <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-foreground">
                          {locale === "en" && report.titleEn
                            ? report.titleEn
                            : report.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {locale === "en" && report.descriptionEn
                            ? report.descriptionEn
                            : report.description}
                        </p>
                        <div className="mt-1 flex items-center gap-3">
                          <Badge variant="secondary" className="text-xs">
                            {report.type}
                          </Badge>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {report.year}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 gap-1.5"
                      onClick={() =>
                        handleDownload(
                          locale === "en" && report.titleEn
                            ? report.titleEn
                            : report.title
                        )
                      }
                    >
                      <Download className="h-4 w-4" />
                      {t("reports.download")}
                    </Button>
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
