"use client"

import { useState } from "react"
import { Camera, Play, ImageIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useI18n } from "@/lib/i18n"
import { mockGallery } from "@/mocks/data"

export default function GalleryPage() {
  const { t, locale } = useI18n()
  const [filter, setFilter] = useState<"all" | "photo" | "video">("all")
  const [selectedItem, setSelectedItem] = useState<(typeof mockGallery)[0] | null>(null)

  const filtered =
    filter === "all"
      ? mockGallery
      : mockGallery.filter((item) => item.type === filter)

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            {t("gallery.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/70">
            {t("gallery.subtitle")}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center gap-2 py-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              {t("gallery.all")}
            </Button>
            <Button
              variant={filter === "photo" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("photo")}
              className="gap-1.5"
            >
              <Camera className="h-4 w-4" />
              {t("gallery.photos")}
            </Button>
            <Button
              variant={filter === "video" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("video")}
              className="gap-1.5"
            >
              <Play className="h-4 w-4" />
              {t("gallery.videos")}
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => (
              <Card
                key={item.id}
                className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative flex h-52 items-center justify-center bg-primary/5">
                  {item.type === "video" ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
                        <Play className="h-7 w-7 text-primary" />
                      </div>
                    </div>
                  ) : (
                    <ImageIcon className="h-12 w-12 text-primary/30" />
                  )}
                  <Badge
                    variant="secondary"
                    className="absolute top-3 right-3 text-xs"
                  >
                    {item.category}
                  </Badge>
                </div>
                <CardContent className="flex flex-col gap-1 p-4">
                  <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                    {locale === "en" && item.titleEn
                      ? item.titleEn
                      : item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {locale === "en" && item.descriptionEn
                      ? item.descriptionEn
                      : item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedItem &&
                (locale === "en" && selectedItem.titleEn
                  ? selectedItem.titleEn
                  : selectedItem.title)}
            </DialogTitle>
            <DialogDescription>
              {selectedItem &&
                (locale === "en" && selectedItem.descriptionEn
                  ? selectedItem.descriptionEn
                  : selectedItem.description)}
            </DialogDescription>
          </DialogHeader>
          <div className="flex h-64 items-center justify-center rounded-lg bg-muted md:h-96">
            {selectedItem?.type === "video" ? (
              <div className="flex flex-col items-center gap-3">
                <Play className="h-16 w-16 text-primary" />
                <p className="text-sm text-muted-foreground">
                  {locale === "en" ? "Video preview" : "Apercu video"}
                </p>
              </div>
            ) : (
              <ImageIcon className="h-16 w-16 text-muted-foreground" />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
