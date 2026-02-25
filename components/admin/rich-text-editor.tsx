"use client"

import { useRef, useCallback, useEffect } from "react"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  ImageIcon,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
  Code,
  Strikethrough,
  Minus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

const ToolbarButton = ({
  onClick,
  icon: Icon,
  label,
}: {
  onClick: () => void
  icon: React.ComponentType<{ className?: string }>
  label: string
  active?: boolean
}) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    className="h-8 w-8"
    onClick={onClick}
    aria-label={label}
  >
    <Icon className="h-4 w-4" />
  </Button>
)

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Commencez a ecrire...",
  minHeight = "300px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  // Only set the initial content once when the component mounts
  useEffect(() => {
    if (editorRef.current && !isInitialized.current) {
      editorRef.current.innerHTML = value || ""
      isInitialized.current = true
    }
  }, [value])

  // If value changes externally (e.g. loading saved article for editing),
  // and the editor content is empty or has changed
  useEffect(() => {
    if (editorRef.current && isInitialized.current) {
      const currentContent = editorRef.current.innerHTML
      // Only update if the external value differs significantly (e.g. loading a new article)
      if (value && currentContent === "" && value !== "") {
        editorRef.current.innerHTML = value
      }
    }
  }, [value])

  const execCommand = useCallback((command: string, val?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, val)
  }, [])

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }, [onChange])

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault()
      const text = e.clipboardData.getData("text/plain")
      document.execCommand("insertText", false, text)
      handleInput()
    },
    [handleInput]
  )

  const insertLink = useCallback(() => {
    const url = prompt("Entrez l'URL du lien :")
    if (url) {
      execCommand("createLink", url)
      handleInput()
    }
  }, [execCommand, handleInput])

  const insertImage = useCallback(() => {
    const url = prompt("Entrez l'URL de l'image :")
    if (url) {
      execCommand("insertImage", url)
      handleInput()
    }
  }, [execCommand, handleInput])

  return (
    <div className="overflow-hidden rounded-lg border border-input bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-input bg-muted/30 p-1.5">
        <ToolbarButton onClick={() => execCommand("undo")} icon={Undo} label="Annuler" />
        <ToolbarButton onClick={() => execCommand("redo")} icon={Redo} label="Refaire" />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolbarButton
          onClick={() => execCommand("formatBlock", "h1")}
          icon={Heading1}
          label="Titre 1"
        />
        <ToolbarButton
          onClick={() => execCommand("formatBlock", "h2")}
          icon={Heading2}
          label="Titre 2"
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolbarButton onClick={() => execCommand("bold")} icon={Bold} label="Gras" />
        <ToolbarButton onClick={() => execCommand("italic")} icon={Italic} label="Italique" />
        <ToolbarButton onClick={() => execCommand("underline")} icon={Underline} label="Souligne" />
        <ToolbarButton
          onClick={() => execCommand("strikeThrough")}
          icon={Strikethrough}
          label="Barre"
        />
        <ToolbarButton
          onClick={() => execCommand("formatBlock", "pre")}
          icon={Code}
          label="Code"
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolbarButton
          onClick={() => execCommand("justifyLeft")}
          icon={AlignLeft}
          label="Aligner a gauche"
        />
        <ToolbarButton
          onClick={() => execCommand("justifyCenter")}
          icon={AlignCenter}
          label="Centrer"
        />
        <ToolbarButton
          onClick={() => execCommand("justifyRight")}
          icon={AlignRight}
          label="Aligner a droite"
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolbarButton
          onClick={() => execCommand("insertUnorderedList")}
          icon={List}
          label="Liste a puces"
        />
        <ToolbarButton
          onClick={() => execCommand("insertOrderedList")}
          icon={ListOrdered}
          label="Liste numerotee"
        />
        <ToolbarButton
          onClick={() => execCommand("formatBlock", "blockquote")}
          icon={Quote}
          label="Citation"
        />
        <ToolbarButton
          onClick={() => execCommand("insertHorizontalRule")}
          icon={Minus}
          label="Ligne horizontale"
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolbarButton onClick={insertLink} icon={Link} label="Inserer un lien" />
        <ToolbarButton onClick={insertImage} icon={ImageIcon} label="Inserer une image" />
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="prose prose-sm max-w-none p-4 text-foreground focus:outline-none [&:empty]:before:pointer-events-none [&:empty]:before:text-muted-foreground [&:empty]:before:content-[attr(data-placeholder)] [&_a]:text-primary [&_blockquote]:border-l-primary [&_h1]:text-xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-semibold [&_img]:max-w-full [&_img]:rounded-md [&_pre]:rounded-md [&_pre]:bg-muted [&_pre]:p-3"
        style={{ minHeight, direction: "ltr", unicodeBidi: "plaintext", textAlign: "left" }}
        dir="ltr"
        onInput={handleInput}
        onPaste={handlePaste}
        data-placeholder={placeholder}
      />
    </div>
  )
}
