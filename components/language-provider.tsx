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

    // Legal Pages - Privacy
    "privacy.last_updated": "Dernière mise à jour : Décembre 2024",
    "privacy.info_collect.title": "Informations que nous collectons",
    "privacy.info_collect.desc":
      "Nous collectons les informations que vous nous fournissez directement, par exemple lorsque vous créez un compte, utilisez nos services ou nous contactez pour obtenir de l'aide.",
    "privacy.how_use.title": "Comment nous utilisons vos informations",
    "privacy.how_use.desc":
      "Nous utilisons les informations que nous collectons pour fournir, maintenir et améliorer nos services, traiter les transactions et communiquer avec vous.",
    "privacy.data_security.title": "Sécurité des données",
    "privacy.data_security.desc":
      "Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction.",
    "privacy.contact.title": "Nous contacter",
    "privacy.contact.desc":
      "Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à privacy@pixel-tools.com.",

    // Legal Pages - Cookies
    "cookies.last_updated": "Dernière mise à jour : Décembre 2024",
    "cookies.what_are.title": "Que sont les cookies",
    "cookies.what_are.desc":
      "Les cookies sont de petits fichiers texte qui sont placés sur votre ordinateur ou appareil mobile lorsque vous visitez notre site Web.",
    "cookies.how_use.title": "Comment nous utilisons les cookies",
    "cookies.how_use.desc":
      "Nous utilisons des cookies pour améliorer votre expérience sur notre site Web, mémoriser vos préférences et analyser l'utilisation de notre site.",
    "cookies.types.title": "Types de cookies que nous utilisons",
    "cookies.types.essential": "Cookies essentiels : Requis pour le bon fonctionnement du site Web",
    "cookies.types.analytics":
      "Cookies d'analyse : Nous aident à comprendre comment les visiteurs utilisent notre site Web",
    "cookies.types.preferences": "Cookies de préférence : Mémorisent vos paramètres et préférences",
    "cookies.manage.title": "Gestion des cookies",
    "cookies.manage.desc":
      "Vous pouvez contrôler et gérer les cookies via les paramètres de votre navigateur. Veuillez noter que la suppression ou le blocage des cookies peut affecter votre expérience utilisateur.",

    // Legal Pages - Terms
    "terms.last_updated": "Dernière mise à jour : Décembre 2024",
    "terms.acceptance.title": "Acceptation des conditions",
    "terms.acceptance.desc":
      "En accédant et en utilisant les services de Pixel, vous acceptez et acceptez d'être lié par les termes et dispositions de cet accord.",
    "terms.license.title": "Licence d'utilisation",
    "terms.license.desc":
      "L'autorisation est accordée d'utiliser temporairement les services de Pixel à des fins personnelles et non commerciales uniquement.",
    "terms.disclaimer.title": "Clause de non-responsabilité",
    "terms.disclaimer.desc":
      'Les matériaux sur le site Web de Pixel sont fournis "en l\'état". Pixel ne donne aucune garantie, expresse ou implicite.',
    "terms.contact.title": "Informations de contact",
    "terms.contact.desc":
      "Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à legal@pixel-tools.com.",
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

    // Legal Pages - Privacy
    "privacy.last_updated": "Last updated: December 2024",
    "privacy.info_collect.title": "Information We Collect",
    "privacy.info_collect.desc":
      "We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.",
    "privacy.how_use.title": "How We Use Your Information",
    "privacy.how_use.desc":
      "We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.",
    "privacy.data_security.title": "Data Security",
    "privacy.data_security.desc":
      "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    "privacy.contact.title": "Contact Us",
    "privacy.contact.desc":
      "If you have any questions about this privacy policy, please contact us at privacy@pixel-tools.com.",

    // Legal Pages - Cookies
    "cookies.last_updated": "Last updated: December 2024",
    "cookies.what_are.title": "What Are Cookies",
    "cookies.what_are.desc":
      "Cookies are small text files that are placed on your computer or mobile device when you visit our website.",
    "cookies.how_use.title": "How We Use Cookies",
    "cookies.how_use.desc":
      "We use cookies to enhance your experience on our website, remember your preferences, and analyze our site usage.",
    "cookies.types.title": "Types of Cookies We Use",
    "cookies.types.essential": "Essential cookies: Required for the website to function properly",
    "cookies.types.analytics": "Analytics cookies: Help us understand how visitors use our website",
    "cookies.types.preferences": "Preference cookies: Remember your settings and preferences",
    "cookies.manage.title": "Managing Cookies",
    "cookies.manage.desc":
      "You can control and manage cookies through your browser settings. Please note that removing or blocking cookies may affect your user experience.",

    // Legal Pages - Terms
    "terms.last_updated": "Last updated: December 2024",
    "terms.acceptance.title": "Acceptance of Terms",
    "terms.acceptance.desc":
      "By accessing and using Pixel's services, you accept and agree to be bound by the terms and provision of this agreement.",
    "terms.license.title": "Use License",
    "terms.license.desc":
      "Permission is granted to temporarily use Pixel's services for personal, non-commercial transitory viewing only.",
    "terms.disclaimer.title": "Disclaimer",
    "terms.disclaimer.desc":
      "The materials on Pixel's website are provided on an 'as is' basis. Pixel makes no warranties, expressed or implied.",
    "terms.contact.title": "Contact Information",
    "terms.contact.desc":
      "If you have any questions about these Terms of Service, please contact us at legal@pixel-tools.com.",
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

    // Legal Pages - Privacy
    "privacy.last_updated": "Última actualización: Diciembre 2024",
    "privacy.info_collect.title": "Información que Recopilamos",
    "privacy.info_collect.desc":
      "Recopilamos información que nos proporciona directamente, como cuando crea una cuenta, usa nuestros servicios o nos contacta para obtener soporte.",
    "privacy.how_use.title": "Cómo Usamos Su Información",
    "privacy.how_use.desc":
      "Usamos la información que recopilamos para proporcionar, mantener y mejorar nuestros servicios, procesar transacciones y comunicarnos con usted.",
    "privacy.data_security.title": "Seguridad de Datos",
    "privacy.data_security.desc":
      "Implementamos medidas de seguridad apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.",
    "privacy.contact.title": "Contáctanos",
    "privacy.contact.desc":
      "Si tiene preguntas sobre esta política de privacidad, contáctenos en privacy@pixel-tools.com.",

    // Legal Pages - Cookies
    "cookies.last_updated": "Última actualización: Diciembre 2024",
    "cookies.what_are.title": "Qué Son las Cookies",
    "cookies.what_are.desc":
      "Las cookies son pequeños archivos de texto que se colocan en su computadora o dispositivo móvil cuando visita nuestro sitio web.",
    "cookies.how_use.title": "Cómo Usamos las Cookies",
    "cookies.how_use.desc":
      "Usamos cookies para mejorar su experiencia en nuestro sitio web, recordar sus preferencias y analizar el uso de nuestro sitio.",
    "cookies.types.title": "Tipos de Cookies que Usamos",
    "cookies.types.essential": "Cookies esenciales: Requeridas para que el sitio web funcione correctamente",
    "cookies.types.analytics": "Cookies de análisis: Nos ayudan a entender cómo los visitantes usan nuestro sitio web",
    "cookies.types.preferences": "Cookies de preferencias: Recuerdan sus configuraciones y preferencias",
    "cookies.manage.title": "Gestión de Cookies",
    "cookies.manage.desc":
      "Puede controlar y gestionar las cookies a través de la configuración de su navegador. Tenga en cuenta que eliminar o bloquear cookies puede afectar su experiencia de usuario.",

    // Legal Pages - Terms
    "terms.last_updated": "Última actualización: Diciembre 2024",
    "terms.acceptance.title": "Aceptación de Términos",
    "terms.acceptance.desc":
      "Al acceder y usar los servicios de Pixel, acepta y está de acuerdo en estar sujeto a los términos y disposiciones de este acuerdo.",
    "terms.license.title": "Licencia de Uso",
    "terms.license.desc":
      "Se otorga permiso para usar temporalmente los servicios de Pixel solo para visualización personal y no comercial.",
    "terms.disclaimer.title": "Descargo de Responsabilidad",
    "terms.disclaimer.desc":
      "Los materiales en el sitio web de Pixel se proporcionan 'tal como están'. Pixel no ofrece garantías, expresas o implícitas.",
    "terms.contact.title": "Información de Contacto",
    "terms.contact.desc": "Si tiene preguntas sobre estos Términos de Servicio, contáctenos en legal@pixel-tools.com.",
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

    // Legal Pages - Privacy
    "privacy.last_updated": "Zuletzt aktualisiert: Dezember 2024",
    "privacy.info_collect.title": "Informationen, die wir sammeln",
    "privacy.info_collect.desc":
      "Wir sammeln Informationen, die Sie uns direkt zur Verfügung stellen, z.B. wenn Sie ein Konto erstellen, unsere Dienste nutzen oder uns für Support kontaktieren.",
    "privacy.how_use.title": "Wie wir Ihre Informationen verwenden",
    "privacy.how_use.desc":
      "Wir verwenden die gesammelten Informationen, um unsere Dienste bereitzustellen, zu warten und zu verbessern, Transaktionen zu verarbeiten und mit Ihnen zu kommunizieren.",
    "privacy.data_security.title": "Datensicherheit",
    "privacy.data_security.desc":
      "Wir implementieren angemessene Sicherheitsmaßnahmen zum Schutz Ihrer persönlichen Informationen vor unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung.",
    "privacy.contact.title": "Kontaktieren Sie uns",
    "privacy.contact.desc":
      "Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns unter privacy@pixel-tools.com.",

    // Legal Pages - Cookies
    "cookies.last_updated": "Zuletzt aktualisiert: Dezember 2024",
    "cookies.what_are.title": "Was sind Cookies",
    "cookies.what_are.desc":
      "Cookies sind kleine Textdateien, die auf Ihrem Computer oder mobilen Gerät platziert werden, wenn Sie unsere Website besuchen.",
    "cookies.how_use.title": "Wie wir Cookies verwenden",
    "cookies.how_use.desc":
      "Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern, Ihre Präferenzen zu speichern und unsere Website-Nutzung zu analysieren.",
    "cookies.types.title": "Arten von Cookies, die wir verwenden",
    "cookies.types.essential": "Wesentliche Cookies: Erforderlich für das ordnungsgemäße Funktionieren der Website",
    "cookies.types.analytics": "Analyse-Cookies: Helfen uns zu verstehen, wie Besucher unsere Website nutzen",
    "cookies.types.preferences": "Präferenz-Cookies: Speichern Ihre Einstellungen und Präferenzen",
    "cookies.manage.title": "Cookie-Verwaltung",
    "cookies.manage.desc":
      "Sie können Cookies über Ihre Browser-Einstellungen kontrollieren und verwalten. Bitte beachten Sie, dass das Entfernen oder Blockieren von Cookies Ihre Benutzererfahrung beeinträchtigen kann.",

    // Legal Pages - Terms
    "terms.last_updated": "Zuletzt aktualisiert: Dezember 2024",
    "terms.acceptance.title": "Annahme der Bedingungen",
    "terms.acceptance.desc":
      "Durch den Zugriff auf und die Nutzung von Pixels Diensten akzeptieren Sie die Bedingungen und Bestimmungen dieser Vereinbarung.",
    "terms.license.title": "Nutzungslizenz",
    "terms.license.desc":
      "Die Erlaubnis wird erteilt, Pixels Dienste vorübergehend nur für persönliche, nicht-kommerzielle Zwecke zu nutzen.",
    "terms.disclaimer.title": "Haftungsausschluss",
    "terms.disclaimer.desc":
      "Die Materialien auf Pixels Website werden 'wie sie sind' bereitgestellt. Pixel gibt keine Garantien, weder ausdrücklich noch stillschweigend.",
    "terms.contact.title": "Kontaktinformationen",
    "terms.contact.desc":
      "Wenn Sie Fragen zu diesen Nutzungsbedingungen haben, kontaktieren Sie uns unter legal@pixel-tools.com.",
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
