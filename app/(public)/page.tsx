"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useEffect } from "react"
import {
  ArrowRight,
  Users,
  CalendarDays,
  Handshake,
  Building,
  Heart,
  GraduationCap,
  BookOpen,
  Briefcase,
  Home,
  Scale,
  ExternalLink,
  ImageIcon,
  Quote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"
import {
  mockPrograms,
  mockPartners,
  mockArticles,
  mockGallery,
  mockTestimonies,
} from "@/mocks/data"

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="h-6 w-6" />,
  GraduationCap: <GraduationCap className="h-6 w-6" />,
  BookOpen: <BookOpen className="h-6 w-6" />,
  Briefcase: <Briefcase className="h-6 w-6" />,
  Home: <Home className="h-6 w-6" />,
  Scale: <Scale className="h-6 w-6" />,
}

const stats = [
  { key: "home.stats.children", value: "2 847", icon: Users },
  { key: "home.stats.years", value: "35+", icon: CalendarDays },
  { key: "home.stats.programs", value: "6", icon: Handshake },
  { key: "home.stats.centers", value: "4", icon: Building },
]

function PartnersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let animationId: number
    let scrollPos = 0

    const step = () => {
      scrollPos += 0.5
      if (el.scrollWidth > 0 && scrollPos >= el.scrollWidth / 2) {
        scrollPos = 0
      }
      el.scrollLeft = scrollPos
      animationId = requestAnimationFrame(step)
    }
    animationId = requestAnimationFrame(step)

    const handleEnter = () => cancelAnimationFrame(animationId)
    const handleLeave = () => {
      animationId = requestAnimationFrame(step)
    }

    el.addEventListener("mouseenter", handleEnter)
    el.addEventListener("mouseleave", handleLeave)

    return () => {
      cancelAnimationFrame(animationId)
      el.removeEventListener("mouseenter", handleEnter)
      el.removeEventListener("mouseleave", handleLeave)
    }
  }, [])

  const doubled = [...mockPartners, ...mockPartners]

  return (
    <div
      ref={scrollRef}
      className="flex gap-6 overflow-hidden"
      style={{ scrollBehavior: "auto" }}
    >
      {doubled.map((partner, i) => (
        <a
          key={`${partner.id}-${i}`}
          href={partner.website && partner.website !== "#" ? partner.website : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-w-[200px] shrink-0 flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all hover:shadow-lg hover:border-primary/30"
          aria-label={partner.name}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
            <Handshake className="h-8 w-8 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground">
            {partner.name}
          </span>
          <span className="text-xs text-muted-foreground">{partner.country}</span>
          {partner.website && partner.website !== "#" && (
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </a>
      ))}
    </div>
  )
}

export default function HomePage() {
  const { t, locale } = useI18n()

  const recentArticles = mockArticles
    .filter((a) => a.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3)

  const recentGallery = mockGallery
    .filter((g) => g.type === "photo")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6)

  const recentStories = mockTestimonies
    .filter((s) => s.status === "published")
    .slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION with background image */}
      <section className="relative min-h-[600px] overflow-hidden lg:min-h-[700px]">
        <Image
          src="/images/hero-bg.jpg"
          alt="Enfants du PEDER a Bukavu"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
        <div className="relative flex min-h-[600px] items-center lg:min-h-[700px]">
          <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                {t("home.hero.title")}
              </h1>
              <p className="mt-3 text-lg font-medium text-white/80 italic">
                {t("home.hero.subtitle")}
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-white/70">
                {t("home.hero.description")}
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button size="lg" variant="secondary" asChild className="gap-2">
                  <Link href="/programs">
                    {t("home.hero.cta")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  asChild
                  className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                  variant="outline"
                >
                  <Link href="/donate">
                    <Heart className="h-4 w-4" />
                    {t("home.hero.donate")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="relative -mt-12 z-10 mx-auto w-full max-w-5xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.key} className="border-0 shadow-lg">
              <CardContent className="flex flex-col items-center gap-2 p-5 text-center">
                <stat.icon className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-foreground md:text-3xl">
                  {stat.value}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {t(stat.key)}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. MISSION SECTION */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("home.mission.title")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {t("home.mission.description")}
            </p>
            <p className="mt-2 text-sm font-medium text-primary">
              {t("home.zone")}
            </p>
          </div>
        </div>
      </section>

      {/* 4. PROGRAMS SECTION */}
      <section className="bg-muted/50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("home.programs.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("home.programs.subtitle")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockPrograms.map((program) => (
              <Card
                key={program.id}
                className="group transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {iconMap[program.icon]}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {locale === "en" && program.titleEn ? program.titleEn : program.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {locale === "en" && program.descriptionEn
                      ? program.descriptionEn
                      : program.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/programs">
                {t("common.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 5. RECENT NEWS SECTION */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("home.news.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("home.news.subtitle")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentArticles.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`}>
                <Card className="group h-full overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <div className="flex h-full items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="flex flex-col gap-3 p-5">
                    <time className="text-xs text-muted-foreground">
                      {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                      {locale === "en" && article.titleEn ? article.titleEn : article.title}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {locale === "en" && article.excerptEn ? article.excerptEn : article.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/news">
                {t("common.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 6. SUCCESS STORIES SECTION */}
      <section className="bg-muted/50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("home.stories.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("home.stories.subtitle")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {recentStories.map((story) => (
              <Card key={story.id} className="transition-all duration-200 hover:shadow-lg">
                <CardContent className="flex flex-col gap-4 p-6">
                  <Quote className="h-8 w-8 text-primary/30" />
                  <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground italic">
                    {locale === "en" && story.storyEn ? story.storyEn : story.story}
                  </p>
                  <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {story.name}{story.age ? `, ${story.age} ans` : ""}
                      </p>
                      <p className="text-xs text-muted-foreground">{story.program}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/stories">
                {t("common.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 7. GALLERY SECTION */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("home.gallery.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("home.gallery.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {recentGallery.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
              >
                <div className="flex h-full items-center justify-center">
                  <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-sm font-medium text-white">
                    {locale === "en" && item.titleEn ? item.titleEn : item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/gallery">
                {t("common.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 8. PARTNERS CAROUSEL SECTION */}
      <section className="bg-muted/50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("home.partners.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("home.partners.subtitle")}
            </p>
          </div>
          <PartnersCarousel />
          <div className="mt-10 text-center">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/partners">
                {t("common.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 9. CTA / DONATE SECTION */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            {t("home.cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-white/70">
            {t("home.cta.description")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="secondary" asChild className="gap-2">
              <Link href="/donate">
                <Heart className="h-4 w-4" />
                {t("home.hero.donate")}
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              variant="outline"
            >
              <Link href="/contact">
                {t("home.cta.button")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
