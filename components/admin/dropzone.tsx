"use client"

import { useState, useCallback, useRef } from "react"
import { UploadCloud, X, FileIcon, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number
  label?: string
  description?: string
  currentFile?: string
  variant?: "image" | "document"
}

export function Dropzone({
  onFilesSelected,
  accept = "image/*",
  multiple = false,
  maxSize = 10,
  label = "Glissez-deposez vos fichiers ici",
  description,
  currentFile,
  variant = "image",
}: DropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const processFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return
      const fileArray = Array.from(files)
      const validFiles = fileArray.filter(
        (f) => f.size <= maxSize * 1024 * 1024
      )
      setSelectedFiles(validFiles)
      onFilesSelected(validFiles)

      if (variant === "image" && validFiles[0]) {
        const reader = new FileReader()
        reader.onload = (e) => setPreview(e.target?.result as string)
        reader.readAsDataURL(validFiles[0])
      }
    },
    [maxSize, onFilesSelected, variant]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      processFiles(e.dataTransfer.files)
    },
    [processFiles]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files)
    },
    [processFiles]
  )

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = selectedFiles.filter((_, i) => i !== index)
      setSelectedFiles(newFiles)
      onFilesSelected(newFiles)
      if (newFiles.length === 0) {
        setPreview(null)
      }
    },
    [selectedFiles, onFilesSelected]
  )

  return (
    <div className="flex flex-col gap-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 transition-colors",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Apercu"
              className="h-32 w-auto rounded-md object-contain"
              crossOrigin="anonymous"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -right-2 -top-2 h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                removeFile(0)
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : currentFile ? (
          <div className="flex flex-col items-center gap-2">
            {variant === "image" ? (
              <img
                src={currentFile}
                alt="Fichier actuel"
                className="h-24 w-auto rounded-md object-contain"
                crossOrigin="anonymous"
              />
            ) : (
              <FileIcon className="h-10 w-10 text-muted-foreground" />
            )}
            <span className="text-xs text-muted-foreground">Fichier actuel</span>
          </div>
        ) : (
          <>
            {variant === "image" ? (
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
            ) : (
              <UploadCloud className="h-10 w-10 text-muted-foreground" />
            )}
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-sm font-medium text-foreground">{label}</span>
              <span className="text-xs text-muted-foreground">
                {description || `ou cliquez pour parcourir (max ${maxSize}MB)`}
              </span>
            </div>
          </>
        )}
      </div>

      {selectedFiles.length > 1 && (
        <div className="flex flex-col gap-1.5">
          {selectedFiles.map((file, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md border border-input bg-muted/30 px-3 py-2"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <FileIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate text-xs text-foreground">{file.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  ({(file.size / 1024 / 1024).toFixed(1)} MB)
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={() => removeFile(i)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
