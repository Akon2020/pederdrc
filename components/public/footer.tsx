"use client"

import Link from "next/link"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { mockSiteSettings } from "@/mocks/data"

export function PublicFooter() {
  const { t } = useI18n()
  const settings = mockSiteSettings

  return (
    <footer className="border-t border-border bg-card" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                PEDER
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("footer.mission")}
            </p>
            <div className="flex items-center gap-3">
              {settings.socialLinks.facebook && (
                <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {settings.socialLinks.twitter && (
                <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {settings.socialLinks.instagram && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {settings.socialLinks.youtube && (
                <a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">
              {t("footer.quicklinks")}
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { key: "nav.about", href: "/about" },
                { key: "nav.programs", href: "/programs" },
                { key: "nav.news", href: "/news" },
                { key: "nav.stories", href: "/stories" },
                { key: "nav.partners", href: "/partners" },
                { key: "nav.reports", href: "/reports" },
              ].map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">
              {t("nav.programs")}
            </h3>
            <div className="flex flex-col gap-2">
              {[
                "Integration sociale",
                "Formation professionnelle",
                "Orientation scolaire",
                "Insertion professionnelle",
                "Soutien aux familles",
                "Assistance juridique",
              ].map((label) => (
                <span
                  key={label}
                  className="text-sm text-muted-foreground"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">
              {t("footer.contact")}
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {settings.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {settings.contactPhone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {settings.contactEmail}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PEDER. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/policies" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              {t("nav.policies")}
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              {t("nav.contact")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
