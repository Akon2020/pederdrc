"use client"

import { I18nProvider } from "@/lib/i18n"
import { PublicHeader } from "@/components/public/header"
import { PublicFooter } from "@/components/public/footer"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <I18nProvider>
      <div className="flex min-h-screen flex-col">
        <PublicHeader />
        <main className="flex-1">{children}</main>
        <PublicFooter />
      </div>
    </I18nProvider>
  )
}
