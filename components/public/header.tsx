"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Heart, LogIn, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const primaryNav = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "nav.programs", href: "/programs" },
  { key: "nav.news", href: "/news" },
  { key: "nav.contact", href: "/contact" },
]

const moreNav = [
  { key: "nav.strategies", href: "/strategies" },
  { key: "nav.gallery", href: "/gallery" },
  { key: "nav.stories", href: "/stories" },
  { key: "nav.partners", href: "/partners" },
  { key: "nav.reports", href: "/reports" },
]

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t } = useI18n()

  useEffect(() => { setMounted(true) }, [])

  const allNav = [...primaryNav, ...moreNav]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight tracking-tight text-foreground">
              PEDER
            </span>
            <span className="hidden text-[10px] leading-tight text-muted-foreground sm:block">
              Bukavu, RDC
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          role="navigation"
          aria-label="Main navigation"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {t(item.key)}
            </Link>
          ))}

          {/* "Plus" dropdown for secondary nav items - rendered client-only to avoid Radix id hydration mismatch */}
          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-accent-foreground">
                  Plus
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                {moreNav.map((item) => (
                  <DropdownMenuItem key={item.key} asChild>
                    <Link href={item.href} className="w-full cursor-pointer">
                      {t(item.key)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground">
              Plus
              <ChevronDown className="h-3.5 w-3.5" />
            </span>
          )}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            variant="default"
            size="sm"
            asChild
            className="hidden gap-1.5 sm:inline-flex"
          >
            <Link href="/donate">
              <Heart className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t("nav.donate")}</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden gap-1.5 sm:inline-flex"
          >
            <Link href="/auth/login">
              <LogIn className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t("nav.login")}</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "max-h-[600px] border-t border-border" : "max-h-0"
        )}
      >
        <nav
          className="mx-auto w-full max-w-7xl px-4 py-4"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {allNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              <Button variant="default" size="sm" asChild className="gap-2">
                <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>
                  <Heart className="h-4 w-4" />
                  {t("nav.donate")}
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="gap-2">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4" />
                  {t("nav.login")}
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
