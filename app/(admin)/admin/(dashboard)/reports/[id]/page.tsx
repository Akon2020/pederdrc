"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Pencil, Calendar, FileText, Download, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { mockReports } from "@/mocks/data"

const typeLabels: Record<string, string> = { annual: "Rapport annuel", project: "Rapport de projet", research: "Recherche", guide: "Guide", book: "Ouvrage" }

export default function ReportViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const item = mockReports.find((r) => r.id === id)

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <p className="text-muted-foreground">Rapport introuvable.</p>
        <Button asChild variant="outline"><Link href="/admin/reports"><ArrowLeft className="mr-2 h-4 w-4" />Retour</Link></Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="gap-2"><Link href="/admin/reports"><ArrowLeft className="h-4 w-4" />Retour aux rapports</Link></Button>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Telecharger PDF</Button>
          <Button asChild className="gap-2"><Link href={`/admin/reports/${id}/edit`}><Pencil className="h-4 w-4" />Modifier</Link></Button>
        </div>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary"><Tag className="mr-1 h-3 w-3" />{typeLabels[item.type]}</Badge>
              <Badge variant="outline">{item.year}</Badge>
            </div>
            <h1 className="text-2xl font-bold text-foreground">{item.title}</h1>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              Publie le {new Date(item.publishedAt).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p className="leading-relaxed text-foreground">{item.description}</p>
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-input bg-muted/30 p-4">
            <FileText className="h-10 w-10 text-primary" />
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-medium text-foreground">{item.title}.pdf</span>
              <span className="text-xs text-muted-foreground">Document PDF</span>
            </div>
            <Button variant="outline" size="sm" className="gap-1"><Download className="h-3 w-3" />Telecharger</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
