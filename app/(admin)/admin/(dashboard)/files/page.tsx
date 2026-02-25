"use client"

import { useState, useMemo, useRef } from "react"
import {
  Search, Upload, Trash2, Download, Eye, Grid, List, Folder, File, ImageIcon,
  Video, FileText, HardDrive, FolderOpen, ChevronRight, Pencil, Copy, X, MoreVertical,
  ZoomIn, ZoomOut, RotateCw, Maximize2, ArrowLeft, ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { mockUploadedFiles } from "@/mocks/data"
import type { UploadedFile } from "@/lib/types"
import { toast } from "sonner"

const typeIcons: Record<UploadedFile["type"], React.ComponentType<{ className?: string }>> = {
  image: ImageIcon, document: FileText, video: Video, other: File,
}

const typeColors: Record<UploadedFile["type"], string> = {
  image: "text-emerald-500", document: "text-primary", video: "text-amber-500", other: "text-muted-foreground",
}

export default function AdminFilesPage() {
  const [files, setFiles] = useState<UploadedFile[]>(mockUploadedFiles)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentFolder, setCurrentFolder] = useState("/")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [previewOpen, setPreviewOpen] = useState(false)
  const [renameOpen, setRenameOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [selected, setSelected] = useState<UploadedFile | null>(null)
  const [renameName, setRenameName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Derive unique folders from files
  const folders = useMemo(() => {
    const set = new Set<string>()
    files.forEach((f) => {
      const parts = f.folder.split("/").filter(Boolean)
      let path = ""
      parts.forEach((p) => { path += `/${p}`; set.add(path) })
    })
    return Array.from(set).sort()
  }, [files])

  // Get subfolders of current folder
  const subfolders = useMemo(() => {
    const prefix = currentFolder === "/" ? "/" : currentFolder + "/"
    const subs = new Set<string>()
    folders.forEach((f) => {
      if (f.startsWith(prefix) && f !== currentFolder) {
        const rest = f.slice(prefix.length)
        const next = rest.split("/")[0]
        if (next) subs.add(prefix + next)
      }
    })
    return Array.from(subs)
  }, [folders, currentFolder])

  // Filter files in current folder
  const currentFiles = useMemo(() => {
    return files.filter((f) => {
      const inFolder = f.folder === currentFolder
      const matchSearch = f.name.toLowerCase().includes(search.toLowerCase())
      const matchType = typeFilter === "all" || f.type === typeFilter
      return inFolder && matchSearch && matchType
    })
  }, [files, currentFolder, search, typeFilter])

  const breadcrumb = useMemo(() => {
    const parts = currentFolder.split("/").filter(Boolean)
    const crumbs = [{ label: "Racine", path: "/" }]
    let path = ""
    parts.forEach((p) => { path += `/${p}`; crumbs.push({ label: p, path }) })
    return crumbs
  }, [currentFolder])

  // Stats
  const images = files.filter((f) => f.type === "image").length
  const docs = files.filter((f) => f.type === "document").length
  const videos = files.filter((f) => f.type === "video").length
  const totalSize = files.reduce((acc, f) => {
    const num = parseFloat(f.size)
    const unit = f.size.replace(/[0-9. ]/g, "")
    return acc + (unit === "MB" ? num : unit === "KB" ? num / 1024 : num * 1024)
  }, 0)

  const handleUpload = () => {
    toast.success("Fichiers uploades", { description: "Les fichiers ont ete ajoutes au dossier courant." })
    setUploadOpen(false)
  }

  const handleRename = () => {
    if (!renameName.trim() || !selected) return
    setFiles(files.map((f) => f.id === selected.id ? { ...f, name: renameName } : f))
    toast.success("Fichier renomme", { description: `Le fichier a ete renomme en "${renameName}".` })
    setRenameOpen(false)
  }

  const handleDelete = () => {
    if (selected) {
      setFiles(files.filter((f) => f.id !== selected.id))
      toast.success("Fichier supprime", { description: `"${selected.name}" a ete supprime.` })
    }
    setDeleteOpen(false); setSelected(null)
  }

  const handleCopyUrl = (file: UploadedFile) => {
    navigator.clipboard.writeText(file.url)
    toast.success("URL copiee", { description: "Le lien du fichier a ete copie dans le presse-papier." })
  }

  const FileIcon = ({ file }: { file: UploadedFile }) => {
    const Icon = typeIcons[file.type]
    return <Icon className={`h-5 w-5 ${typeColors[file.type]}`} />
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total fichiers</CardTitle><HardDrive className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{files.length}</div><p className="text-xs text-muted-foreground">{totalSize.toFixed(1)} MB au total</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Images</CardTitle><ImageIcon className="h-4 w-4 text-emerald-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{images}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Documents</CardTitle><FileText className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">{docs}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Videos</CardTitle><Video className="h-4 w-4 text-amber-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{videos}</div></CardContent></Card>
      </div>

      {/* Breadcrumb + Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 text-sm">
          {breadcrumb.map((crumb, i) => (
            <div key={crumb.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
              <button
                onClick={() => setCurrentFolder(crumb.path)}
                className={`rounded px-1.5 py-0.5 transition-colors hover:bg-muted ${crumb.path === currentFolder ? "font-semibold text-foreground" : "text-muted-foreground"}`}
              >
                {crumb.label}
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 w-56" /></div>
          <Select value={typeFilter} onValueChange={setTypeFilter}><SelectTrigger className="w-32"><SelectValue placeholder="Type" /></SelectTrigger><SelectContent><SelectItem value="all">Tous</SelectItem><SelectItem value="image">Images</SelectItem><SelectItem value="document">Documents</SelectItem><SelectItem value="video">Videos</SelectItem></SelectContent></Select>
          <div className="flex rounded-lg border border-input">
            <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon" className="h-9 w-9 rounded-r-none" onClick={() => setViewMode("list")}><List className="h-4 w-4" /></Button>
            <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" className="h-9 w-9 rounded-l-none" onClick={() => setViewMode("grid")}><Grid className="h-4 w-4" /></Button>
          </div>
          <Button onClick={() => setUploadOpen(true)} className="gap-2"><Upload className="h-4 w-4" />Uploader</Button>
        </div>
      </div>

      {/* Folder browser + File list */}
      <Card>
        <CardContent className="p-0">
          {/* Subfolders */}
          {subfolders.length > 0 && (
            <div className="flex flex-wrap gap-2 border-b border-border p-4">
              {subfolders.map((folder) => {
                const label = folder.split("/").filter(Boolean).pop() || folder
                return (
                  <button key={folder} onClick={() => setCurrentFolder(folder)} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-muted">
                    <Folder className="h-4 w-4 text-amber-500" />
                    <span>{label}</span>
                  </button>
                )
              })}
            </div>
          )}

          {viewMode === "list" ? (
            <Table>
              <TableHeader><TableRow><TableHead>Nom</TableHead><TableHead className="hidden md:table-cell">Type</TableHead><TableHead className="hidden md:table-cell">Taille</TableHead><TableHead className="hidden lg:table-cell">Uploade par</TableHead><TableHead className="hidden lg:table-cell">Date</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {currentFiles.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="py-10 text-center"><div className="flex flex-col items-center gap-2"><FolderOpen className="h-8 w-8 text-muted-foreground" /><span className="text-sm text-muted-foreground">Dossier vide</span></div></TableCell></TableRow>
                ) : currentFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell><div className="flex items-center gap-3"><FileIcon file={file} /><span className="text-sm font-medium">{file.name}</span></div></TableCell>
                    <TableCell className="hidden md:table-cell"><Badge variant="outline" className="text-xs capitalize">{file.type}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell"><span className="text-sm text-muted-foreground">{file.size}</span></TableCell>
                    <TableCell className="hidden lg:table-cell"><span className="text-sm text-muted-foreground">{file.uploadedBy}</span></TableCell>
                    <TableCell className="hidden lg:table-cell"><span className="text-sm text-muted-foreground">{new Date(file.uploadedAt).toLocaleDateString("fr-FR")}</span></TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { setSelected(file); setPreviewOpen(true) }}><Eye className="mr-2 h-4 w-4" />Visualiser</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success("Telechargement demarre")}><Download className="mr-2 h-4 w-4" />Telecharger</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCopyUrl(file)}><Copy className="mr-2 h-4 w-4" />Copier l{"'"}URL</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setSelected(file); setRenameName(file.name); setRenameOpen(true) }}><Pencil className="mr-2 h-4 w-4" />Renommer</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => { setSelected(file); setDeleteOpen(true) }} className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" />Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {currentFiles.length === 0 ? (
                <div className="col-span-full flex flex-col items-center gap-2 py-10"><FolderOpen className="h-8 w-8 text-muted-foreground" /><span className="text-sm text-muted-foreground">Dossier vide</span></div>
              ) : currentFiles.map((file) => (
                <div key={file.id} className="group relative flex flex-col items-center gap-2 rounded-lg border border-border p-4 transition-colors hover:bg-muted cursor-pointer" onClick={() => { setSelected(file); setPreviewOpen(true) }}>
                  {file.type === "image" && file.url.startsWith("http") ? (
                    <img src={file.url} alt={file.name} className="h-20 w-20 rounded-md object-cover" crossOrigin="anonymous" />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-md bg-muted">
                      <FileIcon file={file} />
                    </div>
                  )}
                  <span className="line-clamp-2 text-center text-xs font-medium">{file.name}</span>
                  <span className="text-[10px] text-muted-foreground">{file.size}</span>
                  {/* Actions overlay */}
                  <div className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="secondary" size="icon" className="h-7 w-7" onClick={(e) => e.stopPropagation()}><MoreVertical className="h-3.5 w-3.5" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setSelected(file); setPreviewOpen(true) }}><Eye className="mr-2 h-4 w-4" />Visualiser</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success("Telechargement demarre")}><Download className="mr-2 h-4 w-4" />Telecharger</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCopyUrl(file)}><Copy className="mr-2 h-4 w-4" />Copier l{"'"}URL</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setSelected(file); setRenameName(file.name); setRenameOpen(true) }}><Pencil className="mr-2 h-4 w-4" />Renommer</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => { setSelected(file); setDeleteOpen(true) }} className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" />Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Viewer */}
      <FileViewer
        file={selected}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        files={currentFiles}
        onNavigate={(file) => setSelected(file)}
      />

      {/* Rename Dialog */}
      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Renommer le fichier</DialogTitle><DialogDescription>Entrez le nouveau nom du fichier.</DialogDescription></DialogHeader>
          <div className="flex flex-col gap-2"><Label>Nom du fichier</Label><Input value={renameName} onChange={(e) => setRenameName(e.target.value)} /></div>
          <DialogFooter><Button variant="outline" onClick={() => setRenameOpen(false)}>Annuler</Button><Button onClick={handleRename}>Renommer</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Uploader des fichiers</DialogTitle><DialogDescription>Dossier actuel: {currentFolder}</DialogDescription></DialogHeader>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed border-input px-6 py-10 transition-colors hover:border-primary hover:bg-muted/50"
          >
            <Upload className="h-10 w-10 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium">Cliquez ou glissez vos fichiers ici</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, PDF, MP4, DOC jusqu{"'"}a 50MB</p>
            </div>
            <input ref={fileInputRef} type="file" multiple className="hidden" />
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setUploadOpen(false)}>Annuler</Button><Button onClick={handleUpload}>Uploader</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Supprimer le fichier" description={`Supprimer "${selected?.name}" ? Cette action est irreversible.`} confirmLabel="Supprimer" onConfirm={handleDelete} />
    </div>
  )
}

