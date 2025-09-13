"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[#d03232] mb-4">{t("footer.company")}</h3>
            <p className="text-gray-400 mb-4">{t("footer.description")}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("nav.tools")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/tools/background-removal" className="hover:text-white transition-colors">
                  {t("tools.background_removal")}
                </Link>
              </li>
              <li>
                <Link href="/tools/image-compressor" className="hover:text-white transition-colors">
                  {t("tools.image_compressor")}
                </Link>
              </li>
              <li>
                <Link href="/tools/image-resizer" className="hover:text-white transition-colors">
                  {t("tools.image_resizer")}
                </Link>
              </li>
              <li>
                <Link href="/tools/format-converter" className="hover:text-white transition-colors">
                  {t("tools.format_converter")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 {t("footer.company")}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
