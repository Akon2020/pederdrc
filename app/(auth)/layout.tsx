"use client"

import { AuthProvider } from "@/lib/auth"

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
