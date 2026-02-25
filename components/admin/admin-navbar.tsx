"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function AdminNavbar({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5" />
      {title && (
        <h1 className="text-sm font-semibold text-foreground">{title}</h1>
      )}
      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]">
            3
          </Badge>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  )
}
