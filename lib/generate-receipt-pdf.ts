import type { Donation } from "@/lib/types"
import jsPDF from "jspdf"

const methodLabels: Record<Donation["method"], string> = {
  bank: "Virement bancaire",
  mobile_money: "Mobile Money",
  online: "En ligne",
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(amount)
}

export function generateReceiptPDF(donation: Donation) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
  const pageW = doc.internal.pageSize.getWidth()

  const navy = [26, 39, 68] as const // #1a2744
  const gold = [200, 169, 78] as const // #c8a94e
  const gray = [100, 100, 100] as const
  const lightBg = [248, 247, 244] as const

  // ---- Header bar ----
  doc.setFillColor(...navy)
  doc.rect(0, 0, pageW, 36, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.setFont("helvetica", "bold")
  doc.text("PEDER", 20, 18)
  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
  doc.text("Programme d'Encadrement des Enfants de la Rue", 20, 25)
  doc.text("Bukavu, Republique Democratique du Congo", 20, 30)

  // Badge
  doc.setFillColor(...gold)
  doc.roundedRect(pageW - 60, 10, 44, 14, 3, 3, "F")
  doc.setTextColor(...navy)
  doc.setFontSize(9)
  doc.setFont("helvetica", "bold")
  doc.text("RECU OFFICIEL", pageW - 38, 19, { align: "center" })

  // ---- Title ----
  let y = 52
  doc.setTextColor(...navy)
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("Recu de don", pageW / 2, y, { align: "center" })
  y += 8
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...gray)
  doc.text(`Reference: ${donation.reference}`, pageW / 2, y, { align: "center" })

  // ---- Amount box ----
  y += 14
  doc.setFillColor(...navy)
  doc.roundedRect(20, y, pageW - 40, 30, 4, 4, "F")
  doc.setTextColor(180, 180, 180)
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.text("MONTANT DU DON", pageW / 2, y + 11, { align: "center" })
  doc.setTextColor(...gold)
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.text(formatAmount(donation.amount, donation.currency), pageW / 2, y + 24, { align: "center" })

  // ---- Info cards ----
  y += 42
  const cardW = (pageW - 50) / 2

  const drawCard = (x: number, cy: number, label: string, value: string) => {
    doc.setFillColor(...lightBg)
    doc.roundedRect(x, cy, cardW, 22, 3, 3, "F")
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...gray)
    doc.text(label.toUpperCase(), x + 6, cy + 8)
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...navy)
    doc.text(value, x + 6, cy + 17)
  }

  const formattedDate = new Date(donation.date).toLocaleDateString("fr-FR", {
    year: "numeric", month: "long", day: "numeric",
  })

  drawCard(20, y, "Donateur", donation.donorName)
  drawCard(25 + cardW, y, "Email", donation.donorEmail)
  y += 28
  drawCard(20, y, "Date", formattedDate)
  drawCard(25 + cardW, y, "Methode de paiement", methodLabels[donation.method])

  // ---- Note ----
  if (donation.note) {
    y += 30
    doc.setFillColor(...lightBg)
    doc.roundedRect(20, y, pageW - 40, 22, 3, 3, "F")
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...gray)
    doc.text("NOTE", 26, y + 8)
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...navy)
    doc.text(donation.note, 26, y + 17, { maxWidth: pageW - 52 })
  }

  // ---- Signature ----
  y += donation.note ? 36 : 38
  doc.setTextColor(...navy)
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("Pour le PEDER,", pageW - 70, y)
  y += 20
  doc.setDrawColor(...navy)
  doc.setLineWidth(0.3)
  doc.line(pageW - 70, y, pageW - 20, y)
  y += 6
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.text("Direction du PEDER", pageW - 70, y)

  // ---- Gold accent line ----
  const footerY = 272
  doc.setFillColor(...gold)
  doc.rect(20, footerY - 4, pageW - 40, 1, "F")

  // ---- Footer ----
  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...gray)
  doc.text("PEDER - B.P. 2525 Bukavu, RDC  |  pderbkv@gmail.com  |  +243 992 355 009", pageW / 2, footerY + 4, { align: "center" })
  doc.text("Ce document fait office de recu fiscal pour votre don.", pageW / 2, footerY + 10, { align: "center" })

  // ---- Download ----
  doc.save(`Recu-${donation.reference}.pdf`)
}
