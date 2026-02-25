"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { Locale } from "./types"

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : undefined
}

function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`
}

const translations: Record<Locale, Record<string, string>> = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.about": "A propos",
    "nav.programs": "Programmes",
    "nav.strategies": "Strategies",
    "nav.news": "Actualites",
    "nav.gallery": "Galerie",
    "nav.stories": "Histoires de succes",
    "nav.partners": "Partenaires",
    "nav.reports": "Rapports",
    "nav.policies": "Politiques",
    "nav.contact": "Contact",
    "nav.donate": "Faire un don",
    "nav.login": "Connexion",
    // Home
    "home.hero.title": "Programme d'Encadrement des Enfants de la Rue",
    "home.hero.subtitle": "Travail d'aide au developpement de l'enfant",
    "home.hero.description": "Le PEDER est une oeuvre sociale et caritative de la Congregation Missionnaire des Soeurs de Sainte Gemma, oeuvrant depuis 1989 a Bukavu pour la protection, l'encadrement, la reinsertion sociale et l'integration professionnelle des enfants de la rue.",
    "home.hero.cta": "Decouvrir nos programmes",
    "home.hero.contact": "Nous contacter",
    "home.hero.donate": "Faire un don",
    "home.mission.title": "Notre mission",
    "home.mission.description": "Ameliorer durablement les conditions de vie des enfants vulnerables.",
    "home.zone": "Zone d'intervention : Ville de Bukavu / RDC",
    "home.stats.children": "Enfants encadres",
    "home.stats.years": "Annees d'experience",
    "home.stats.programs": "Programmes actifs",
    "home.stats.centers": "Centres d'accueil",
    "home.programs.title": "Nos programmes d'intervention",
    "home.programs.subtitle": "Decouvrez nos differents axes d'intervention pour la protection et la reinsertion des enfants de la rue.",
    "home.partners.title": "Nos partenaires",
    "home.partners.subtitle": "Ils nous font confiance et soutiennent notre mission.",
    "home.cta.title": "Ensemble, changeons des vies",
    "home.cta.description": "Chaque enfant merite une chance. Rejoignez-nous dans notre mission pour offrir un avenir meilleur aux enfants de la rue de Bukavu.",
    "home.cta.button": "Contactez-nous",
    "home.news.title": "Dernieres actualites",
    "home.news.subtitle": "Restez informe de nos activites et evenements recents.",
    "home.stories.title": "Histoires de succes",
    "home.stories.subtitle": "Des vies transformees grace a nos programmes.",
    "home.gallery.title": "Galerie photos",
    "home.gallery.subtitle": "Decouvrez nos activites en images.",
    // About
    "about.title": "A propos du PEDER",
    "about.presentation.title": "Presentation",
    "about.presentation.text": "Le Programme d'Encadrement des Enfants de la Rue (PEDER) existe depuis 1989 dans la ville de Bukavu, Province du Sud-Kivu, en Republique Democratique du Congo. Il est une oeuvre sociale et caritative de la Congregation Missionnaire des Soeurs de Sainte Gemma.",
    "about.creation": "La creation du PEDER a ete motivee par la montee du vagabondage des enfants victimes de la pauvrete, de la misere et de la desarticulation sociale.",
    "about.vision.title": "Vision",
    "about.vision.text": "Participer activement a la construction d'un monde meilleur, favorable au bien-etre des enfants, engage a promouvoir les droits de l'enfant et a defendre ses interets.",
    "about.mission.title": "Mission",
    "about.mission.text": "Contribuer a l'amelioration durable des conditions de vie des enfants des rues a travers leur reinsertion sociale, educative et professionnelle.",
    "about.values.title": "Nos valeurs",
    "about.values.dignity": "Dignite humaine",
    "about.values.solidarity": "Solidarite",
    "about.values.justice": "Justice sociale",
    "about.values.charity": "Charite",
    // Programs
    "programs.title": "Programmes d'intervention",
    "programs.subtitle": "Nos axes d'intervention pour accompagner les enfants vers un avenir meilleur.",
    // Strategies
    "strategies.title": "Strategies d'intervention",
    "strategies.subtitle": "Notre approche pour atteindre les enfants en situation de rue.",
    "strategies.centers.title": "Intervention a travers les centres d'accueil",
    "strategies.community.title": "Intervention dans la communaute",
    "strategies.community.street": "Travail de rue",
    "strategies.community.animation": "Animation communautaire",
    "strategies.community.support": "Accompagnement de structure communautaire de protection de l'enfant",
    // News
    "news.title": "Actualites & Blog",
    "news.subtitle": "Suivez nos dernieres activites et evenements.",
    "news.readMore": "Lire la suite",
    // Gallery
    "gallery.title": "Galerie",
    "gallery.subtitle": "Photos et videos de nos interventions.",
    "gallery.photos": "Photos",
    "gallery.videos": "Videos",
    "gallery.all": "Tout",
    // Stories
    "stories.title": "Histoires de succes",
    "stories.subtitle": "Temoignages et parcours inspirants de nos beneficiaires.",
    // Partners
    "partners.title": "Nos partenaires",
    "partners.subtitle": "Les organisations qui soutiennent notre mission.",
    "partners.international": "Partenaires internationaux",
    "partners.local": "Partenaires locaux",
    // Reports
    "reports.title": "Rapports & Publications",
    "reports.subtitle": "Consultez nos rapports annuels, etudes et publications.",
    "reports.download": "Telecharger",
    "reports.annual": "Rapports annuels",
    "reports.project": "Rapports projets",
    "reports.research": "Etudes/recherches",
    "reports.book": "Ouvrages",
    "reports.guide": "Guides",
    // Policies
    "policies.title": "Politiques et Procedures Institutionnelles",
    "policies.subtitle": "Decouvrez nos politiques de gouvernance et nos procedures.",
    // Contact
    "contact.title": "Contactez-nous",
    "contact.subtitle": "N'hesitez pas a nous contacter pour toute question ou partenariat.",
    "contact.form.name": "Nom complet",
    "contact.form.email": "Adresse email",
    "contact.form.subject": "Sujet",
    "contact.form.message": "Message",
    "contact.form.send": "Envoyer le message",
    "contact.form.success": "Message envoye avec succes !",
    "contact.info.address": "Adresse",
    "contact.info.phone": "Telephone",
    "contact.info.email": "Email",
    "contact.info.website": "Site web",
    // Footer
    "footer.rights": "Tous droits reserves.",
    "footer.mission": "Oeuvre sociale et caritative de la Congregation Missionnaire des Soeurs de Sainte Gemma.",
    "footer.quicklinks": "Liens rapides",
    "footer.contact": "Contact",
    // Common
    "common.learnMore": "En savoir plus",
    "common.viewAll": "Voir tout",
    "common.back": "Retour",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.loading": "Chargement...",
    "common.noResults": "Aucun resultat",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.programs": "Programs",
    "nav.strategies": "Strategies",
    "nav.news": "News",
    "nav.gallery": "Gallery",
    "nav.stories": "Success Stories",
    "nav.partners": "Partners",
    "nav.reports": "Reports",
    "nav.policies": "Policies",
    "nav.contact": "Contact",
    "nav.donate": "Donate",
    "nav.login": "Login",
    // Home
    "home.hero.title": "Program for Street Children Support",
    "home.hero.subtitle": "Working for child development",
    "home.hero.description": "PEDER is a social and charitable work of the Missionary Congregation of the Sisters of Saint Gemma, working since 1989 in Bukavu for the protection, supervision, social reintegration and professional integration of street children.",
    "home.hero.cta": "Discover our programs",
    "home.hero.contact": "Contact us",
    "home.hero.donate": "Donate",
    "home.mission.title": "Our mission",
    "home.mission.description": "Sustainably improve the living conditions of vulnerable children.",
    "home.zone": "Intervention zone: City of Bukavu / DRC",
    "home.stats.children": "Children supported",
    "home.stats.years": "Years of experience",
    "home.stats.programs": "Active programs",
    "home.stats.centers": "Reception centers",
    "home.programs.title": "Our intervention programs",
    "home.programs.subtitle": "Discover our different intervention axes for the protection and reintegration of street children.",
    "home.partners.title": "Our partners",
    "home.partners.subtitle": "They trust us and support our mission.",
    "home.cta.title": "Together, let's change lives",
    "home.cta.description": "Every child deserves a chance. Join us in our mission to provide a better future for street children in Bukavu.",
    "home.cta.button": "Contact us",
    "home.news.title": "Latest News",
    "home.news.subtitle": "Stay informed about our recent activities and events.",
    "home.stories.title": "Success Stories",
    "home.stories.subtitle": "Lives transformed through our programs.",
    "home.gallery.title": "Photo Gallery",
    "home.gallery.subtitle": "Discover our activities in pictures.",
    // About
    "about.title": "About PEDER",
    "about.presentation.title": "Presentation",
    "about.presentation.text": "The Program for Street Children Support (PEDER) has existed since 1989 in the city of Bukavu, South Kivu Province, in the Democratic Republic of Congo. It is a social and charitable work of the Missionary Congregation of the Sisters of Saint Gemma.",
    "about.creation": "The creation of PEDER was motivated by the rise of vagrancy among children victims of poverty, misery and social disarticulation.",
    "about.vision.title": "Vision",
    "about.vision.text": "Actively participate in building a better world, favorable to the well-being of children, committed to promoting children's rights and defending their interests.",
    "about.mission.title": "Mission",
    "about.mission.text": "Contribute to the sustainable improvement of living conditions for street children through their social, educational and professional reintegration.",
    "about.values.title": "Our values",
    "about.values.dignity": "Human dignity",
    "about.values.solidarity": "Solidarity",
    "about.values.justice": "Social justice",
    "about.values.charity": "Charity",
    // Programs
    "programs.title": "Intervention Programs",
    "programs.subtitle": "Our intervention axes to support children towards a better future.",
    // Strategies
    "strategies.title": "Intervention Strategies",
    "strategies.subtitle": "Our approach to reaching children in street situations.",
    "strategies.centers.title": "Intervention through reception centers",
    "strategies.community.title": "Community intervention",
    "strategies.community.street": "Street work",
    "strategies.community.animation": "Community animation",
    "strategies.community.support": "Support for community child protection structures",
    // News
    "news.title": "News & Blog",
    "news.subtitle": "Follow our latest activities and events.",
    "news.readMore": "Read more",
    // Gallery
    "gallery.title": "Gallery",
    "gallery.subtitle": "Photos and videos of our interventions.",
    "gallery.photos": "Photos",
    "gallery.videos": "Videos",
    "gallery.all": "All",
    // Stories
    "stories.title": "Success Stories",
    "stories.subtitle": "Testimonies and inspiring journeys of our beneficiaries.",
    // Partners
    "partners.title": "Our Partners",
    "partners.subtitle": "Organizations that support our mission.",
    "partners.international": "International partners",
    "partners.local": "Local partners",
    // Reports
    "reports.title": "Reports & Publications",
    "reports.subtitle": "Consult our annual reports, studies and publications.",
    "reports.download": "Download",
    "reports.annual": "Annual reports",
    "reports.project": "Project reports",
    "reports.research": "Studies/Research",
    "reports.book": "Books",
    "reports.guide": "Guides",
    // Policies
    "policies.title": "Institutional Policies and Procedures",
    "policies.subtitle": "Discover our governance policies and procedures.",
    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Don't hesitate to contact us for any questions or partnership.",
    "contact.form.name": "Full name",
    "contact.form.email": "Email address",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.send": "Send message",
    "contact.form.success": "Message sent successfully!",
    "contact.info.address": "Address",
    "contact.info.phone": "Phone",
    "contact.info.email": "Email",
    "contact.info.website": "Website",
    // Footer
    "footer.rights": "All rights reserved.",
    "footer.mission": "Social and charitable work of the Missionary Congregation of the Sisters of Saint Gemma.",
    "footer.quicklinks": "Quick links",
    "footer.contact": "Contact",
    // Common
    "common.learnMore": "Learn more",
    "common.viewAll": "View all",
    "common.back": "Back",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.loading": "Loading...",
    "common.noResults": "No results",
  },
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr")

  // Read persisted locale on mount (client only)
  useEffect(() => {
    const saved = getCookie("peder_locale")
    if (saved === "en" || saved === "fr") {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    setCookie("peder_locale", newLocale)
  }, [])

  const t = useCallback(
    (key: string) => {
      return translations[locale][key] || key
    },
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
