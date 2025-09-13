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
    "nav.profile": "Profil",
    "nav.settings": "Paramètres",

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
    "common.loading": "Chargement...",
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",

    // Upload
    "upload.drag_drop": "Glissez-déposez vos fichiers ici ou cliquez pour sélectionner",
    "upload.select_files": "Sélectionner des fichiers",
    "upload.max_size": "Taille maximale : 10MB",

    // Contact
    "contact.title": "Contactez-nous",
    "contact.subtitle": "Nous sommes là pour vous aider",
    "contact.name": "Nom",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Envoyer le message",
    "contact.success": "Message envoyé avec succès !",
    "contact.error": "Erreur lors de l'envoi du message",

    // About
    "about.title": "À propos de Pixel",
    "about.subtitle": "Notre mission est de rendre l'édition d'images accessible à tous",
    "about.description":
      "Pixel est une plateforme d'édition d'images alimentée par l'IA qui permet à chacun de créer des visuels professionnels sans compétences techniques.",

    // Auth
    "auth.login.title": "Connexion",
    "auth.login.subtitle": "Connectez-vous à votre compte",
    "auth.signup.title": "Inscription",
    "auth.signup.subtitle": "Créez votre compte gratuit",
    "auth.email": "Adresse email",
    "auth.password": "Mot de passe",
    "auth.confirm_password": "Confirmer le mot de passe",
    "auth.forgot_password": "Mot de passe oublié ?",
    "auth.no_account": "Pas de compte ?",
    "auth.have_account": "Déjà un compte ?",

    // Newsletter
    "newsletter.title": "Restez informé",
    "newsletter.subtitle": "Recevez les dernières nouvelles et mises à jour",
    "newsletter.placeholder": "Votre adresse email",
    "newsletter.subscribe": "S'abonner",
    "newsletter.success": "Inscription réussie !",

    // Footer
    "footer.company": "Pixel",
    "footer.description": "Outils d'édition d'images alimentés par l'IA",
    "footer.rights": "Tous droits réservés.",
    "footer.made_by": "par Come & Click",
    "footer.privacy": "Confidentialité",
    "footer.terms": "Conditions",
    "footer.cookies": "Cookies",

    // Legal
    "legal.privacy.title": "Politique de confidentialité",
    "legal.terms.title": "Conditions d'utilisation",
    "legal.cookies.title": "Politique des cookies",

    // Features
    "features.fast_processing": "Traitement Rapide",
    "features.fast_processing.desc": "Traitement IA ultra-rapide pour tous vos besoins d'édition d'images",
    "features.secure_private": "Sécurisé et Privé",
    "features.secure_private.desc": "Vos fichiers sont traités en toute sécurité et jamais stockés sur nos serveurs",
    "features.easy_to_use": "Facile à Utiliser",
    "features.easy_to_use.desc": "Interface simple par glisser-déposer que tout le monde peut utiliser",
    "features.why_choose_pixel": "Pourquoi Choisir Pixel ?",
    "features.why_choose_pixel.desc":
      "Outils de qualité professionnelle avec sécurité d'entreprise et simplicité grand public",

    // CTA Section
    "home.cta.title": "Prêt à transformer vos images ?",
    "home.cta.subtitle":
      "Rejoignez des milliers d'utilisateurs qui font confiance à Pixel pour leurs besoins d'édition d'images",
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
    "nav.profile": "Profile",
    "nav.settings": "Settings",

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
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",

    // Upload
    "upload.drag_drop": "Drag and drop your files here or click to select",
    "upload.select_files": "Select Files",
    "upload.max_size": "Max size: 10MB",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "We're here to help",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.success": "Message sent successfully!",
    "contact.error": "Error sending message",

    // About
    "about.title": "About Pixel",
    "about.subtitle": "Our mission is to make image editing accessible to everyone",
    "about.description":
      "Pixel is an AI-powered image editing platform that enables anyone to create professional visuals without technical skills.",

    // Auth
    "auth.login.title": "Login",
    "auth.login.subtitle": "Sign in to your account",
    "auth.signup.title": "Sign Up",
    "auth.signup.subtitle": "Create your free account",
    "auth.email": "Email address",
    "auth.password": "Password",
    "auth.confirm_password": "Confirm password",
    "auth.forgot_password": "Forgot password?",
    "auth.no_account": "Don't have an account?",
    "auth.have_account": "Already have an account?",

    // Newsletter
    "newsletter.title": "Stay Updated",
    "newsletter.subtitle": "Get the latest news and updates",
    "newsletter.placeholder": "Your email address",
    "newsletter.subscribe": "Subscribe",
    "newsletter.success": "Successfully subscribed!",

    // Footer
    "footer.company": "Pixel",
    "footer.description": "AI-powered image editing tools",
    "footer.rights": "All rights reserved.",
    "footer.made_by": "by Come & Click",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.cookies": "Cookies",

    // Legal
    "legal.privacy.title": "Privacy Policy",
    "legal.terms.title": "Terms of Service",
    "legal.cookies.title": "Cookie Policy",

    // Features
    "features.fast_processing": "Fast Processing",
    "features.fast_processing.desc": "Ultra-fast AI processing for all your image editing needs",
    "features.secure_private": "Secure & Private",
    "features.secure_private.desc": "Your files are processed securely and never stored on our servers",
    "features.easy_to_use": "Easy to Use",
    "features.easy_to_use.desc": "Simple drag-and-drop interface that anyone can use",
    "features.why_choose_pixel": "Why Choose Pixel?",
    "features.why_choose_pixel.desc": "Professional-grade tools with enterprise security and consumer simplicity",

    // CTA Section
    "home.cta.title": "Ready to transform your images?",
    "home.cta.subtitle": "Join thousands of users who trust Pixel for their image editing needs",
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
    "nav.profile": "Perfil",
    "nav.settings": "Configuración",

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
    "common.loading": "Cargando...",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",

    // Upload
    "upload.drag_drop": "Arrastra y suelta tus archivos aquí o haz clic para seleccionar",
    "upload.select_files": "Seleccionar Archivos",
    "upload.max_size": "Tamaño máximo: 10MB",

    // Contact
    "contact.title": "Contáctanos",
    "contact.subtitle": "Estamos aquí para ayudar",
    "contact.name": "Nombre",
    "contact.email": "Email",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.success": "¡Mensaje enviado exitosamente!",
    "contact.error": "Error al enviar mensaje",

    // About
    "about.title": "Acerca de Pixel",
    "about.subtitle": "Nuestra misión es hacer la edición de imágenes accesible para todos",
    "about.description":
      "Pixel es una plataforma de edición de imágenes con IA que permite a cualquiera crear visuales profesionales sin habilidades técnicas.",

    // Auth
    "auth.login.title": "Iniciar Sesión",
    "auth.login.subtitle": "Inicia sesión en tu cuenta",
    "auth.signup.title": "Registrarse",
    "auth.signup.subtitle": "Crea tu cuenta gratuita",
    "auth.email": "Dirección de email",
    "auth.password": "Contraseña",
    "auth.confirm_password": "Confirmar contraseña",
    "auth.forgot_password": "¿Olvidaste tu contraseña?",
    "auth.no_account": "¿No tienes cuenta?",
    "auth.have_account": "¿Ya tienes cuenta?",

    // Newsletter
    "newsletter.title": "Mantente Actualizado",
    "newsletter.subtitle": "Recibe las últimas noticias y actualizaciones",
    "newsletter.placeholder": "Tu dirección de email",
    "newsletter.subscribe": "Suscribirse",
    "newsletter.success": "¡Suscripción exitosa!",

    // Footer
    "footer.company": "Pixel",
    "footer.description": "Herramientas de edición de imágenes con IA",
    "footer.rights": "Todos los derechos reservados.",
    "footer.made_by": "por Come & Click",
    "footer.privacy": "Privacidad",
    "footer.terms": "Términos",
    "footer.cookies": "Cookies",

    // Legal
    "legal.privacy.title": "Política de Privacidad",
    "legal.terms.title": "Términos de Servicio",
    "legal.cookies.title": "Política de Cookies",

    // Features
    "features.fast_processing": "Procesamiento Rápido",
    "features.fast_processing.desc":
      "Procesamiento de IA ultra-rápido para todas sus necesidades de edición de imágenes",
    "features.secure_private": "Seguro y Privado",
    "features.secure_private.desc":
      "Sus archivos se procesan de forma segura y nunca se almacenan en nuestros servidores",
    "features.easy_to_use": "Fácil de Usar",
    "features.easy_to_use.desc": "Interfaz simple de arrastrar y soltar que cualquiera puede usar",
    "features.why_choose_pixel": "¿Por qué Elegir Pixel?",
    "features.why_choose_pixel.desc":
      "Herramientas de calidad profesional con seguridad empresarial y simplicidad para el consumidor",

    // CTA Section
    "home.cta.title": "¿Listo para transformar tus imágenes?",
    "home.cta.subtitle": "Únete a miles de usuarios que confían en Pixel para sus necesidades de edición de imágenes",
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
    "nav.profile": "Profil",
    "nav.settings": "Einstellungen",

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
    "common.loading": "Laden...",
    "common.save": "Speichern",
    "common.cancel": "Abbrechen",
    "common.delete": "Löschen",
    "common.edit": "Bearbeiten",

    // Upload
    "upload.drag_drop": "Ziehen Sie Ihre Dateien hierher oder klicken Sie zum Auswählen",
    "upload.select_files": "Dateien Auswählen",
    "upload.max_size": "Max. Größe: 10MB",

    // Contact
    "contact.title": "Kontaktieren Sie uns",
    "contact.subtitle": "Wir sind hier, um zu helfen",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Nachricht",
    "contact.send": "Nachricht senden",
    "contact.success": "Nachricht erfolgreich gesendet!",
    "contact.error": "Fehler beim Senden der Nachricht",

    // About
    "about.title": "Über Pixel",
    "about.subtitle": "Unsere Mission ist es, Bildbearbeitung für alle zugänglich zu machen",
    "about.description":
      "Pixel ist eine KI-gestützte Bildbearbeitungsplattform, die es jedem ermöglicht, professionelle Visuals ohne technische Fähigkeiten zu erstellen.",

    // Auth
    "auth.login.title": "Anmelden",
    "auth.login.subtitle": "Melden Sie sich in Ihrem Konto an",
    "auth.signup.title": "Registrieren",
    "auth.signup.subtitle": "Erstellen Sie Ihr kostenloses Konto",
    "auth.email": "E-Mail-Adresse",
    "auth.password": "Passwort",
    "auth.confirm_password": "Passwort bestätigen",
    "auth.forgot_password": "Passwort vergessen?",
    "auth.no_account": "Kein Konto?",
    "auth.have_account": "Bereits ein Konto?",

    // Newsletter
    "newsletter.title": "Bleiben Sie auf dem Laufenden",
    "newsletter.subtitle": "Erhalten Sie die neuesten Nachrichten und Updates",
    "newsletter.placeholder": "Ihre E-Mail-Adresse",
    "newsletter.subscribe": "Abonnieren",
    "newsletter.success": "Erfolgreich abonniert!",

    // Footer
    "footer.company": "Pixel",
    "footer.description": "KI-gestützte Bildbearbeitungstools",
    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.made_by": "von Come & Click",
    "footer.privacy": "Datenschutz",
    "footer.terms": "Bedingungen",
    "footer.cookies": "Cookies",

    // Legal
    "legal.privacy.title": "Datenschutzrichtlinie",
    "legal.terms.title": "Nutzungsbedingungen",
    "legal.cookies.title": "Cookie-Richtlinie",

    // Features
    "features.fast_processing": "Schnelle Verarbeitung",
    "features.fast_processing.desc": "Ultra-schnelle KI-Verarbeitung für alle Ihre Bildbearbeitungsanforderungen",
    "features.secure_private": "Sicher & Privat",
    "features.secure_private.desc":
      "Ihre Dateien werden sicher verarbeitet und niemals auf unseren Servern gespeichert",
    "features.easy_to_use": "Einfach zu Verwenden",
    "features.easy_to_use.desc": "Einfache Drag-and-Drop-Oberfläche, die jeder verwenden kann",
    "features.why_choose_pixel": "Warum Pixel Wählen?",
    "features.why_choose_pixel.desc": "Professionelle Tools mit Unternehmenssicherheit und Verbrauchereinfachheit",

    // CTA Section
    "home.cta.title": "Bereit, Ihre Bilder zu verwandeln?",
    "home.cta.subtitle":
      "Schließen Sie sich Tausenden von Benutzern an, die Pixel für ihre Bildbearbeitungsanforderungen vertrauen",
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
