import type { ChildRecord, ChildEvent } from "@/lib/types"
import jsPDF from "jspdf"

const eventLabels: Record<ChildEvent["type"], string> = {
  enrollment: "Admission",
  transfer: "Transfert",
  medical: "Medical",
  education: "Education",
  family: "Famille",
  note: "Note",
  exit: "Sortie",
}

const statusLabels: Record<ChildRecord["status"], string> = {
  active: "Actif",
  reinserted: "Reinsere",
  in_training: "En formation",
  left: "Sorti",
}

export function generateChildPDF(child: ChildRecord) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
  const pageW = doc.internal.pageSize.getWidth()

  const navy = [26, 39, 68] as const
  const gold = [200, 169, 78] as const
  const gray = [100, 100, 100] as const
  const lightBg = [248, 247, 244] as const
  const white = [255, 255, 255] as const

  // ---- Header bar ----
  doc.setFillColor(...navy)
  doc.rect(0, 0, pageW, 36, "F")
  doc.setTextColor(...white)
  doc.setFontSize(22)
  doc.setFont("helvetica", "bold")
  doc.text("PEDER", 20, 18)
  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
  doc.text("Programme d'Encadrement des Enfants de la Rue", 20, 25)
  doc.text("Bukavu, Republique Democratique du Congo", 20, 30)

  // Badge
  doc.setFillColor(...gold)
  doc.roundedRect(pageW - 65, 10, 50, 14, 3, 3, "F")
  doc.setTextColor(...navy)
  doc.setFontSize(9)
  doc.setFont("helvetica", "bold")
  doc.text("FICHE DE SUIVI", pageW - 40, 19, { align: "center" })

  // ---- Title ----
  let y = 48
  doc.setTextColor(...navy)
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text(`${child.firstName} ${child.lastName}`, pageW / 2, y, { align: "center" })
  y += 8
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...gray)
  doc.text(`Fiche generee le ${new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}`, pageW / 2, y, { align: "center" })

  // ---- Status badge ----
  y += 10
  doc.setFillColor(...gold)
  doc.roundedRect(pageW / 2 - 18, y - 4, 36, 10, 2, 2, "F")
  doc.setTextColor(...navy)
  doc.setFontSize(9)
  doc.setFont("helvetica", "bold")
  doc.text(statusLabels[child.status], pageW / 2, y + 3, { align: "center" })

  // ---- Info cards ----
  y += 16
  const colW = (pageW - 50) / 2

  const drawInfoCard = (x: number, cy: number, label: string, value: string) => {
    doc.setFillColor(...lightBg)
    doc.roundedRect(x, cy, colW, 20, 3, 3, "F")
    doc.setFontSize(7)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...gray)
    doc.text(label.toUpperCase(), x + 6, cy + 7)
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...navy)
    doc.text(value || "N/A", x + 6, cy + 15, { maxWidth: colW - 12 })
  }

  const birthDate = new Date(child.birthDate).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })
  const enrollDate = new Date(child.enrollmentDate).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })

  drawInfoCard(20, y, "Genre", child.gender === "M" ? "Garcon" : "Fille")
  drawInfoCard(25 + colW, y, "Age", `${child.age} ans`)
  y += 24
  drawInfoCard(20, y, "Date de naissance", birthDate)
  drawInfoCard(25 + colW, y, "Contact parent", child.parentContact || "Non renseigne")
  y += 24
  drawInfoCard(20, y, "Programme", child.program)
  drawInfoCard(25 + colW, y, "Centre", child.center)
  y += 24
  drawInfoCard(20, y, "Date d'inscription", enrollDate)
  drawInfoCard(25 + colW, y, "Date de sortie", child.exitDate ? new Date(child.exitDate).toLocaleDateString("fr-FR") : "Toujours inscrit")

  // ---- Notes ----
  if (child.notes) {
    y += 28
    doc.setFillColor(...lightBg)
    doc.roundedRect(20, y, pageW - 40, 18, 3, 3, "F")
    doc.setFontSize(7)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...gray)
    doc.text("NOTES", 26, y + 7)
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...navy)
    doc.text(child.notes, 26, y + 14, { maxWidth: pageW - 52 })
    y += 22
  } else {
    y += 28
  }

  // ---- Historique section ----
  y += 4
  doc.setFillColor(...navy)
  doc.roundedRect(20, y, pageW - 40, 10, 3, 3, "F")
  doc.setTextColor(...white)
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.text(`HISTORIQUE DE SUIVI (${child.history.length} evenements)`, pageW / 2, y + 7, { align: "center" })
  y += 16

  // Sort events newest first
  const sorted = [...child.history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  sorted.forEach((event) => {
    // Check page break
    if (y > 260) {
      doc.addPage()
      y = 20
    }

    const eventDate = new Date(event.date).toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "numeric" })

    // Timeline dot
    doc.setFillColor(...gold)
    doc.circle(28, y + 2, 2, "F")

    // Event type badge
    doc.setFillColor(...lightBg)
    doc.roundedRect(34, y - 2, 22, 8, 2, 2, "F")
    doc.setFontSize(7)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...navy)
    doc.text(eventLabels[event.type], 45, y + 3, { align: "center" })

    // Date
    doc.setFontSize(7)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...gray)
    doc.text(eventDate, 60, y + 3)

    // Description
    y += 9
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...navy)
    const lines = doc.splitTextToSize(event.description, pageW - 70)
    doc.text(lines, 34, y)
    y += lines.length * 4.5

    // Author
    doc.setFontSize(7)
    doc.setTextColor(...gray)
    doc.text(`Par ${event.author}`, 34, y + 2)
    y += 10
  })

  // ---- Gold accent line ----
  const footerY = 272
  doc.setFillColor(...gold)
  doc.rect(20, footerY - 4, pageW - 40, 1, "F")

  // ---- Footer ----
  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...gray)
  doc.text("PEDER - B.P. 2525 Bukavu, RDC  |  pderbkv@gmail.com  |  +243 992 355 009", pageW / 2, footerY + 4, { align: "center" })
  doc.text("Document confidentiel - A usage interne uniquement", pageW / 2, footerY + 10, { align: "center" })

  doc.save(`Fiche-${child.firstName}-${child.lastName}.pdf`)
}

