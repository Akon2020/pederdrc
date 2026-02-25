"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, Heart, LogIn, ChevronDown, Home, Info, BookOpen, Newspaper, Phone, Compass, Image, Users, Handshake, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useI18n } from "@/lib/i18n"

const primaryNav = [
  { key: "nav.home", href: "/", icon: Home },
  { key: "nav.about", href: "/about", icon: Info },
  { key: "nav.programs", href: "/programs", icon: BookOpen },
  { key: "nav.news", href: "/news", icon: Newspaper },
  { key: "nav.contact", href: "/contact", icon: Phone },
]

const moreNav = [
  { key: "nav.strategies", href: "/strategies", icon: Compass },
  { key: "nav.gallery", href: "/gallery", icon: Image },
  { key: "nav.stories", href: "/stories", icon: Users },
  { key: "nav.partners", href: "/partners", icon: Handshake },
  { key: "nav.reports", href: "/reports", icon: FileText },
]

export function PublicHeader() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t } = useI18n()

  useEffect(() => { setMounted(true) }, [])

  const allNav = [...primaryNav, ...moreNav]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Mobile menu trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 lg:hidden"
          onClick={() => setSheetOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

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
          aria-label="Navigation principale"
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
          <Button variant="default" size="sm" asChild className="hidden gap-1.5 sm:inline-flex">
            <Link href="/donate">
              <Heart className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t("nav.donate")}</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="hidden gap-1.5 sm:inline-flex">
            <Link href="/auth/login">
              <LogIn className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t("nav.login")}</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Sheet (LTR - opens from left) */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="left" className="flex w-[280px] flex-col p-0 sm:max-w-[320px]">
          <SheetHeader className="border-b border-border px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <SheetTitle className="text-left text-lg font-bold leading-tight">PEDER</SheetTitle>
                <SheetDescription className="text-left text-xs leading-tight">
                  Bukavu, RDC
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <nav
            className="flex-1 overflow-y-auto px-3 py-4"
            role="navigation"
            aria-label="Navigation mobile"
          >
            <div className="flex flex-col gap-1">
              {allNav.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setSheetOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {t(item.key)}
                  </Link>
                )
              })}
            </div>
          </nav>

          <SheetFooter className="border-t border-border px-3 py-4">
            <div className="flex flex-col gap-2">
              <Button variant="default" asChild className="w-full justify-start gap-2">
                <Link href="/donate" onClick={() => setSheetOpen(false)}>
                  <Heart className="h-4 w-4" />
                  {t("nav.donate")}
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start gap-2">
                <Link href="/auth/login" onClick={() => setSheetOpen(false)}>
                  <LogIn className="h-4 w-4" />
                  {t("nav.login")}
                </Link>
              </Button>
              <Separator className="my-1" />
              <div className="flex items-center justify-between px-1">
                <span className="text-xs text-muted-foreground">Preferences</span>
                <div className="flex items-center gap-1">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  )
}
