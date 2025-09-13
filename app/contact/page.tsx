"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "Écrivez-nous à tout moment",
    contact: "contact@hydrate.fr",
    action: "mailto:contact@hydrate.fr",
  },
  {
    icon: Phone,
    title: "Téléphone",
    description: "Appelez-nous du lundi au vendredi",
    contact: "+33 1 23 45 67 89",
    action: "tel:+33123456789",
  },
  {
    icon: MessageCircle,
    title: "Chat en direct",
    description: "Support instantané en ligne",
    contact: "Disponible 9h-18h",
    action: "#",
  },
  {
    icon: MapPin,
    title: "Adresse",
    description: "Venez nous rendre visite",
    contact: "123 Rue de l'Innovation, 75001 Paris",
    action: "https://maps.google.com",
  },
]

const departments = [
  { value: "general", label: "Demande générale" },
  { value: "sales", label: "Ventes et produits" },
  { value: "support", label: "Support technique" },
  { value: "partnership", label: "Partenariats" },
  { value: "press", label: "Presse et médias" },
]

const faqs = [
  {
    question: "Quelle est la durée de garantie de vos produits ?",
    answer: "Tous nos produits HYDRATE bénéficient d'une garantie de 2 ans contre les défauts de fabrication.",
  },
  {
    question: "Livrez-vous dans toute l'Europe ?",
    answer:
      "Nous livrons actuellement en France, Belgique, Suisse et Luxembourg. L'expansion vers d'autres pays européens est prévue.",
  },
  {
    question: "Vos gourdes sont-elles compatibles avec le lave-vaisselle ?",
    answer:
      "La plupart de nos gourdes sont compatibles lave-vaisselle. Consultez les instructions spécifiques de chaque produit.",
  },
  {
    question: "Comment fonctionne la technologie connectée ?",
    answer:
      "Nos gourdes intelligentes se connectent via Bluetooth à notre application mobile pour suivre votre hydratation.",
  },
]

export default function ContactPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Redirect to home page with hash to scroll to contact section
    router.push("/#contact")
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      })
      setFormData({
        name: "",
        email: "",
        department: "",
        subject: "",
        message: "",
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#d03232] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white">Redirecting to contact section...</p>
      </div>
    </div>
  )
}
