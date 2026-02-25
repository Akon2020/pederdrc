"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Newspaper,
  ImageIcon,
  MessageSquareQuote,
  Handshake,
  FileText,
  Users,
  Settings,
  Eye,
  Heart,
  LogOut,
  Mail,
  HandCoins,
  Baby,
  Tag,
  FolderOpen,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"

const mainNav = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Articles", href: "/admin/articles", icon: Newspaper },
  { title: "Galerie", href: "/admin/gallery", icon: ImageIcon },
  { title: "Temoignages", href: "/admin/testimonies", icon: MessageSquareQuote },
  { title: "Partenaires", href: "/admin/partners", icon: Handshake },
  { title: "Rapports", href: "/admin/reports", icon: FileText },
  { title: "Messages", href: "/admin/messages", icon: Mail },
  { title: "Dons", href: "/admin/donations", icon: HandCoins },
]

const trackingNav = [
  { title: "Suivi enfants", href: "/admin/children", icon: Baby },
  { title: "Categories", href: "/admin/categories", icon: Tag },
  { title: "Fichiers", href: "/admin/files", icon: FolderOpen },
]

const systemNav = [
  { title: "Utilisateurs", href: "/admin/users", icon: Users },
  { title: "Parametres", href: "/admin/settings", icon: Settings },
  { title: "Voir le site", href: "/", icon: Eye, external: true },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Heart className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-sidebar-foreground">
              PEDER Admin
            </span>
            <span className="text-[10px] leading-tight text-sidebar-foreground/60">
              Back-office
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestion du contenu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.href === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.href)
                    }
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Suivi et outils</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {trackingNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Systeme</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {user && (
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground">
              <span className="text-xs font-semibold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-xs font-semibold text-sidebar-foreground">
                {user.name}
              </span>
              <Badge
                variant="outline"
                className="mt-0.5 w-fit border-sidebar-border text-[10px] text-sidebar-foreground/60"
              >
                {user.role}
              </Badge>
            </div>
            <button
              onClick={handleLogout}
              className="shrink-0 rounded-md p-1.5 text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
              aria-label="Se deconnecter"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