// ── Full File Viewer ──
function FileViewer({
  file,
  open,
  onOpenChange,
  files,
  onNavigate,
}: {
  file: UploadedFile | null
  open: boolean
  onOpenChange: (open: boolean) => void
  files: UploadedFile[]
  onNavigate: (file: UploadedFile) => void
}) {
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)

  if (!file) return null

  const idx = files.findIndex((f) => f.id === file.id)
  const hasPrev = idx > 0
  const hasNext = idx < files.length - 1

  const goPrev = () => { if (hasPrev) { onNavigate(files[idx - 1]); setZoom(100); setRotation(0) } }
  const goNext = () => { if (hasNext) { onNavigate(files[idx + 1]); setZoom(100); setRotation(0) } }

  const renderPreview = () => {
    if (file.type === "image") {
      if (file.url.startsWith("http")) {
        return (
          <div className="flex items-center justify-center overflow-auto rounded-md bg-muted/30" style={{ maxHeight: "60vh" }}>
            <img
              src={file.url}
              alt={file.name}
              className="transition-transform duration-200"
              style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)`, maxWidth: "100%", maxHeight: "60vh" }}
              crossOrigin="anonymous"
            />
          </div>
        )
      }
      return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-md bg-muted/30 py-16">
          <ImageIcon className="h-16 w-16 text-emerald-500/50" />
          <p className="text-sm text-muted-foreground">Apercu non disponible pour ce fichier local</p>
          <p className="text-xs text-muted-foreground">{file.name} - {file.size}</p>
        </div>
      )
    }

    if (file.type === "video") {
      if (file.url.startsWith("http")) {
        return (
          <div className="flex items-center justify-center overflow-hidden rounded-md bg-black">
            <video controls className="max-h-[60vh] w-full">
              <source src={file.url} type={file.mimeType} />
              Votre navigateur ne supporte pas la lecture video.
            </video>
          </div>
        )
      }
      return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-md bg-muted/30 py-16">
          <Video className="h-16 w-16 text-amber-500/50" />
          <p className="text-sm font-medium">{file.name}</p>
          <p className="text-xs text-muted-foreground">{file.size} - {file.mimeType}</p>
          <p className="text-xs text-muted-foreground">Video disponible au telechargement</p>
        </div>
      )
    }

    if (file.type === "document") {
      const extension = file.name.split(".").pop()?.toLowerCase()
      return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-muted/30 py-16">
          <div className="relative">
            <FileText className="h-20 w-20 text-primary/40" />
            {extension && (
              <span className="absolute bottom-0 right-0 rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
                {extension}
              </span>
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">{file.name}</p>
            <p className="text-xs text-muted-foreground">{file.size} - {file.mimeType}</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.success("Telechargement demarre")}>
            <Download className="h-4 w-4" />Telecharger le document
          </Button>
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-md bg-muted/30 py-16">
        <File className="h-16 w-16 text-muted-foreground/50" />
        <p className="text-sm font-medium">{file.name}</p>
        <p className="text-xs text-muted-foreground">{file.size} - {file.mimeType}</p>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) { setZoom(100); setRotation(0) } }}>
      <DialogContent className="max-w-3xl gap-0 p-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2 min-w-0">
            <Badge variant="outline" className="text-xs capitalize shrink-0">{file.type}</Badge>
            <span className="truncate text-sm font-medium">{file.name}</span>
          </div>
          <div className="flex items-center gap-1">
            {file.type === "image" && (
              <>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setZoom(Math.max(25, zoom - 25))} disabled={zoom <= 25}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-xs text-muted-foreground">{zoom}%</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setZoom(Math.min(300, zoom + 25))} disabled={zoom >= 300}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setRotation((rotation + 90) % 360)}>
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setZoom(100); setRotation(0) }}>
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="mx-1 h-5" />
              </>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopyUrlStatic(file)}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.success("Telechargement demarre")}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { onOpenChange(false); setZoom(100); setRotation(0) }}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Preview area */}
        <div className="relative p-4">
          {renderPreview()}

          {/* Navigation arrows */}
          {hasPrev && (
            <Button variant="secondary" size="icon" className="absolute left-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-lg" onClick={goPrev}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          {hasNext && (
            <Button variant="secondary" size="icon" className="absolute right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-lg" onClick={goNext}>
              <ArrowRight className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* File info footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>{file.size}</span>
            <span>{file.mimeType}</span>
            <span>Dossier: {file.folder}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Par {file.uploadedBy}</span>
            <span>{new Date(file.uploadedAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>{idx + 1} / {files.length}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function handleCopyUrlStatic(file: UploadedFile) {
  navigator.clipboard.writeText(file.url)
  toast.success("URL copiee", { description: "Le lien du fichier a ete copie dans le presse-papier." })
}
