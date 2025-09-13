"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Book, MessageCircle, Mail, Phone, ChevronRight } from "lucide-react"
import Link from "next/link"

const categories = [
  { name: "Getting Started", icon: Book, count: 12, href: "/help/getting-started" },
  { name: "Background Removal", icon: Book, count: 8, href: "/help/background-removal" },
  { name: "Image Compression", icon: Book, count: 6, href: "/help/image-compression" },
  { name: "Format Conversion", icon: Book, count: 5, href: "/help/format-conversion" },
  { name: "Account & Billing", icon: Book, count: 10, href: "/help/account-billing" },
  { name: "API Documentation", icon: Book, count: 15, href: "/help/api" },
]

const popularArticles = [
  { title: "How to remove backgrounds from images", views: "15.2k", href: "/help/remove-background" },
  { title: "Supported image formats", views: "12.8k", href: "/help/supported-formats" },
  { title: "How to compress images without quality loss", views: "9.4k", href: "/help/compress-images" },
  { title: "API rate limits and usage", views: "7.1k", href: "/help/api-limits" },
  { title: "Troubleshooting upload issues", views: "6.3k", href: "/help/upload-issues" },
]

const contactOptions = [
  { icon: MessageCircle, title: "Live Chat", description: "Get instant help from our support team", available: "24/7" },
  { icon: Mail, title: "Email Support", description: "Send us a detailed message", response: "< 4 hours" },
  { icon: Phone, title: "Phone Support", description: "Speak directly with our team", available: "Mon-Fri 9-6 PST" },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#d03232]/10 text-[#d03232] border border-[#d03232]/20 px-4 py-2 mb-6">
              Help Center
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              How can we <span className="text-[#d03232]">help you?</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Find answers to your questions, learn how to use our tools, and get the most out of Pixel.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for help articles..."
                className="pl-12 py-4 text-lg bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Browse by Category</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Find help articles organized by topic</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={category.href}>
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-lg flex items-center justify-center">
                            <category.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white group-hover:text-[#d03232] transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-gray-400 text-sm">{category.count} articles</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#d03232] group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Popular Articles</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">The most helpful articles from our community</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {popularArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={article.href}>
                  <div className="flex items-center justify-between p-6 border-b border-gray-800 hover:bg-gray-900/30 transition-colors group cursor-pointer">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white group-hover:text-[#d03232] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{article.views} views</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#d03232] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Still Need Help?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Our support team is here to help you succeed</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <option.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                    <p className="text-gray-300 mb-3">{option.description}</p>
                    <p className="text-[#d03232] text-sm font-medium">{option.available || option.response}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
