"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Pencil, Calendar, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { mockArticles } from "@/mocks/data"

export default function ArticleViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const article = mockArticles.find((a) => a.id === id)

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <p className="text-muted-foreground">Article introuvable.</p>
        <Button asChild variant="outline">
          <Link href="/admin/articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux articles
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/admin/articles">
            <ArrowLeft className="h-4 w-4" />
            Retour aux articles
          </Link>
        </Button>
        <Button asChild className="gap-2">
          <Link href={`/admin/articles/${id}/edit`}>
            <Pencil className="h-4 w-4" />
            Modifier
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={article.status === "published" ? "default" : "secondary"}>
                {article.status === "published" ? "Publie" : "Brouillon"}
              </Badge>
              <Badge variant="outline" className="capitalize">
                <Tag className="mr-1 h-3 w-3" />
                {article.category}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold text-foreground">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          {article.image && (
            <div className="mb-6 overflow-hidden rounded-lg">
              <img
                src={article.image}
                alt={article.title}
                className="h-64 w-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
          )}
          <div className="mb-4 rounded-md border border-input bg-muted/30 p-4">
            <p className="text-sm font-medium text-muted-foreground">Extrait</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground">{article.excerpt}</p>
          </div>
          <div
            className="prose prose-sm max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
