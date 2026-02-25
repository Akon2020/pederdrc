"use client"

import { useState } from "react"
import {
  Plus, Search, Eye, Download, Trash2, Calendar, DollarSign,
  CheckCircle, Clock, AlertCircle, HandCoins, CreditCard, Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { mockDonations } from "@/mocks/data"
import type { Donation } from "@/lib/types"
import { generateReceiptPDF } from "@/lib/generate-receipt-pdf"
import { toast } from "sonner"

const methodLabels: Record<Donation["method"], string> = { bank: "Virement bancaire", mobile_money: "Mobile Money", online: "En ligne" }
const statusConfig: Record<Donation["status"], { label: string; variant: "default" | "secondary" | "destructive" }> = {
  completed: { label: "Complete", variant: "default" },
  pending: { label: "En attente", variant: "secondary" },
  failed: { label: "Echoue", variant: "destructive" },
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(amount)
}

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>(mockDonations)
  const [search, setSearch] = useState("")
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selected, setSelected] = useState<Donation | null>(null)

  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formAmount, setFormAmount] = useState("")
  const [formCurrency, setFormCurrency] = useState<Donation["currency"]>("USD")
  const [formMethod, setFormMethod] = useState<Donation["method"]>("bank")
  const [formNote, setFormNote] = useState("")

  const filtered = donations.filter((d) =>
    d.donorName.toLowerCase().includes(search.toLowerCase()) || d.reference.toLowerCase().includes(search.toLowerCase())
  )

  const totalUSD = donations.filter((d) => d.currency === "USD" && d.status === "completed").reduce((s, d) => s + d.amount, 0)
  const totalEUR = donations.filter((d) => d.currency === "EUR" && d.status === "completed").reduce((s, d) => s + d.amount, 0)
  const completed = donations.filter((d) => d.status === "completed").length
  const pending = donations.filter((d) => d.status === "pending").length

  const handleCreate = () => {
    if (!formName.trim() || !formAmount.trim()) { toast.error("Nom et montant requis"); return }
    const newDon: Donation = {
      id: String(donations.length + 1),
      donorName: formName,
      donorEmail: formEmail,
      amount: parseFloat(formAmount),
      currency: formCurrency,
      method: formMethod,
      reference: `DON-${new Date().getFullYear()}-${String(donations.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
      status: "completed",
      note: formNote,
    }
    setDonations([newDon, ...donations])
    setCreateDialogOpen(false)
    toast.success("Don enregistre", { description: `Don de ${formatAmount(newDon.amount, newDon.currency)} enregistre.` })
    setFormName(""); setFormEmail(""); setFormAmount(""); setFormNote("")
  }

  const handleDelete = () => {
    if (selected) {
      setDonations(donations.filter((d) => d.id !== selected.id))
      toast.success("Don supprime")
    }
    setDeleteDialogOpen(false)
    setSelected(null)
  }

  const handleDownloadReceipt = (donation: Donation) => {
    try {
      generateReceiptPDF(donation)
      toast.success("PDF telecharge", { description: `Recu ${donation.reference} telecharge.` })
    } catch {
      toast.error("Erreur lors de la generation du PDF")
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total dons</CardTitle><HandCoins className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{donations.length}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total USD</CardTitle><DollarSign className="h-4 w-4 text-emerald-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{formatAmount(totalUSD, "USD")}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total EUR</CardTitle><DollarSign className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">{formatAmount(totalEUR, "EUR")}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">En attente</CardTitle><Clock className="h-4 w-4 text-amber-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{pending}</div></CardContent></Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 sm:w-80" /></div>
        <Button onClick={() => setCreateDialogOpen(true)} className="gap-2"><Plus className="h-4 w-4" />Enregistrer un don</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Donateur</TableHead><TableHead>Montant</TableHead><TableHead className="hidden md:table-cell">Methode</TableHead><TableHead className="hidden lg:table-cell">Reference</TableHead><TableHead className="hidden lg:table-cell">Date</TableHead><TableHead>Statut</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="py-10 text-center"><div className="flex flex-col items-center gap-2"><HandCoins className="h-8 w-8 text-muted-foreground" /><span className="text-sm text-muted-foreground">Aucun don trouve</span></div></TableCell></TableRow>
              ) : filtered.map((d) => (
                <TableRow key={d.id}>
                  <TableCell><div className="flex flex-col"><span className="text-sm font-medium">{d.donorName}</span><span className="text-xs text-muted-foreground">{d.donorEmail}</span></div></TableCell>
                  <TableCell><span className="text-sm font-semibold">{formatAmount(d.amount, d.currency)}</span></TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="gap-1 text-xs">
                      {d.method === "bank" ? <CreditCard className="h-3 w-3" /> : d.method === "mobile_money" ? <Smartphone className="h-3 w-3" /> : <DollarSign className="h-3 w-3" />}
                      {methodLabels[d.method]}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell"><span className="text-xs font-mono text-muted-foreground">{d.reference}</span></TableCell>
                  <TableCell className="hidden lg:table-cell"><span className="flex items-center gap-1 text-sm text-muted-foreground"><Calendar className="h-3 w-3" />{new Date(d.date).toLocaleDateString("fr-FR")}</span></TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[d.status].variant} className="gap-1 text-xs">
                      {d.status === "completed" ? <CheckCircle className="h-3 w-3" /> : d.status === "pending" ? <Clock className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                      {statusConfig[d.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => { setSelected(d); setViewDialogOpen(true) }}><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDownloadReceipt(d)} title="Telecharger le recu"><Download className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => { setSelected(d); setDeleteDialogOpen(true) }} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Details du don</DialogTitle><DialogDescription>Reference: {selected?.reference}</DialogDescription></DialogHeader>
          {selected && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1"><span className="text-xs text-muted-foreground">Donateur</span><span className="text-sm font-medium">{selected.donorName}</span></div>
                <div className="flex flex-col gap-1"><span className="text-xs text-muted-foreground">Email</span><span className="text-sm">{selected.donorEmail}</span></div>
                <div className="flex flex-col gap-1"><span className="text-xs text-muted-foreground">Montant</span><span className="text-lg font-bold text-primary">{formatAmount(selected.amount, selected.currency)}</span></div>
                <div className="flex flex-col gap-1"><span className="text-xs text-muted-foreground">Methode</span><span className="text-sm">{methodLabels[selected.method]}</span></div>
                <div className="flex flex-col gap-1"><span className="text-xs text-muted-foreground">Date</span><span className="text-sm">{new Date(selected.date).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span></div>
                <div className="flex flex-col gap-1"><span className="text-xs text-muted-foreground">Statut</span><Badge variant={statusConfig[selected.status].variant}>{statusConfig[selected.status].label}</Badge></div>
              </div>
              {selected.note && (<div className="flex flex-col gap-1"><span className="text-xs text-muted-foreground">Note</span><p className="text-sm leading-relaxed">{selected.note}</p></div>)}
              <Separator />
              <Button onClick={() => handleDownloadReceipt(selected)} className="gap-2"><Download className="h-4 w-4" />Telecharger le recu PDF</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Enregistrer un don</DialogTitle><DialogDescription>Saisissez les informations du don recu.</DialogDescription></DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2"><Label>Nom du donateur *</Label><Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Nom complet" /></div>
            <div className="flex flex-col gap-2"><Label>Email</Label><Input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="email@exemple.com" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2"><Label>Montant *</Label><Input type="number" value={formAmount} onChange={(e) => setFormAmount(e.target.value)} placeholder="1000" /></div>
              <div className="flex flex-col gap-2"><Label>Devise</Label><Select value={formCurrency} onValueChange={(v) => setFormCurrency(v as Donation["currency"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="USD">USD</SelectItem><SelectItem value="EUR">EUR</SelectItem><SelectItem value="CDF">CDF</SelectItem></SelectContent></Select></div>
            </div>
            <div className="flex flex-col gap-2"><Label>Methode</Label><Select value={formMethod} onValueChange={(v) => setFormMethod(v as Donation["method"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="bank">Virement bancaire</SelectItem><SelectItem value="mobile_money">Mobile Money</SelectItem><SelectItem value="online">En ligne</SelectItem></SelectContent></Select></div>
            <div className="flex flex-col gap-2"><Label>Note</Label><Textarea value={formNote} onChange={(e) => setFormNote(e.target.value)} placeholder="Note optionnelle..." rows={2} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setCreateDialogOpen(false)}>Annuler</Button><Button onClick={handleCreate}>Enregistrer</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} title="Supprimer le don" description={`Supprimer le don de "${selected?.donorName}" ?`} confirmLabel="Supprimer" onConfirm={handleDelete} />
    </div>
  )
}
