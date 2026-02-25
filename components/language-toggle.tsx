"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

export function LanguageToggle() {
  const { locale, setLocale } = useI18n()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
      className="gap-1.5 text-sm"
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{locale === "fr" ? "EN" : "FR"}</span>
    </Button>
  )
}
