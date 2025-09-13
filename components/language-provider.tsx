"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "fr" | "en" | "es" | "de"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.tools": "Outils",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.blog": "Blog",
    "nav.login": "Connexion",
    "nav.signup": "Inscription",
    "nav.logout": "Déconnexion",
    "nav.dashboard": "Tableau de bord",

    // Homepage
    "home.hero.title": "Outils d'édition d'images alimentés par l'IA",
    "home.hero.subtitle":
      "Transformez vos images avec nos outils d'IA avancés. Supprimez les arrière-plans, compressez les fichiers, redimensionnez les images et bien plus encore.",
    "home.hero.cta": "Commencer gratuitement",
    "home.hero.secondary": "Voir les outils",

    // Tools
    "tools.background_removal": "Suppression d'arrière-plan",
    "tools.background_removal.desc": "Supprimez automatiquement l'arrière-plan de vos images",
    "tools.image_compressor": "Compresseur d'images",
    "tools.image_compressor.desc": "Réduisez la taille de vos images sans perdre en qualité",
    "tools.image_resizer": "Redimensionneur d'images",
    "tools.image_resizer.desc": "Redimensionnez vos images aux dimensions parfaites",
    "tools.format_converter": "Convertisseur de format",
    "tools.format_converter.desc": "Convertissez vos images entre différents formats",
    "tools.video_compressor": "Compresseur vidéo",
    "tools.video_compressor.desc": "Compressez vos vidéos pour économiser de l'espace",
    "tools.watermark_remover": "Suppression de filigrane",
    "tools.watermark_remover.desc": "Supprimez les filigranes de vos images",

    // Common
    "common.upload": "Télécharger",
    "common.download": "Télécharger",
    "common.processing": "Traitement en cours...",
    "common.error": "Une erreur s'est produite",
    "common.success": "Succès !",
    "common.file_too_large": "Fichier trop volumineux",
    "common.invalid_format": "Format non supporté",

    // Upload
    "upload.drag_drop": "Glissez-déposez vos fichiers ici ou cliquez pour sélectionner",
    "upload.select_files": "Sélectionner des fichiers",
    "upload.max_size": "Taille maximale : 10MB",

    // Footer
    "footer.company": "Pixel",
    "footer.description": "Outils d'édition d'images alimentés par l'IA",
    "footer.rights": "Tous droits réservés.",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.tools": "Tools",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.blog": "Blog",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.logout": "Logout",
    "nav.dashboard": "Dashboard",

    // Homepage
    "home.hero.title": "AI-Powered Image Editing Tools",
    "home.hero.subtitle":
      "Transform your images with our advanced AI tools. Remove backgrounds, compress files, resize images, and much more.",
    "home.hero.cta": "Get Started Free",
    "home.hero.secondary": "View Tools",

    // Tools
    "tools.background_removal": "Background Removal",
    "tools.background_removal.desc": "Automatically remove backgrounds from your images",
    "tools.image_compressor": "Image Compressor",
    "tools.image_compressor.desc": "Reduce image file sizes without losing quality",
    "tools.image_resizer": "Image Resizer",
    "tools.image_resizer.desc": "Resize your images to perfect dimensions",
    "tools.format_converter": "Format Converter",
    "tools.format_converter.desc": "Convert your images between different formats",
    "tools.video_compressor": "Video Compressor",
    "tools.video_compressor.desc": "Compress your videos to save space",
    "tools.watermark_remover": "Watermark Remover",
    "tools.watermark_remover.desc": "Remove watermarks from your images",

    // Common
    "common.upload": "Upload",
    "common.download": "Download",
    "common.processing": "Processing...",
    "common.error": "An error occurred",
    "common.success": "Success!",
    "common.file_too_large": "File too large",
    "common.invalid_format": "Unsupported format",

    // Upload
    "upload.drag_drop": "Drag and drop your files here or click to select",
    "upload.select_files": "Select Files",
    "upload.max_size": "Max size: 10MB",

    // Footer
    "footer.company": "Pixel",
    "footer.description": "AI-powered image editing tools",
    "footer.rights": "All rights reserved.",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.tools": "Herramientas",
    "nav.about": "Acerca de",
    "nav.contact": "Contacto",
    "nav.blog": "Blog",
    "nav.login": "Iniciar sesión",
    "nav.signup": "Registrarse",
    "nav.logout": "Cerrar sesión",
    "nav.dashboard": "Panel",

    // Homepage
    "home.hero.title": "Herramientas de Edición de Imágenes con IA",
    "home.hero.subtitle":
      "Transforma tus imágenes con nuestras herramientas avanzadas de IA. Elimina fondos, comprime archivos, redimensiona imágenes y mucho más.",
    "home.hero.cta": "Comenzar Gratis",
    "home.hero.secondary": "Ver Herramientas",

    // Tools
    "tools.background_removal": "Eliminación de Fondo",
    "tools.background_removal.desc": "Elimina automáticamente los fondos de tus imágenes",
    "tools.image_compressor": "Compresor de Imágenes",
    "tools.image_compressor.desc": "Reduce el tamaño de tus imágenes sin perder calidad",
    "tools.image_resizer": "Redimensionador de Imágenes",
    "tools.image_resizer.desc": "Redimensiona tus imágenes a las dimensiones perfectas",
    "tools.format_converter": "Convertidor de Formato",
    "tools.format_converter.desc": "Convierte tus imágenes entre diferentes formatos",
    "tools.video_compressor": "Compresor de Video",
    "tools.video_compressor.desc": "Comprime tus videos para ahorrar espacio",
    "tools.watermark_remover": "Eliminador de Marca de Agua",
    "tools.watermark_remover.desc": "Elimina marcas de agua de tus imágenes",

    // Common
    "common.upload": "Subir",
    "common.download": "Descargar",
    "common.processing": "Procesando...",
    "common.error": "Ocurrió un error",
    "common.success": "¡Éxito!",
    "common.file_too_large": "Archivo demasiado grande",
    "common.invalid_format": "Formato no soportado",

    // Upload
    "upload.drag_drop": "Arrastra y suelta tus archivos aquí o haz clic para seleccionar",
    "upload.select_files": "Seleccionar Archivos",
    "upload.max_size": "Tamaño máximo: 10MB",

    // Footer
    "footer.company": "Pixel",
    "footer.description": "Herramientas de edición de imágenes con IA",
    "footer.rights": "Todos los derechos reservados.",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.tools": "Werkzeuge",
    "nav.about": "Über uns",
    "nav.contact": "Kontakt",
    "nav.blog": "Blog",
    "nav.login": "Anmelden",
    "nav.signup": "Registrieren",
    "nav.logout": "Abmelden",
    "nav.dashboard": "Dashboard",

    // Homepage
    "home.hero.title": "KI-gestützte Bildbearbeitungstools",
    "home.hero.subtitle":
      "Verwandeln Sie Ihre Bilder mit unseren fortschrittlichen KI-Tools. Entfernen Sie Hintergründe, komprimieren Sie Dateien, ändern Sie die Bildgröße und vieles mehr.",
    "home.hero.cta": "Kostenlos Starten",
    "home.hero.secondary": "Tools Anzeigen",

    // Tools
    "tools.background_removal": "Hintergrund Entfernen",
    "tools.background_removal.desc": "Entfernen Sie automatisch Hintergründe von Ihren Bildern",
    "tools.image_compressor": "Bildkompressor",
    "tools.image_compressor.desc": "Reduzieren Sie Bilddateigrößen ohne Qualitätsverlust",
    "tools.image_resizer": "Bildgrößenänderung",
    "tools.image_resizer.desc": "Ändern Sie die Größe Ihrer Bilder auf perfekte Abmessungen",
    "tools.format_converter": "Format-Konverter",
    "tools.format_converter.desc": "Konvertieren Sie Ihre Bilder zwischen verschiedenen Formaten",
    "tools.video_compressor": "Video-Kompressor",
    "tools.video_compressor.desc": "Komprimieren Sie Ihre Videos, um Speicherplatz zu sparen",
    "tools.watermark_remover": "Wasserzeichen Entferner",
    "tools.watermark_remover.desc": "Entfernen Sie Wasserzeichen von Ihren Bildern",

    // Common
    "common.upload": "Hochladen",
    "common.download": "Herunterladen",
    "common.processing": "Verarbeitung...",
    "common.error": "Ein Fehler ist aufgetreten",
    "common.success": "Erfolg!",
    "common.file_too_large": "Datei zu groß",
    "common.invalid_format": "Nicht unterstütztes Format",

    // Upload
    "upload.drag_drop": "Ziehen Sie Ihre Dateien hierher oder klicken Sie zum Auswählen",
    "upload.select_files": "Dateien Auswählen",
    "upload.max_size": "Max. Größe: 10MB",

    // Footer
    "footer.company": "Pixel",
    "footer.description": "KI-gestützte Bildbearbeitungstools",
    "footer.rights": "Alle Rechte vorbehalten.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && ["fr", "en", "es", "de"].includes(saved)) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
