"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

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
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.dashboard": "Dashboard",
    "nav.logout": "Logout",

    // Hero Section
    "hero.new_ai_tools": "New AI Tools Available",
    "hero.transform_your": "Transform Your",
    "hero.media": "Media",
    "hero.instantly": "Instantly",
    "hero.description":
      "Professional media editing tools powered by AI. Remove backgrounds, convert formats, compress images, and more - all in your browser.",
    "hero.start_editing": "Start Editing",
    "hero.view_pricing": "View Pricing",

    // Tools
    "tools.powerful": "Powerful",
    "tools.tools": "Tools",
    "tools.subtitle": "Everything you need to transform your media",
    "tools.bg_removal": "Background Removal",
    "tools.bg_removal_desc": "Remove backgrounds from images with AI precision",
    "tools.format_converter": "Format Converter",
    "tools.format_converter_desc": "Convert between PNG, JPEG, WebP, and more",
    "tools.image_compressor": "Image Compressor",
    "tools.image_compressor_desc": "Reduce file size without losing quality",
    "tools.watermark_remover": "Watermark Remover",
    "tools.watermark_remover_desc": "Remove watermarks and unwanted objects",
    "tools.image_resizer": "Image Resizer",
    "tools.image_resizer_desc": "Resize images to any dimension",
    "tools.video_compressor": "Video Compressor",
    "tools.video_compressor_desc": "Compress videos while maintaining quality",
    "tools.popular": "Popular",
    "tools.remove_background": "Remove Background",
    "tools.upload_compress": "Upload & Compress",
    "tools.compression_level": "Compression Level",
    "tools.high_compression": "High Compression",
    "tools.high_quality": "High Quality",
    "tools.compress_image": "Compress Image",
    "tools.compressed_result": "Compressed Result",
    "tools.smaller": "smaller",
    "tools.original_size": "Original Size",
    "tools.compressed_size": "Compressed Size",
    "tools.download_compressed": "Download Compressed",

    // Features
    "features.why_choose": "Why Choose",
    "features.built_for_professionals": "Built for professionals and creators who demand the best",
    "features.lightning_fast": "Lightning Fast",
    "features.lightning_fast_desc": "Process images in seconds with our optimized algorithms",
    "features.privacy_first": "Privacy First",
    "features.privacy_first_desc": "Your images are processed securely and deleted after use",
    "features.ai_powered": "AI Powered",
    "features.ai_powered_desc": "Advanced AI technology for professional results",

    // Stats
    "stats.images_processed": "Images Processed",
    "stats.happy_users": "Happy Users",
    "stats.processing_time": "Processing Time",
    "stats.success_rate": "Success Rate",

    // Quality
    "quality.free": "Free",
    "quality.premium": "Premium",
    "quality.hd": "HD (1080p)",
    "quality.login_required": "Login Required",
    "quality.upgrade": "Upgrade to Premium",
    "quality.output_quality": "Output Quality",
    "quality.free_desc": "Good quality for web use",
    "quality.premium_desc": "High quality for professional use",
    "quality.standard": "Standard",
    "quality.hd_access": "to access HD quality downloads",
    "quality.high_quality_access": "to access high quality compression (70%+)",

    // Upload
    "upload.title": "Upload Image",
    "upload.drag_drop": "Drag & drop your files here",
    "upload.drop_here": "Drop your image here",
    "upload.or": "or",
    "upload.browse": "Browse Files",
    "upload.paste": "Paste",
    "upload.processing": "Processing...",
    "upload.download": "Download",
    "upload.download_hd": "Download HD",
    "upload.ready": "Ready",
    "upload.result": "Result",
    "upload.complete": "complete",
    "upload.supported_formats": "Supports PNG, JPG, JPEG, WebP",
    "upload.paste_success": "Image pasted successfully",
    "upload.no_image_clipboard": "No image found in clipboard",
    "upload.clipboard_access_failed": "Unable to access clipboard",
    "upload.processing_failed": "Processing failed. Please try again.",
    "upload.download_success": "Image downloaded successfully",
    "upload.download_failed": "Download failed. Please try again.",
    "upload.upload_to_see_result": "Upload an image to see the result here",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle":
      "Our team is here to support you. Whether you have questions about our products, need technical assistance, or want to establish a partnership, we're here to listen.",
    "contact.customer_support": "Customer Support",
    "contact.email": "Email",
    "contact.email_desc": "Write to us anytime",
    "contact.phone": "Phone",
    "contact.phone_desc": "Call us Monday to Friday",
    "contact.live_chat": "Live Chat",
    "contact.live_chat_desc": "Instant online support",
    "contact.available_hours": "Available 9AM-6PM",
    "contact.address": "Address",
    "contact.address_desc": "Come visit us",
    "contact.send_message": "Send us a message",
    "contact.form_description": "Fill out the form below and we'll get back to you quickly.",
    "contact.full_name": "Full Name",
    "contact.your_name": "Your name",
    "contact.department": "Department",
    "contact.choose_department": "Choose a department",
    "contact.subject": "Subject",
    "contact.message_subject": "Message subject",
    "contact.message": "Message",
    "contact.your_message": "Your message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.message_sent": "Message sent!",
    "contact.response_soon": "We'll get back to you as soon as possible.",
    "contact.general_inquiry": "General Inquiry",
    "contact.sales_products": "Sales and Products",
    "contact.technical_support": "Technical Support",
    "contact.partnerships": "Partnerships",
    "contact.press_media": "Press and Media",
    "contact.office_hours": "Office Hours",
    "contact.monday_friday": "Monday - Friday",
    "contact.saturday": "Saturday",
    "contact.sunday": "Sunday",
    "contact.closed": "Closed",
    "contact.response_times": "Response Times",
    "contact.general_inquiries": "General Inquiries",
    "contact.within_24h": "Within 24 hours",
    "contact.within_4h": "Within 4 hours",
    "contact.within_1h": "Within 1 hour",
    "contact.urgent_issues": "Urgent Issues",

    // Donation
    "donate.title": "Support Pixel",
    "donate.description": "Help us keep the tools free and improve our services",
    "donate.amount": "Donation Amount",
    "donate.custom": "Custom Amount",
    "donate.donate": "Donate",
    "donate.thank_you": "Thank you for your support!",
    "donate.support_pixel": "Support Pixel",

    // Footer
    "footer.description": "Professional media editing tools powered by AI. Transform your images and videos with ease.",
    "footer.newsletter": "Stay Updated",
    "footer.newsletter_desc": "Get the latest updates and new features delivered to your inbox.",
    "footer.subscribe": "Subscribe",
    "footer.copyright": "© 2024 Pixel. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.support": "Support",

    // CTA
    "cta.ready_to_start": "Ready to Get Started?",
    "cta.join_thousands": "Join thousands of creators who trust Pixel for their media editing needs",
    "cta.try_tools_now": "Try Tools Now",
    "cta.create_account": "Create Account",

    // Auth
    "auth.login": "Login",
    "auth.signup": "Sign Up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirm_password": "Confirm Password",
    "auth.forgot_password": "Forgot Password?",
    "auth.no_account": "Don't have an account?",
    "auth.have_account": "Already have an account?",
    "auth.name": "Full Name",

    // Pricing
    "pricing.title": "Choose Your Plan",
    "pricing.subtitle": "Start free, upgrade when you need more",
    "pricing.free": "Free",
    "pricing.premium": "Premium",
    "pricing.free_desc": "Perfect for getting started",
    "pricing.premium_desc": "For professionals and power users",
    "pricing.month": "month",
    "pricing.get_started": "Get Started",
    "pricing.upgrade": "Upgrade Now",

    // Privacy Policy
    "privacy.title": "Privacy Policy",
    "privacy.last_updated": "Last updated: December 2024",

    // Terms of Service
    "terms.title": "Terms of Service",
    "terms.last_updated": "Last updated: December 2024",

    // Cookies Policy
    "cookies.title": "Cookie Policy",
    "cookies.last_updated": "Last updated: December 2024",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.close": "Close",
    "common.search": "Search",
    "common.file_too_large": "File too large",
    "common.invalid_format": "Invalid file format",
    "common.processing_complete": "Processing complete",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.tools": "Outils",
    "nav.pricing": "Tarifs",
    "nav.contact": "Contact",
    "nav.login": "Connexion",
    "nav.signup": "Inscription",
    "nav.dashboard": "Tableau de bord",
    "nav.logout": "Déconnexion",

    // Hero Section
    "hero.new_ai_tools": "Nouveaux Outils IA Disponibles",
    "hero.transform_your": "Transformez Vos",
    "hero.media": "Médias",
    "hero.instantly": "Instantanément",
    "hero.description":
      "Outils d'édition média professionnels alimentés par l'IA. Supprimez les arrière-plans, convertissez les formats, compressez les images et plus - directement dans votre navigateur.",
    "hero.start_editing": "Commencer l'Édition",
    "hero.view_pricing": "Voir les Tarifs",

    // Tools
    "tools.powerful": "Outils",
    "tools.tools": "Puissants",
    "tools.subtitle": "Tout ce dont vous avez besoin pour transformer vos médias",
    "tools.bg_removal": "Suppression d'Arrière-plan",
    "tools.bg_removal_desc": "Supprimez les arrière-plans avec une précision IA",
    "tools.format_converter": "Convertisseur de Format",
    "tools.format_converter_desc": "Convertissez entre PNG, JPEG, WebP et plus",
    "tools.image_compressor": "Compresseur d'Images",
    "tools.image_compressor_desc": "Réduisez la taille sans perdre la qualité",
    "tools.watermark_remover": "Suppresseur de Filigrane",
    "tools.watermark_remover_desc": "Supprimez les filigranes et objets indésirables",
    "tools.image_resizer": "Redimensionneur d'Images",
    "tools.image_resizer_desc": "Redimensionnez les images à toute dimension",
    "tools.video_compressor": "Compresseur Vidéo",
    "tools.video_compressor_desc": "Compressez les vidéos en maintenant la qualité",
    "tools.popular": "Populaire",
    "tools.remove_background": "Supprimer l'Arrière-plan",
    "tools.upload_compress": "Télécharger et Compresser",
    "tools.compression_level": "Niveau de Compression",
    "tools.high_compression": "Haute Compression",
    "tools.high_quality": "Haute Qualité",
    "tools.compress_image": "Compresser l'Image",
    "tools.compressed_result": "Résultat Compressé",
    "tools.smaller": "plus petit",
    "tools.original_size": "Taille Originale",
    "tools.compressed_size": "Taille Compressée",
    "tools.download_compressed": "Télécharger Compressé",

    // Features
    "features.why_choose": "Pourquoi Choisir",
    "features.built_for_professionals": "Conçu pour les professionnels et créateurs qui exigent le meilleur",
    "features.lightning_fast": "Ultra Rapide",
    "features.lightning_fast_desc": "Traitez les images en secondes avec nos algorithmes optimisés",
    "features.privacy_first": "Confidentialité d'Abord",
    "features.privacy_first_desc": "Vos images sont traitées en sécurité et supprimées après usage",
    "features.ai_powered": "Alimenté par l'IA",
    "features.ai_powered_desc": "Technologie IA avancée pour des résultats professionnels",

    // Stats
    "stats.images_processed": "Images Traitées",
    "stats.happy_users": "Utilisateurs Satisfaits",
    "stats.processing_time": "Temps de Traitement",
    "stats.success_rate": "Taux de Réussite",

    // Quality
    "quality.free": "Gratuit",
    "quality.premium": "Premium",
    "quality.hd": "HD (1080p)",
    "quality.login_required": "Connexion Requise",
    "quality.upgrade": "Passer au Premium",
    "quality.output_quality": "Qualité de Sortie",
    "quality.free_desc": "Bonne qualité pour le web",
    "quality.premium_desc": "Haute qualité pour usage professionnel",
    "quality.standard": "Standard",
    "quality.hd_access": "pour accéder aux téléchargements HD",
    "quality.high_quality_access": "pour accéder à la compression haute qualité (70%+)",

    // Upload
    "upload.title": "Télécharger l'Image",
    "upload.drag_drop": "Glissez-déposez vos fichiers ici",
    "upload.drop_here": "Déposez votre image ici",
    "upload.or": "ou",
    "upload.browse": "Parcourir les Fichiers",
    "upload.paste": "Coller",
    "upload.processing": "Traitement...",
    "upload.download": "Télécharger",
    "upload.download_hd": "Télécharger HD",
    "upload.ready": "Prêt",
    "upload.result": "Résultat",
    "upload.complete": "terminé",
    "upload.supported_formats": "Supporte PNG, JPG, JPEG, WebP",
    "upload.paste_success": "Image collée avec succès",
    "upload.no_image_clipboard": "Aucune image trouvée dans le presse-papier",
    "upload.clipboard_access_failed": "Impossible d'accéder au presse-papier",
    "upload.processing_failed": "Traitement échoué. Veuillez réessayer.",
    "upload.download_success": "Image téléchargée avec succès",
    "upload.download_failed": "Téléchargement échoué. Veuillez réessayer.",
    "upload.upload_to_see_result": "Téléchargez une image pour voir le résultat ici",

    // Contact
    "contact.title": "Nous Contacter",
    "contact.subtitle":
      "Notre équipe est là pour vous accompagner. Que vous ayez une question sur nos produits, besoin d'assistance technique ou souhaitiez établir un partenariat, nous sommes à votre écoute.",
    "contact.customer_support": "Support Client",
    "contact.email": "Email",
    "contact.email_desc": "Écrivez-nous à tout moment",
    "contact.phone": "Téléphone",
    "contact.phone_desc": "Appelez-nous du lundi au vendredi",
    "contact.live_chat": "Chat en direct",
    "contact.live_chat_desc": "Support instantané en ligne",
    "contact.available_hours": "Disponible 9h-18h",
    "contact.address": "Adresse",
    "contact.address_desc": "Venez nous rendre visite",
    "contact.send_message": "Envoyez-nous un message",
    "contact.form_description": "Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.",
    "contact.full_name": "Nom complet",
    "contact.your_name": "Votre nom",
    "contact.department": "Département",
    "contact.choose_department": "Choisir un département",
    "contact.subject": "Sujet",
    "contact.message_subject": "Sujet du message",
    "contact.message": "Message",
    "contact.your_message": "Votre message",
    "contact.send": "Envoyer le Message",
    "contact.sending": "Envoi...",
    "contact.message_sent": "Message envoyé !",
    "contact.response_soon": "Nous vous répondrons dans les plus brefs délais.",
    "contact.general_inquiry": "Demande générale",
    "contact.sales_products": "Ventes et produits",
    "contact.technical_support": "Support technique",
    "contact.partnerships": "Partenariats",
    "contact.press_media": "Presse et médias",
    "contact.office_hours": "Heures d'Ouverture",
    "contact.monday_friday": "Lundi - Vendredi",
    "contact.saturday": "Samedi",
    "contact.sunday": "Dimanche",
    "contact.closed": "Fermé",
    "contact.response_times": "Temps de Réponse",
    "contact.general_inquiries": "Demandes Générales",
    "contact.within_24h": "Dans les 24 heures",
    "contact.within_4h": "Dans les 4 heures",
    "contact.within_1h": "Dans l'heure",
    "contact.urgent_issues": "Problèmes Urgents",

    // Donation
    "donate.title": "Soutenir Pixel",
    "donate.description": "Aidez-nous à garder les outils gratuits et améliorer nos services",
    "donate.amount": "Montant du Don",
    "donate.custom": "Montant Personnalisé",
    "donate.donate": "Faire un Don",
    "donate.thank_you": "Merci pour votre soutien !",
    "donate.support_pixel": "Soutenir Pixel",

    // Footer
    "footer.description":
      "Outils d'édition média professionnels alimentés par l'IA. Transformez vos images et vidéos facilement.",
    "footer.newsletter": "Restez informé",
    "footer.newsletter_desc": "Recevez les dernières mises à jour et nouvelles fonctionnalités dans votre boîte mail.",
    "footer.subscribe": "S'abonner",
    "footer.copyright": "© 2024 Pixel. Tous droits réservés.",
    "footer.privacy": "Politique de confidentialité",
    "footer.terms": "Conditions d'utilisation",
    "footer.support": "Support",

    // CTA
    "cta.ready_to_start": "Prêt à Commencer ?",
    "cta.join_thousands":
      "Rejoignez des milliers de créateurs qui font confiance à Pixel pour leurs besoins d'édition média",
    "cta.try_tools_now": "Essayer les Outils",
    "cta.create_account": "Créer un Compte",

    // Auth
    "auth.login": "Connexion",
    "auth.signup": "Inscription",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.confirm_password": "Confirmer le mot de passe",
    "auth.forgot_password": "Mot de passe oublié ?",
    "auth.no_account": "Pas de compte ?",
    "auth.have_account": "Déjà un compte ?",
    "auth.name": "Nom complet",

    // Pricing
    "pricing.title": "Choisissez Votre Plan",
    "pricing.subtitle": "Commencez gratuitement, passez au premium quand vous en avez besoin",
    "pricing.free": "Gratuit",
    "pricing.premium": "Premium",
    "pricing.free_desc": "Parfait pour commencer",
    "pricing.premium_desc": "Pour les professionnels et utilisateurs avancés",
    "pricing.month": "mois",
    "pricing.get_started": "Commencer",
    "pricing.upgrade": "Passer au Premium",

    // Privacy Policy
    "privacy.title": "Politique de Confidentialité",
    "privacy.last_updated": "Dernière mise à jour : Décembre 2024",

    // Terms of Service
    "terms.title": "Conditions Générales d'Utilisation",
    "terms.last_updated": "Dernière mise à jour : Décembre 2024",

    // Cookies Policy
    "cookies.title": "Politique de Cookies",
    "cookies.last_updated": "Dernière mise à jour : Décembre 2024",

    // Common
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.cancel": "Annuler",
    "common.save": "Sauvegarder",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.close": "Fermer",
    "common.search": "Rechercher",
    "common.file_too_large": "Fichier trop volumineux",
    "common.invalid_format": "Format de fichier invalide",
    "common.processing_complete": "Traitement terminé",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.tools": "Herramientas",
    "nav.pricing": "Precios",
    "nav.contact": "Contacto",
    "nav.login": "Iniciar Sesión",
    "nav.signup": "Registrarse",
    "nav.dashboard": "Panel",
    "nav.logout": "Cerrar Sesión",

    // Hero Section
    "hero.new_ai_tools": "Nuevas Herramientas IA Disponibles",
    "hero.transform_your": "Transforma Tus",
    "hero.media": "Medios",
    "hero.instantly": "Al Instante",
    "hero.description":
      "Herramientas profesionales de edición multimedia impulsadas por IA. Elimina fondos, convierte formatos, comprime imágenes y más - todo en tu navegador.",
    "hero.start_editing": "Comenzar Edición",
    "hero.view_pricing": "Ver Precios",

    // Tools
    "tools.powerful": "Herramientas",
    "tools.tools": "Potentes",
    "tools.subtitle": "Todo lo que necesitas para transformar tus medios",
    "tools.bg_removal": "Eliminación de Fondo",
    "tools.bg_removal_desc": "Elimina fondos con precisión de IA",
    "tools.format_converter": "Convertidor de Formato",
    "tools.format_converter_desc": "Convierte entre PNG, JPEG, WebP y más",
    "tools.image_compressor": "Compresor de Imágenes",
    "tools.image_compressor_desc": "Reduce el tamaño sin perder calidad",
    "tools.watermark_remover": "Eliminador de Marca de Agua",
    "tools.watermark_remover_desc": "Elimina marcas de agua y objetos no deseados",
    "tools.image_resizer": "Redimensionador de Imágenes",
    "tools.image_resizer_desc": "Redimensiona imágenes a cualquier dimensión",
    "tools.video_compressor": "Compresor de Video",
    "tools.video_compressor_desc": "Comprime videos manteniendo la calidad",
    "tools.popular": "Popular",
    "tools.remove_background": "Eliminar Fondo",
    "tools.upload_compress": "Subir y Comprimir",
    "tools.compression_level": "Nivel de Compresión",
    "tools.high_compression": "Alta Compresión",
    "tools.high_quality": "Alta Calidad",
    "tools.compress_image": "Comprimir Imagen",
    "tools.compressed_result": "Resultado Comprimido",
    "tools.smaller": "más pequeño",
    "tools.original_size": "Tamaño Original",
    "tools.compressed_size": "Tamaño Comprimido",
    "tools.download_compressed": "Descargar Comprimido",

    // Features
    "features.why_choose": "¿Por Qué Elegir",
    "features.built_for_professionals": "Construido para profesionales y creadores que exigen lo mejor",
    "features.lightning_fast": "Ultra Rápido",
    "features.lightning_fast_desc": "Procesa imágenes en segundos con nuestros algoritmos optimizados",
    "features.privacy_first": "Privacidad Primero",
    "features.privacy_first_desc": "Tus imágenes se procesan de forma segura y se eliminan después del uso",
    "features.ai_powered": "Impulsado por IA",
    "features.ai_powered_desc": "Tecnología IA avanzada para resultados profesionales",

    // Stats
    "stats.images_processed": "Imágenes Procesadas",
    "stats.happy_users": "Usuarios Felices",
    "stats.processing_time": "Tiempo de Procesamiento",
    "stats.success_rate": "Tasa de Éxito",

    // Quality
    "quality.free": "Gratis",
    "quality.premium": "Premium",
    "quality.hd": "HD (1080p)",
    "quality.login_required": "Inicio de Sesión Requerido",
    "quality.upgrade": "Actualizar a Premium",
    "quality.output_quality": "Calidad de Salida",
    "quality.free_desc": "Buena calidad para web",
    "quality.premium_desc": "Alta calidad para uso profesional",
    "quality.standard": "Estándar",
    "quality.hd_access": "para acceder a descargas HD",
    "quality.high_quality_access": "para acceder a compresión de alta calidad (70%+)",

    // Upload
    "upload.title": "Subir Imagen",
    "upload.drag_drop": "Arrastra y suelta tus archivos aquí",
    "upload.drop_here": "Suelta tu imagen aquí",
    "upload.or": "o",
    "upload.browse": "Explorar Archivos",
    "upload.paste": "Pegar",
    "upload.processing": "Procesando...",
    "upload.download": "Descargar",
    "upload.download_hd": "Descargar HD",
    "upload.ready": "Listo",
    "upload.result": "Resultado",
    "upload.complete": "completo",
    "upload.supported_formats": "Soporta PNG, JPG, JPEG, WebP",
    "upload.paste_success": "Imagen pegada con éxito",
    "upload.no_image_clipboard": "No se encontró imagen en el portapapeles",
    "upload.clipboard_access_failed": "No se pudo acceder al portapapeles",
    "upload.processing_failed": "Procesamiento falló. Por favor intenta de nuevo.",
    "upload.download_success": "Imagen descargada con éxito",
    "upload.download_failed": "Descarga falló. Por favor intenta de nuevo.",
    "upload.upload_to_see_result": "Sube una imagen para ver el resultado aquí",

    // Contact
    "contact.title": "Contáctanos",
    "contact.subtitle":
      "Nuestro equipo está aquí para apoyarte. Ya sea que tengas preguntas sobre nuestros productos, necesites asistencia técnica o quieras establecer una asociación, estamos aquí para escuchar.",
    "contact.customer_support": "Soporte al Cliente",
    "contact.email": "Email",
    "contact.email_desc": "Escríbenos en cualquier momento",
    "contact.phone": "Teléfono",
    "contact.phone_desc": "Llámanos de lunes a viernes",
    "contact.live_chat": "Chat en Vivo",
    "contact.live_chat_desc": "Soporte instantáneo en línea",
    "contact.available_hours": "Disponible 9AM-6PM",
    "contact.address": "Dirección",
    "contact.address_desc": "Ven a visitarnos",
    "contact.send_message": "Envíanos un mensaje",
    "contact.form_description": "Completa el formulario a continuación y te responderemos rápidamente.",
    "contact.full_name": "Nombre Completo",
    "contact.your_name": "Tu nombre",
    "contact.department": "Departamento",
    "contact.choose_department": "Elegir un departamento",
    "contact.subject": "Asunto",
    "contact.message_subject": "Asunto del mensaje",
    "contact.message": "Mensaje",
    "contact.your_message": "Tu mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.sending": "Enviando...",
    "contact.message_sent": "¡Mensaje enviado!",
    "contact.response_soon": "Te responderemos lo antes posible.",
    "contact.general_inquiry": "Consulta General",
    "contact.sales_products": "Ventas y Productos",
    "contact.technical_support": "Soporte Técnico",
    "contact.partnerships": "Asociaciones",
    "contact.press_media": "Prensa y Medios",
    "contact.office_hours": "Horario de Oficina",
    "contact.monday_friday": "Lunes - Viernes",
    "contact.saturday": "Sábado",
    "contact.sunday": "Domingo",
    "contact.closed": "Cerrado",
    "contact.response_times": "Tiempos de Respuesta",
    "contact.general_inquiries": "Consultas Generales",
    "contact.within_24h": "Dentro de 24 horas",
    "contact.within_4h": "Dentro de 4 horas",
    "contact.within_1h": "Dentro de 1 hora",
    "contact.urgent_issues": "Problemas Urgentes",

    // Donation
    "donate.title": "Apoyar Pixel",
    "donate.description": "Ayúdanos a mantener las herramientas gratuitas y mejorar nuestros servicios",
    "donate.amount": "Cantidad de Donación",
    "donate.custom": "Cantidad Personalizada",
    "donate.donate": "Donar",
    "donate.thank_you": "¡Gracias por tu apoyo!",
    "donate.support_pixel": "Apoyar Pixel",

    // Footer
    "footer.description":
      "Herramientas profesionales de edición de medios impulsadas por IA. Transforma tus imágenes y videos fácilmente.",
    "footer.newsletter": "Mantente actualizado",
    "footer.newsletter_desc": "Recibe las últimas actualizaciones y nuevas funciones en tu bandeja de entrada.",
    "footer.subscribe": "Suscribirse",
    "footer.copyright": "© 2024 Pixel. Todos los derechos reservados.",
    "footer.privacy": "Política de privacidad",
    "footer.terms": "Términos de servicio",
    "footer.support": "Soporte",

    // CTA
    "cta.ready_to_start": "¿Listo para Comenzar?",
    "cta.join_thousands": "Únete a miles de creadores que confían en Pixel para sus necesidades de edición multimedia",
    "cta.try_tools_now": "Probar Herramientas",
    "cta.create_account": "Crear Cuenta",

    // Auth
    "auth.login": "Iniciar Sesión",
    "auth.signup": "Registrarse",
    "auth.email": "Email",
    "auth.password": "Contraseña",
    "auth.confirm_password": "Confirmar Contraseña",
    "auth.forgot_password": "¿Olvidaste tu contraseña?",
    "auth.no_account": "¿No tienes cuenta?",
    "auth.have_account": "¿Ya tienes cuenta?",
    "auth.name": "Nombre completo",

    // Pricing
    "pricing.title": "Elige Tu Plan",
    "pricing.subtitle": "Comienza gratis, actualiza cuando necesites más",
    "pricing.free": "Gratis",
    "pricing.premium": "Premium",
    "pricing.free_desc": "Perfecto para empezar",
    "pricing.premium_desc": "Para profesionales y usuarios avanzados",
    "pricing.month": "mes",
    "pricing.get_started": "Comenzar",
    "pricing.upgrade": "Actualizar Ahora",

    // Privacy Policy
    "privacy.title": "Política de Privacidad",
    "privacy.last_updated": "Última actualización: Diciembre 2024",

    // Terms of Service
    "terms.title": "Términos de Servicio",
    "terms.last_updated": "Última actualización: Diciembre 2024",

    // Cookies Policy
    "cookies.title": "Política de Cookies",
    "cookies.last_updated": "Última actualización: Diciembre 2024",

    // Common
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.success": "Éxito",
    "common.cancel": "Cancelar",
    "common.save": "Guardar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
    "common.close": "Cerrar",
    "common.search": "Buscar",
    "common.file_too_large": "Archivo demasiado grande",
    "common.invalid_format": "Formato de archivo inválido",
    "common.processing_complete": "Procesamiento completo",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.tools": "Werkzeuge",
    "nav.pricing": "Preise",
    "nav.contact": "Kontakt",
    "nav.login": "Anmelden",
    "nav.signup": "Registrieren",
    "nav.dashboard": "Dashboard",
    "nav.logout": "Abmelden",

    // Hero Section
    "hero.new_ai_tools": "Neue KI-Tools Verfügbar",
    "hero.transform_your": "Transformiere Deine",
    "hero.media": "Medien",
    "hero.instantly": "Sofort",
    "hero.description":
      "Professionelle Medienbearbeitungstools mit KI-Unterstützung. Entferne Hintergründe, konvertiere Formate, komprimiere Bilder und mehr - alles in deinem Browser.",
    "hero.start_editing": "Bearbeitung Starten",
    "hero.view_pricing": "Preise Ansehen",

    // Tools
    "tools.powerful": "Mächtige",
    "tools.tools": "Werkzeuge",
    "tools.subtitle": "Alles was du brauchst, um deine Medien zu transformieren",
    "tools.bg_removal": "Hintergrund Entfernung",
    "tools.bg_removal_desc": "Entferne Hintergründe mit KI-Präzision",
    "tools.format_converter": "Format Konverter",
    "tools.format_converter_desc": "Konvertiere zwischen PNG, JPEG, WebP und mehr",
    "tools.image_compressor": "Bild Kompressor",
    "tools.image_compressor_desc": "Reduziere Dateigröße ohne Qualitätsverlust",
    "tools.watermark_remover": "Wasserzeichen Entferner",
    "tools.watermark_remover_desc": "Entferne Wasserzeichen und unerwünschte Objekte",
    "tools.image_resizer": "Bild Größenänderung",
    "tools.image_resizer_desc": "Ändere Bildgröße auf jede Dimension",
    "tools.video_compressor": "Video Kompressor",
    "tools.video_compressor_desc": "Komprimiere Videos bei gleichbleibender Qualität",
    "tools.popular": "Beliebt",
    "tools.remove_background": "Hintergrund Entfernen",
    "tools.upload_compress": "Hochladen & Komprimieren",
    "tools.compression_level": "Kompressionsstufe",
    "tools.high_compression": "Hohe Kompression",
    "tools.high_quality": "Hohe Qualität",
    "tools.compress_image": "Bild Komprimieren",
    "tools.compressed_result": "Komprimiertes Ergebnis",
    "tools.smaller": "kleiner",
    "tools.original_size": "Originalgröße",
    "tools.compressed_size": "Komprimierte Größe",
    "tools.download_compressed": "Komprimiert Herunterladen",

    // Features
    "features.why_choose": "Warum",
    "features.built_for_professionals": "Entwickelt für Profis und Kreative, die das Beste verlangen",
    "features.lightning_fast": "Blitzschnell",
    "features.lightning_fast_desc": "Verarbeite Bilder in Sekunden mit unseren optimierten Algorithmen",
    "features.privacy_first": "Datenschutz Zuerst",
    "features.privacy_first_desc": "Deine Bilder werden sicher verarbeitet und nach Gebrauch gelöscht",
    "features.ai_powered": "KI-Unterstützt",
    "features.ai_powered_desc": "Fortschrittliche KI-Technologie für professionelle Ergebnisse",

    // Stats
    "stats.images_processed": "Bilder Verarbeitet",
    "stats.happy_users": "Zufriedene Nutzer",
    "stats.processing_time": "Verarbeitungszeit",
    "stats.success_rate": "Erfolgsrate",

    // Quality
    "quality.free": "Kostenlos",
    "quality.premium": "Premium",
    "quality.hd": "HD (1080p)",
    "quality.login_required": "Anmeldung Erforderlich",
    "quality.upgrade": "Auf Premium Upgraden",
    "quality.output_quality": "Ausgabequalität",
    "quality.free_desc": "Gute Qualität für Web",
    "quality.premium_desc": "Hohe Qualität für professionelle Nutzung",
    "quality.standard": "Standard",
    "quality.hd_access": "für HD-Downloads",
    "quality.high_quality_access": "für hochwertige Kompression (70%+)",

    // Upload
    "upload.title": "Bild Hochladen",
    "upload.drag_drop": "Dateien hier hineinziehen",
    "upload.drop_here": "Bild hier ablegen",
    "upload.or": "oder",
    "upload.browse": "Dateien Durchsuchen",
    "upload.paste": "Einfügen",
    "upload.processing": "Verarbeitung...",
    "upload.download": "Herunterladen",
    "upload.download_hd": "HD Herunterladen",
    "upload.ready": "Bereit",
    "upload.result": "Ergebnis",
    "upload.complete": "abgeschlossen",
    "upload.supported_formats": "Unterstützt PNG, JPG, JPEG, WebP",
    "upload.paste_success": "Bild erfolgreich eingefügt",
    "upload.no_image_clipboard": "Kein Bild in der Zwischenablage gefunden",
    "upload.clipboard_access_failed": "Zugriff auf Zwischenablage fehlgeschlagen",
    "upload.processing_failed": "Verarbeitung fehlgeschlagen. Bitte versuche es erneut.",
    "upload.download_success": "Bild erfolgreich heruntergeladen",
    "upload.download_failed": "Download fehlgeschlagen. Bitte versuche es erneut.",
    "upload.upload_to_see_result": "Lade ein Bild hoch, um das Ergebnis hier zu sehen",

    // Contact
    "contact.title": "Kontaktiere Uns",
    "contact.subtitle":
      "Unser Team ist hier, um dich zu unterstützen. Ob du Fragen zu unseren Produkten hast, technische Hilfe benötigst oder eine Partnerschaft eingehen möchtest, wir hören zu.",
    "contact.customer_support": "Kundensupport",
    "contact.email": "E-Mail",
    "contact.email_desc": "Schreibe uns jederzeit",
    "contact.phone": "Telefon",
    "contact.phone_desc": "Rufe uns Montag bis Freitag an",
    "contact.live_chat": "Live Chat",
    "contact.live_chat_desc": "Sofortiger Online-Support",
    "contact.available_hours": "Verfügbar 9-18 Uhr",
    "contact.address": "Adresse",
    "contact.address_desc": "Besuche uns",
    "contact.send_message": "Sende uns eine Nachricht",
    "contact.form_description": "Fülle das Formular unten aus und wir melden uns schnell bei dir.",
    "contact.full_name": "Vollständiger Name",
    "contact.your_name": "Dein Name",
    "contact.department": "Abteilung",
    "contact.choose_department": "Abteilung wählen",
    "contact.subject": "Betreff",
    "contact.message_subject": "Nachrichtenbetreff",
    "contact.message": "Nachricht",
    "contact.your_message": "Deine Nachricht",
    "contact.send": "Nachricht Senden",
    "contact.sending": "Senden...",
    "contact.message_sent": "Nachricht gesendet!",
    "contact.response_soon": "Wir melden uns so schnell wie möglich bei dir.",
    "contact.general_inquiry": "Allgemeine Anfrage",
    "contact.sales_products": "Verkauf und Produkte",
    "contact.technical_support": "Technischer Support",
    "contact.partnerships": "Partnerschaften",
    "contact.press_media": "Presse und Medien",
    "contact.office_hours": "Bürozeiten",
    "contact.monday_friday": "Montag - Freitag",
    "contact.saturday": "Samstag",
    "contact.sunday": "Sonntag",
    "contact.closed": "Geschlossen",
    "contact.response_times": "Antwortzeiten",
    "contact.general_inquiries": "Allgemeine Anfragen",
    "contact.within_24h": "Innerhalb von 24 Stunden",
    "contact.within_4h": "Innerhalb von 4 Stunden",
    "contact.within_1h": "Innerhalb von 1 Stunde",
    "contact.urgent_issues": "Dringende Probleme",

    // Donation
    "donate.title": "Pixel Unterstützen",
    "donate.description": "Hilf uns, die Tools kostenlos zu halten und unsere Services zu verbessern",
    "donate.amount": "Spendenbetrag",
    "donate.custom": "Benutzerdefinierter Betrag",
    "donate.donate": "Spenden",
    "donate.thank_you": "Danke für deine Unterstützung!",
    "donate.support_pixel": "Pixel Unterstützen",

    // Footer
    "footer.description":
      "Professionelle Medienbearbeitungstools mit KI-Unterstützung. Verwandeln Sie Ihre Bilder und Videos mühelos.",
    "footer.newsletter": "Bleiben Sie auf dem Laufenden",
    "footer.newsletter_desc": "Erhalten Sie die neuesten Updates und Funktionen in Ihrem Posteingang.",
    "footer.subscribe": "Abonnieren",
    "footer.copyright": "© 2024 Pixel. Alle Rechte vorbehalten.",
    "footer.privacy": "Datenschutzrichtlinie",
    "footer.terms": "Nutzungsbedingungen",
    "footer.support": "Support",

    // CTA
    "cta.ready_to_start": "Bereit Loszulegen?",
    "cta.join_thousands": "Schließe dich Tausenden von Kreativen an, die Pixel für ihre Medienbearbeitung vertrauen",
    "cta.try_tools_now": "Tools Jetzt Testen",
    "cta.create_account": "Konto Erstellen",

    // Auth
    "auth.login": "Anmelden",
    "auth.signup": "Registrieren",
    "auth.email": "E-Mail",
    "auth.password": "Passwort",
    "auth.confirm_password": "Passwort Bestätigen",
    "auth.forgot_password": "Passwort vergessen?",
    "auth.no_account": "Kein Konto?",
    "auth.have_account": "Bereits ein Konto?",
    "auth.name": "Vollständiger Name",

    // Pricing
    "pricing.title": "Wähle Deinen Plan",
    "pricing.subtitle": "Starte kostenlos, upgrade wenn du mehr brauchst",
    "pricing.free": "Kostenlos",
    "pricing.premium": "Premium",
    "pricing.free_desc": "Perfekt zum Starten",
    "pricing.premium_desc": "Für Profis und Power-User",
    "pricing.month": "Monat",
    "pricing.get_started": "Loslegen",
    "pricing.upgrade": "Jetzt Upgraden",

    // Privacy Policy
    "privacy.title": "Datenschutzrichtlinie",
    "privacy.last_updated": "Zuletzt aktualisiert: Dezember 2024",

    // Terms of Service
    "terms.title": "Nutzungsbedingungen",
    "terms.last_updated": "Zuletzt aktualisiert: Dezember 2024",

    // Cookies Policy
    "cookies.title": "Cookie-Richtlinie",
    "cookies.last_updated": "Zuletzt aktualisiert: Dezember 2024",

    // Common
    "common.loading": "Laden...",
    "common.error": "Fehler",
    "common.success": "Erfolg",
    "common.cancel": "Abbrechen",
    "common.save": "Speichern",
    "common.delete": "Löschen",
    "common.edit": "Bearbeiten",
    "common.close": "Schließen",
    "common.search": "Suchen",
    "common.file_too_large": "Datei zu groß",
    "common.invalid_format": "Ungültiges Dateiformat",
    "common.processing_complete": "Verarbeitung abgeschlossen",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
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
