"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Pencil, Calendar, Tag, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { mockGallery } from "@/mocks/data"

export default function GalleryViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const item = mockGallery.find((g) => g.id === id)

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <p className="text-muted-foreground">Element introuvable.</p>
        <Button asChild variant="outline"><Link href="/admin/gallery"><ArrowLeft className="mr-2 h-4 w-4" />Retour</Link></Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="gap-2"><Link href="/admin/gallery"><ArrowLeft className="h-4 w-4" />Retour a la galerie</Link></Button>
        <Button asChild className="gap-2"><Link href={`/admin/gallery/${id}/edit`}><Pencil className="h-4 w-4" />Modifier</Link></Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">{item.type === "photo" ? "Photo" : "Video"}</Badge>
              <Badge variant="outline" className="capitalize"><Tag className="mr-1 h-3 w-3" />{item.category}</Badge>
            </div>
            <h1 className="text-2xl font-bold text-foreground">{item.title}</h1>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(item.createdAt).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {item.type === "photo" ? (
            <div className="overflow-hidden rounded-lg">
              <img src={item.url} alt={item.title} className="h-auto max-h-[500px] w-full object-contain" crossOrigin="anonymous" />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
              <ImageIcon className="h-16 w-16 text-muted-foreground" />
              <span className="ml-3 text-muted-foreground">Video: {item.url}</span>
            </div>
          )}
          {item.description && (
            <p className="mt-4 leading-relaxed text-foreground">{item.description}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
