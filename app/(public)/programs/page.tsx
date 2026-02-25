"use client"

import {
  Users,
  GraduationCap,
  BookOpen,
  Briefcase,
  Home,
  Scale,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"
import { mockPrograms } from "@/mocks/data"

const iconMap: Record<string, React.ElementType> = {
  Users,
  GraduationCap,
  BookOpen,
  Briefcase,
  Home,
  Scale,
}

export default function ProgramsPage() {
  const { t, locale } = useI18n()

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            {t("programs.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/70">
            {t("programs.subtitle")}
          </p>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-12">
            {mockPrograms.map((program, index) => {
              const Icon = iconMap[program.icon] || Users
              const isEven = index % 2 === 0

              return (
                <Card key={program.id} className="overflow-hidden border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                      {/* Color Block */}
                      <div className="flex items-center justify-center bg-primary/5 p-10 lg:w-1/3">
                        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10">
                          <Icon className="h-12 w-12 text-primary" />
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex flex-col gap-4 p-8 lg:w-2/3">
                        <h3 className="text-xl font-bold text-foreground md:text-2xl">
                          {locale === "en" && program.titleEn
                            ? program.titleEn
                            : program.title}
                        </h3>
                        <p className="leading-relaxed text-muted-foreground">
                          {locale === "en" && program.descriptionEn
                            ? program.descriptionEn
                            : program.description}
                        </p>
                        <div className="mt-2 grid gap-2 sm:grid-cols-2">
                          {program.activities.map((activity, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span className="text-sm text-foreground">
                                {locale === "en" && activity.labelEn
                                  ? activity.labelEn
                                  : activity.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
