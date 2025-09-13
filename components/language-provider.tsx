"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "fr" | "es" | "de"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.tools": "Tools",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "nav.products": "Products",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.logout": "Logout",
    "nav.dashboard": "Dashboard",

    // Authentication
    "auth.login": "Login",
    "auth.signup": "Sign Up",
    "auth.logout": "Logout",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.name": "Name",
    "auth.confirmPassword": "Confirm Password",
    "auth.forgotPassword": "Forgot Password?",
    "auth.noAccount": "Don't have an account?",
    "auth.hasAccount": "Already have an account?",

    // Hero Section
    "hero.title": "Professional Media Tools",
    "hero.subtitle": "Transform your images and videos with our powerful AI-powered tools",
    "hero.cta": "Get Started Free",
    "hero.watchDemo": "Watch Demo",

    // Features
    "features.title": "Powerful Features",
    "features.subtitle": "Everything you need to edit your media",
    "features.backgroundRemoval": "Background Removal",
    "features.backgroundRemovalDesc": "Remove backgrounds from images instantly with AI",
    "features.imageCompression": "Image Compression",
    "features.imageCompressionDesc": "Reduce file sizes without losing quality",
    "features.formatConversion": "Format Conversion",
    "features.formatConversionDesc": "Convert between different image and video formats",
    "features.watermarkRemoval": "Watermark Removal",
    "features.watermarkRemovalDesc": "Remove unwanted watermarks from images",
    "features.imageResize": "Image Resize",
    "features.imageResizeDesc": "Resize images to any dimension",
    "features.videoCompression": "Video Compression",
    "features.videoCompressionDesc": "Compress videos while maintaining quality",

    // Tools
    "tools.title": "Our Tools",
    "tools.subtitle": "Professional media editing tools",
    "tools.backgroundRemoval": "Background Removal",
    "tools.imageCompressor": "Image Compressor",
    "tools.formatConverter": "Format Converter",
    "tools.watermarkRemover": "Watermark Remover",
    "tools.imageResizer": "Image Resizer",
    "tools.videoCompressor": "Video Compressor",
    "tools.selectFile": "Select File",
    "tools.dragDrop": "Drag and drop your file here",
    "tools.processing": "Processing...",
    "tools.download": "Download Result",
    "tools.uploadAnother": "Upload Another",
    "tools.maxSize": "Max file size: 10MB",
    "tools.supportedFormats": "Supported formats",

    // Pricing
    "pricing.title": "Choose Your Plan",
    "pricing.subtitle": "Start free, upgrade when you need more",
    "pricing.free": "Free",
    "pricing.pro": "Pro",
    "pricing.enterprise": "Enterprise",
    "pricing.monthly": "Monthly",
    "pricing.yearly": "Yearly",
    "pricing.save": "Save 20%",
    "pricing.getStarted": "Get Started",
    "pricing.contactUs": "Contact Us",
    "pricing.mostPopular": "Most Popular",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch with our team",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.phone": "+1 (555) 123-4567",
    "contact.address": "123 Main St, City, State 12345",
    "contact.hours": "Mon-Fri 9AM-6PM EST",

    // Footer
    "footer.description": "Professional media editing tools powered by AI",
    "footer.quickLinks": "Quick Links",
    "footer.tools": "Tools",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.cookies": "Cookie Policy",
    "footer.rights": "All rights reserved",

    // Cart
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.total": "Total",
    "cart.checkout": "Checkout",
    "cart.remove": "Remove",
    "cart.quantity": "Quantity",
    "cart.continueShopping": "Continue Shopping",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.close": "Close",

    // CTA
    "cta.readyToStart": "Ready to get started?",
    "cta.joinThousands": "Join thousands of users who trust Pixel",
    "cta.startFree": "Start Free Today",
    "cta.noCredit": "No credit card required",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.tools": "Outils",
    "nav.pricing": "Tarifs",
    "nav.contact": "Contact",
    "nav.products": "Produits",
    "nav.login": "Connexion",
    "nav.signup": "S'inscrire",
    "nav.logout": "Déconnexion",
    "nav.dashboard": "Tableau de bord",

    // Authentication
    "auth.login": "Connexion",
    "auth.signup": "S'inscrire",
    "auth.logout": "Déconnexion",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.name": "Nom",
    "auth.confirmPassword": "Confirmer le mot de passe",
    "auth.forgotPassword": "Mot de passe oublié ?",
    "auth.noAccount": "Pas de compte ?",
    "auth.hasAccount": "Déjà un compte ?",

    // Hero Section
    "hero.title": "Outils Média Professionnels",
    "hero.subtitle": "Transformez vos images et vidéos avec nos outils IA puissants",
    "hero.cta": "Commencer Gratuitement",
    "hero.watchDemo": "Voir la Démo",

    // Features
    "features.title": "Fonctionnalités Puissantes",
    "features.subtitle": "Tout ce dont vous avez besoin pour éditer vos médias",
    "features.backgroundRemoval": "Suppression d'Arrière-plan",
    "features.backgroundRemovalDesc": "Supprimez les arrière-plans d'images instantanément avec l'IA",
    "features.imageCompression": "Compression d'Images",
    "features.imageCompressionDesc": "Réduisez la taille des fichiers sans perdre en qualité",
    "features.formatConversion": "Conversion de Format",
    "features.formatConversionDesc": "Convertissez entre différents formats d'images et vidéos",
    "features.watermarkRemoval": "Suppression de Filigrane",
    "features.watermarkRemovalDesc": "Supprimez les filigranes indésirables des images",
    "features.imageResize": "Redimensionnement d'Image",
    "features.imageResizeDesc": "Redimensionnez les images à n'importe quelle dimension",
    "features.videoCompression": "Compression Vidéo",
    "features.videoCompressionDesc": "Compressez les vidéos en maintenant la qualité",

    // Tools
    "tools.title": "Nos Outils",
    "tools.subtitle": "Outils d'édition média professionnels",
    "tools.backgroundRemoval": "Suppression d'Arrière-plan",
    "tools.imageCompressor": "Compresseur d'Images",
    "tools.formatConverter": "Convertisseur de Format",
    "tools.watermarkRemover": "Suppresseur de Filigrane",
    "tools.imageResizer": "Redimensionneur d'Images",
    "tools.videoCompressor": "Compresseur Vidéo",
    "tools.selectFile": "Sélectionner un Fichier",
    "tools.dragDrop": "Glissez et déposez votre fichier ici",
    "tools.processing": "Traitement en cours...",
    "tools.download": "Télécharger le Résultat",
    "tools.uploadAnother": "Télécharger un Autre",
    "tools.maxSize": "Taille max : 10MB",
    "tools.supportedFormats": "Formats supportés",

    // Pricing
    "pricing.title": "Choisissez Votre Plan",
    "pricing.subtitle": "Commencez gratuitement, améliorez quand vous en avez besoin",
    "pricing.free": "Gratuit",
    "pricing.pro": "Pro",
    "pricing.enterprise": "Entreprise",
    "pricing.monthly": "Mensuel",
    "pricing.yearly": "Annuel",
    "pricing.save": "Économisez 20%",
    "pricing.getStarted": "Commencer",
    "pricing.contactUs": "Nous Contacter",
    "pricing.mostPopular": "Le Plus Populaire",

    // Contact
    "contact.title": "Nous Contacter",
    "contact.subtitle": "Entrez en contact avec notre équipe",
    "contact.name": "Nom",
    "contact.email": "Email",
    "contact.subject": "Sujet",
    "contact.message": "Message",
    "contact.send": "Envoyer le Message",
    "contact.phone": "+1 (555) 123-4567",
    "contact.address": "123 Main St, Ville, État 12345",
    "contact.hours": "Lun-Ven 9h-18h EST",

    // Footer
    "footer.description": "Outils d'édition média professionnels alimentés par l'IA",
    "footer.quickLinks": "Liens Rapides",
    "footer.tools": "Outils",
    "footer.legal": "Légal",
    "footer.privacy": "Politique de Confidentialité",
    "footer.terms": "Conditions d'Utilisation",
    "footer.cookies": "Politique des Cookies",
    "footer.rights": "Tous droits réservés",

    // Cart
    "cart.title": "Panier",
    "cart.empty": "Votre panier est vide",
    "cart.total": "Total",
    "cart.checkout": "Commander",
    "cart.remove": "Supprimer",
    "cart.quantity": "Quantité",
    "cart.continueShopping": "Continuer les Achats",

    // Common
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.cancel": "Annuler",
    "common.save": "Sauvegarder",
    "common.edit": "Modifier",
    "common.delete": "Supprimer",
    "common.back": "Retour",
    "common.next": "Suivant",
    "common.previous": "Précédent",
    "common.close": "Fermer",

    // CTA
    "cta.readyToStart": "Prêt à commencer ?",
    "cta.joinThousands": "Rejoignez des milliers d'utilisateurs qui font confiance à Pixel",
    "cta.startFree": "Commencer Gratuitement Aujourd'hui",
    "cta.noCredit": "Aucune carte de crédit requise",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.tools": "Herramientas",
    "nav.pricing": "Precios",
    "nav.contact": "Contacto",
    "nav.products": "Productos",
    "nav.login": "Iniciar Sesión",
    "nav.signup": "Registrarse",
    "nav.logout": "Cerrar Sesión",
    "nav.dashboard": "Panel",

    // Authentication
    "auth.login": "Iniciar Sesión",
    "auth.signup": "Registrarse",
    "auth.logout": "Cerrar Sesión",
    "auth.email": "Email",
    "auth.password": "Contraseña",
    "auth.name": "Nombre",
    "auth.confirmPassword": "Confirmar Contraseña",
    "auth.forgotPassword": "¿Olvidaste tu contraseña?",
    "auth.noAccount": "¿No tienes cuenta?",
    "auth.hasAccount": "¿Ya tienes cuenta?",

    // Hero Section
    "hero.title": "Herramientas de Medios Profesionales",
    "hero.subtitle": "Transforma tus imágenes y videos con nuestras potentes herramientas de IA",
    "hero.cta": "Comenzar Gratis",
    "hero.watchDemo": "Ver Demo",

    // Features
    "features.title": "Características Potentes",
    "features.subtitle": "Todo lo que necesitas para editar tus medios",
    "features.backgroundRemoval": "Eliminación de Fondo",
    "features.backgroundRemovalDesc": "Elimina fondos de imágenes al instante con IA",
    "features.imageCompression": "Compresión de Imágenes",
    "features.imageCompressionDesc": "Reduce el tamaño de archivos sin perder calidad",
    "features.formatConversion": "Conversión de Formato",
    "features.formatConversionDesc": "Convierte entre diferentes formatos de imagen y video",
    "features.watermarkRemoval": "Eliminación de Marca de Agua",
    "features.watermarkRemovalDesc": "Elimina marcas de agua no deseadas de las imágenes",
    "features.imageResize": "Redimensionar Imagen",
    "features.imageResizeDesc": "Redimensiona imágenes a cualquier dimensión",
    "features.videoCompression": "Compresión de Video",
    "features.videoCompressionDesc": "Comprime videos manteniendo la calidad",

    // Tools
    "tools.title": "Nuestras Herramientas",
    "tools.subtitle": "Herramientas profesionales de edición de medios",
    "tools.backgroundRemoval": "Eliminación de Fondo",
    "tools.imageCompressor": "Compresor de Imágenes",
    "tools.formatConverter": "Convertidor de Formato",
    "tools.watermarkRemover": "Eliminador de Marca de Agua",
    "tools.imageResizer": "Redimensionador de Imágenes",
    "tools.videoCompressor": "Compresor de Video",
    "tools.selectFile": "Seleccionar Archivo",
    "tools.dragDrop": "Arrastra y suelta tu archivo aquí",
    "tools.processing": "Procesando...",
    "tools.download": "Descargar Resultado",
    "tools.uploadAnother": "Subir Otro",
    "tools.maxSize": "Tamaño máx: 10MB",
    "tools.supportedFormats": "Formatos soportados",

    // Pricing
    "pricing.title": "Elige Tu Plan",
    "pricing.subtitle": "Comienza gratis, actualiza cuando necesites más",
    "pricing.free": "Gratis",
    "pricing.pro": "Pro",
    "pricing.enterprise": "Empresa",
    "pricing.monthly": "Mensual",
    "pricing.yearly": "Anual",
    "pricing.save": "Ahorra 20%",
    "pricing.getStarted": "Comenzar",
    "pricing.contactUs": "Contáctanos",
    "pricing.mostPopular": "Más Popular",

    // Contact
    "contact.title": "Contáctanos",
    "contact.subtitle": "Ponte en contacto con nuestro equipo",
    "contact.name": "Nombre",
    "contact.email": "Email",
    "contact.subject": "Asunto",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.phone": "+1 (555) 123-4567",
    "contact.address": "123 Main St, Ciudad, Estado 12345",
    "contact.hours": "Lun-Vie 9AM-6PM EST",

    // Footer
    "footer.description": "Herramientas profesionales de edición de medios impulsadas por IA",
    "footer.quickLinks": "Enlaces Rápidos",
    "footer.tools": "Herramientas",
    "footer.legal": "Legal",
    "footer.privacy": "Política de Privacidad",
    "footer.terms": "Términos de Servicio",
    "footer.cookies": "Política de Cookies",
    "footer.rights": "Todos los derechos reservados",

    // Cart
    "cart.title": "Carrito de Compras",
    "cart.empty": "Tu carrito está vacío",
    "cart.total": "Total",
    "cart.checkout": "Finalizar Compra",
    "cart.remove": "Eliminar",
    "cart.quantity": "Cantidad",
    "cart.continueShopping": "Continuar Comprando",

    // Common
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.success": "Éxito",
    "common.cancel": "Cancelar",
    "common.save": "Guardar",
    "common.edit": "Editar",
    "common.delete": "Eliminar",
    "common.back": "Atrás",
    "common.next": "Siguiente",
    "common.previous": "Anterior",
    "common.close": "Cerrar",

    // CTA
    "cta.readyToStart": "¿Listo para comenzar?",
    "cta.joinThousands": "Únete a miles de usuarios que confían en Pixel",
    "cta.startFree": "Comenzar Gratis Hoy",
    "cta.noCredit": "No se requiere tarjeta de crédito",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.tools": "Werkzeuge",
    "nav.pricing": "Preise",
    "nav.contact": "Kontakt",
    "nav.products": "Produkte",
    "nav.login": "Anmelden",
    "nav.signup": "Registrieren",
    "nav.logout": "Abmelden",
    "nav.dashboard": "Dashboard",

    // Authentication
    "auth.login": "Anmelden",
    "auth.signup": "Registrieren",
    "auth.logout": "Abmelden",
    "auth.email": "E-Mail",
    "auth.password": "Passwort",
    "auth.name": "Name",
    "auth.confirmPassword": "Passwort bestätigen",
    "auth.forgotPassword": "Passwort vergessen?",
    "auth.noAccount": "Kein Konto?",
    "auth.hasAccount": "Bereits ein Konto?",

    // Hero Section
    "hero.title": "Professionelle Medien-Tools",
    "hero.subtitle": "Transformieren Sie Ihre Bilder und Videos mit unseren leistungsstarken KI-Tools",
    "hero.cta": "Kostenlos Starten",
    "hero.watchDemo": "Demo Ansehen",

    // Features
    "features.title": "Leistungsstarke Funktionen",
    "features.subtitle": "Alles was Sie brauchen, um Ihre Medien zu bearbeiten",
    "features.backgroundRemoval": "Hintergrund Entfernung",
    "features.backgroundRemovalDesc": "Entfernen Sie Hintergründe von Bildern sofort mit KI",
    "features.imageCompression": "Bildkompression",
    "features.imageCompressionDesc": "Reduzieren Sie Dateigrößen ohne Qualitätsverlust",
    "features.formatConversion": "Format-Konvertierung",
    "features.formatConversionDesc": "Konvertieren zwischen verschiedenen Bild- und Videoformaten",
    "features.watermarkRemoval": "Wasserzeichen Entfernung",
    "features.watermarkRemovalDesc": "Entfernen Sie unerwünschte Wasserzeichen von Bildern",
    "features.imageResize": "Bildgröße ändern",
    "features.imageResizeDesc": "Ändern Sie die Größe von Bildern auf jede Dimension",
    "features.videoCompression": "Video-Kompression",
    "features.videoCompressionDesc": "Komprimieren Sie Videos bei gleichbleibender Qualität",

    // Tools
    "tools.title": "Unsere Werkzeuge",
    "tools.subtitle": "Professionelle Medienbearbeitungs-Tools",
    "tools.backgroundRemoval": "Hintergrund Entfernung",
    "tools.imageCompressor": "Bildkompressor",
    "tools.formatConverter": "Format-Konverter",
    "tools.watermarkRemover": "Wasserzeichen-Entferner",
    "tools.imageResizer": "Bildgrößen-Änderer",
    "tools.videoCompressor": "Video-Kompressor",
    "tools.selectFile": "Datei Auswählen",
    "tools.dragDrop": "Ziehen Sie Ihre Datei hierher",
    "tools.processing": "Verarbeitung...",
    "tools.download": "Ergebnis Herunterladen",
    "tools.uploadAnother": "Weitere Hochladen",
    "tools.maxSize": "Max. Dateigröße: 10MB",
    "tools.supportedFormats": "Unterstützte Formate",

    // Pricing
    "pricing.title": "Wählen Sie Ihren Plan",
    "pricing.subtitle": "Starten Sie kostenlos, upgraden Sie wenn Sie mehr brauchen",
    "pricing.free": "Kostenlos",
    "pricing.pro": "Pro",
    "pricing.enterprise": "Unternehmen",
    "pricing.monthly": "Monatlich",
    "pricing.yearly": "Jährlich",
    "pricing.save": "20% Sparen",
    "pricing.getStarted": "Loslegen",
    "pricing.contactUs": "Kontaktieren Sie uns",
    "pricing.mostPopular": "Am Beliebtesten",

    // Contact
    "contact.title": "Kontaktieren Sie uns",
    "contact.subtitle": "Nehmen Sie Kontakt mit unserem Team auf",
    "contact.name": "Name",
    "contact.email": "E-Mail",
    "contact.subject": "Betreff",
    "contact.message": "Nachricht",
    "contact.send": "Nachricht Senden",
    "contact.phone": "+1 (555) 123-4567",
    "contact.address": "123 Main St, Stadt, Staat 12345",
    "contact.hours": "Mo-Fr 9-18 Uhr EST",

    // Footer
    "footer.description": "Professionelle Medienbearbeitungs-Tools powered by KI",
    "footer.quickLinks": "Schnelle Links",
    "footer.tools": "Werkzeuge",
    "footer.legal": "Rechtliches",
    "footer.privacy": "Datenschutzrichtlinie",
    "footer.terms": "Nutzungsbedingungen",
    "footer.cookies": "Cookie-Richtlinie",
    "footer.rights": "Alle Rechte vorbehalten",

    // Cart
    "cart.title": "Warenkorb",
    "cart.empty": "Ihr Warenkorb ist leer",
    "cart.total": "Gesamt",
    "cart.checkout": "Zur Kasse",
    "cart.remove": "Entfernen",
    "cart.quantity": "Menge",
    "cart.continueShopping": "Weiter Einkaufen",

    // Common
    "common.loading": "Laden...",
    "common.error": "Fehler",
    "common.success": "Erfolg",
    "common.cancel": "Abbrechen",
    "common.save": "Speichern",
    "common.edit": "Bearbeiten",
    "common.delete": "Löschen",
    "common.back": "Zurück",
    "common.next": "Weiter",
    "common.previous": "Vorherige",
    "common.close": "Schließen",

    // CTA
    "cta.readyToStart": "Bereit anzufangen?",
    "cta.joinThousands": "Schließen Sie sich Tausenden von Benutzern an, die Pixel vertrauen",
    "cta.startFree": "Heute Kostenlos Starten",
    "cta.noCredit": "Keine Kreditkarte erforderlich",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
