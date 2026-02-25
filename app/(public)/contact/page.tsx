"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Globe, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useI18n } from "@/lib/i18n"
import { mockSiteSettings } from "@/mocks/data"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caracteres"),
  email: z.string().email("Adresse email invalide"),
  subject: z.string().min(3, "Le sujet doit contenir au moins 3 caracteres"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caracteres"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
  const { t } = useI18n()
  const settings = mockSiteSettings
  const [sending, setSending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    setSending(true)
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSending(false)
    toast.success(t("contact.form.success"), {
      description: `${data.name}, votre message a ete envoye.`,
    })
    reset()
  }

  const contactInfo = [
    {
      icon: MapPin,
      label: t("contact.info.address"),
      value: settings.address,
    },
    {
      icon: Phone,
      label: t("contact.info.phone"),
      value: settings.contactPhone,
    },
    {
      icon: Mail,
      label: t("contact.info.email"),
      value: settings.contactEmail,
    },
    {
      icon: Globe,
      label: t("contact.info.website"),
      value: "www.pederdrc.org",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            {t("contact.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/70">
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Form */}
            <Card className="lg:col-span-3">
              <CardContent className="p-6 lg:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">{t("contact.form.name")}</Label>
                    <Input
                      id="name"
                      placeholder="Jean-Baptiste Mukwege"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">{t("contact.form.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@email.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="subject">{t("contact.form.subject")}</Label>
                    <Input
                      id="subject"
                      placeholder="Objet de votre message"
                      {...register("subject")}
                    />
                    {errors.subject && (
                      <p className="text-xs text-destructive">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="message">{t("contact.form.message")}</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Votre message..."
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={sending}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {sending
                      ? "Envoi en cours..."
                      : t("contact.form.send")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              {contactInfo.map((info) => (
                <Card key={info.label}>
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {info.label}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {info.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Map placeholder */}
              <Card className="overflow-hidden">
                <div className="flex h-48 items-center justify-center bg-primary/5">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <MapPin className="h-8 w-8" />
                    <span className="text-sm font-medium">Bukavu, Sud-Kivu, RDC</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
