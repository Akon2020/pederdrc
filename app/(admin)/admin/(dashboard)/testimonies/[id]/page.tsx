"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Pencil, Calendar, User, Heart, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { mockTestimonies } from "@/mocks/data"

export default function TestimonyViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const item = mockTestimonies.find((t) => t.id === id)

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <p className="text-muted-foreground">Temoignage introuvable.</p>
        <Button asChild variant="outline"><Link href="/admin/testimonies"><ArrowLeft className="mr-2 h-4 w-4" />Retour</Link></Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="gap-2"><Link href="/admin/testimonies"><ArrowLeft className="h-4 w-4" />Retour aux temoignages</Link></Button>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{item.name}</h1>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
                {item.age && <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{item.age} ans</span>}
                <Badge variant="secondary">{item.program}</Badge>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{item.year}</span>
                <Badge variant={item.status === "published" ? "default" : "secondary"}>{item.status === "published" ? "Publie" : "Brouillon"}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="relative rounded-lg bg-muted/50 p-6">
            <Quote className="absolute left-4 top-4 h-8 w-8 text-primary/20" />
            <p className="relative z-10 pt-4 text-base leading-relaxed text-foreground italic">
              {item.story}
            </p>
          </div>
          {item.image && (
            <div className="mt-6 overflow-hidden rounded-lg">
              <img src={item.image} alt={item.name} className="h-64 w-full object-cover" crossOrigin="anonymous" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
