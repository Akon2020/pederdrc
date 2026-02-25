import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" })

export const metadata: Metadata = {
  title: {
    default: 'PEDER - Programme d\'Encadrement des Enfants de la Rue',
    template: '%s | PEDER',
  },
  description: 'PEDER est une oeuvre sociale et caritative oeuvrant depuis 1989 a Bukavu pour la protection et la reinsertion des enfants de la rue.',
  keywords: ['PEDER', 'enfants de la rue', 'Bukavu', 'RDC', 'Congo', 'ONG', 'protection enfance'],
  openGraph: {
    title: 'PEDER - Programme d\'Encadrement des Enfants de la Rue',
    description: 'Oeuvre sociale et caritative pour la protection des enfants de la rue a Bukavu, RDC.',
    url: 'https://www.pederdrc.vercel.app',
    siteName: 'PEDER',
    locale: 'fr_CD',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1a2744' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
