export type Locale = "fr" | "en"

export type UserRole = "visitor" | "redacteur" | "admin" | "superadmin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  phone?: string
  bio?: string
  createdAt: string
}

export interface Article {
  id: string
  title: string
  titleEn?: string
  slug: string
  excerpt: string
  excerptEn?: string
  content: string
  contentEn?: string
  image: string
  category: "activites" | "sensibilisation" | "celebration" | "portes-ouvertes"
  author: string
  publishedAt: string
  status: "published" | "draft"
}

export interface GalleryItem {
  id: string
  title: string
  titleEn?: string
  type: "photo" | "video"
  url: string
  thumbnail: string
  description: string
  descriptionEn?: string
  category: string
  createdAt: string
}

export interface Testimony {
  id: string
  name: string
  age?: number
  story: string
  storyEn?: string
  image?: string
  program: string
  year: string
  status: "published" | "draft"
}

export interface Partner {
  id: string
  name: string
  logo: string
  country: string
  website?: string
  description: string
  descriptionEn?: string
  type: "international" | "local"
}

export interface Report {
  id: string
  title: string
  titleEn?: string
  type: "annual" | "project" | "research" | "guide" | "book"
  year: string
  fileUrl: string
  fileName?: string
  fileSize?: string
  description: string
  descriptionEn?: string
  publishedAt: string
}

export interface Program {
  id: string
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  icon: string
  activities: { label: string; labelEn?: string }[]
}

export interface Center {
  id: string
  name: string
  nameEn?: string
  location: string
  description: string
  descriptionEn?: string
  image: string
}

export interface DashboardStats {
  totalChildren: number
  activePrograms: number
  totalPartners: number
  successRate: number
  childrenByYear: { year: string; count: number }[]
  programDistribution: { name: string; value: number }[]
  recentActivities: { id: string; action: string; date: string; user: string }[]
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface MessageReply {
  id: string
  content: string
  author: string
  createdAt: string
}

export interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
  replies: MessageReply[]
}

export interface Donation {
  id: string
  donorName: string
  donorEmail: string
  amount: number
  currency: "USD" | "CDF" | "EUR"
  method: "bank" | "mobile_money" | "online"
  reference: string
  date: string
  status: "completed" | "pending" | "failed"
  note?: string
}

export interface ChildRecord {
  id: string
  firstName: string
  lastName: string
  gender: "M" | "F"
  birthDate: string
  age: number
  photo?: string
  program: string
  center: string
  status: "active" | "reinserted" | "in_training" | "left"
  enrollmentDate: string
  exitDate?: string
  parentContact?: string
  notes: string
  history: ChildEvent[]
}

export interface ChildEvent {
  id: string
  date: string
  type: "enrollment" | "transfer" | "medical" | "education" | "family" | "note" | "exit"
  description: string
  author: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  type: "article" | "gallery" | "report"
  count: number
  createdAt: string
}

export interface UploadedFile {
  id: string
  name: string
  type: "image" | "document" | "video" | "other"
  mimeType: string
  size: string
  url: string
  uploadedBy: string
  uploadedAt: string
  folder: string
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  contactEmails: string[]
  contactPhones: string[]
  address: string
  socialLinks: {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
  }
  // Keep backward compat
  contactEmail: string
  contactPhone: string
}