export function generateChildrenListPDF(children: ChildRecord[]) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()

  const navy = [26, 39, 68] as const
  const gold = [200, 169, 78] as const
  const gray = [100, 100, 100] as const
  const lightBg = [248, 247, 244] as const
  const white = [255, 255, 255] as const

  // Header
  doc.setFillColor(...navy)
  doc.rect(0, 0, pageW, 28, "F")
  doc.setTextColor(...white)
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("PEDER", 15, 14)
  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
  doc.text("Programme d'Encadrement des Enfants de la Rue", 15, 22)

  // Badge
  doc.setFillColor(...gold)
  doc.roundedRect(pageW - 80, 7, 66, 14, 3, 3, "F")
  doc.setTextColor(...navy)
  doc.setFontSize(9)
  doc.setFont("helvetica", "bold")
  doc.text("LISTE DES ENFANTS", pageW - 47, 16, { align: "center" })

  // Stats summary
  let y = 36
  const active = children.filter((c) => c.status === "active").length
  const training = children.filter((c) => c.status === "in_training").length
  const reinserted = children.filter((c) => c.status === "reinserted").length
  const boys = children.filter((c) => c.gender === "M").length
  const girls = children.filter((c) => c.gender === "F").length

  doc.setTextColor(...navy)
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.text(`Total: ${children.length} enfants  |  ${boys} garcons, ${girls} filles  |  Actifs: ${active}  |  En formation: ${training}  |  Reinseres: ${reinserted}  |  Genere le ${new Date().toLocaleDateString("fr-FR")}`, pageW / 2, y, { align: "center" })

  // Table header
  y += 10
  const cols = [15, 60, 30, 50, 50, 45, 30]
  const headers = ["#", "Nom complet", "Genre/Age", "Programme", "Centre", "Inscription", "Statut"]

  doc.setFillColor(...navy)
  doc.rect(10, y, pageW - 20, 10, "F")
  doc.setTextColor(...white)
  doc.setFontSize(8)
  doc.setFont("helvetica", "bold")

  let xOff = 14
  headers.forEach((h, i) => {
    doc.text(h, xOff, y + 7)
    xOff += cols[i]
  })

  y += 12

  // Table rows
  children.forEach((child, idx) => {
    if (y > pageH - 20) {
      doc.addPage()
      y = 15
      // Repeat header
      doc.setFillColor(...navy)
      doc.rect(10, y, pageW - 20, 10, "F")
      doc.setTextColor(...white)
      doc.setFontSize(8)
      doc.setFont("helvetica", "bold")
      let rx = 14
      headers.forEach((h, i) => {
        doc.text(h, rx, y + 7)
        rx += cols[i]
      })
      y += 12
    }

    // Alternating row bg
    if (idx % 2 === 0) {
      doc.setFillColor(...lightBg)
      doc.rect(10, y - 2, pageW - 20, 9, "F")
    }

    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...navy)

    let rx = 14
    doc.text(`${idx + 1}`, rx, y + 4); rx += cols[0]
    doc.setFont("helvetica", "bold")
    doc.text(`${child.firstName} ${child.lastName}`, rx, y + 4); rx += cols[1]
    doc.setFont("helvetica", "normal")
    doc.text(`${child.gender === "M" ? "M" : "F"}, ${child.age} ans`, rx, y + 4); rx += cols[2]
    doc.text(child.program, rx, y + 4, { maxWidth: cols[3] - 4 }); rx += cols[3]
    doc.text(child.center, rx, y + 4); rx += cols[4]
    doc.text(new Date(child.enrollmentDate).toLocaleDateString("fr-FR"), rx, y + 4); rx += cols[5]
    doc.text(statusLabels[child.status], rx, y + 4)

    y += 9
  })

  // Footer
  const fy = pageH - 10
  doc.setFillColor(...gold)
  doc.rect(10, fy - 6, pageW - 20, 0.5, "F")
  doc.setFontSize(7)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...gray)
  doc.text("PEDER - B.P. 2525 Bukavu, RDC  |  Document confidentiel", pageW / 2, fy, { align: "center" })

  doc.save(`Liste-Enfants-PEDER-${new Date().toISOString().split("T")[0]}.pdf`)
}
