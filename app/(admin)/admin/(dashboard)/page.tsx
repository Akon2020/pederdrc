"use client"

import {
  Users,
  Handshake,
  TrendingUp,
  Activity,
  Newspaper,
  ImageIcon,
  MessageSquareQuote,
  FileText,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { mockDashboardStats } from "@/mocks/data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const COLORS = [
  "oklch(0.35 0.08 250)",
  "oklch(0.65 0.15 160)",
  "oklch(0.82 0.1 85)",
  "oklch(0.55 0.12 250)",
  "oklch(0.72 0.12 160)",
]

const quickStats = [
  {
    label: "Enfants encadres",
    value: mockDashboardStats.totalChildren.toLocaleString(),
    icon: Users,
    change: "+12%",
  },
  {
    label: "Programmes actifs",
    value: mockDashboardStats.activePrograms.toString(),
    icon: Activity,
    change: "Stable",
  },
  {
    label: "Partenaires",
    value: mockDashboardStats.totalPartners.toString(),
    icon: Handshake,
    change: "+2",
  },
  {
    label: "Taux de reussite",
    value: `${mockDashboardStats.successRate}%`,
    icon: TrendingUp,
    change: "+5%",
  },
]

const contentStats = [
  { label: "Articles", count: 6, icon: Newspaper },
  { label: "Photos/Videos", count: 8, icon: ImageIcon },
  { label: "Temoignages", count: 5, icon: MessageSquareQuote },
  { label: "Rapports", count: 6, icon: FileText },
]

export default function AdminDashboard() {
  return (
    <>
      <div className="flex flex-col gap-6 p-4 lg:p-6">
        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
                <span className="ml-auto text-xs font-medium text-primary">
                  {stat.change}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Bar Chart */}
          <Card className="lg:col-span-3">
            <CardContent className="p-5">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Enfants pris en charge par annee
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockDashboardStats.childrenByYear}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="year" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Bar dataKey="count" fill="oklch(0.35 0.08 250)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="lg:col-span-2">
            <CardContent className="p-5">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Repartition par programme
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockDashboardStats.programDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {mockDashboardStats.programDistribution.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {mockDashboardStats.programDistribution.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-1.5 text-xs">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Stats + Recent Activities */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Content Stats */}
          <Card>
            <CardContent className="p-5">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Contenu du site
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {contentStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 rounded-lg border border-border p-4"
                  >
                    <stat.icon className="h-5 w-5 text-primary" />
                    <div>
                      <span className="text-lg font-bold text-foreground">
                        {stat.count}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardContent className="p-5">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Activites recentes
              </h3>
              <div className="flex flex-col gap-3">
                {mockDashboardStats.recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 rounded-lg border border-border p-3"
                  >
                    <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium text-foreground">
                        {activity.action}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {activity.user} - {new Date(activity.date).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
