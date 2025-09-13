"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Book, Zap, Shield, Globe, ChevronRight } from "lucide-react"
import Link from "next/link"

const apiSections = [
  {
    title: "Authentication",
    description: "Learn how to authenticate your API requests",
    icon: Shield,
    href: "/docs/authentication",
    badge: "Essential",
  },
  {
    title: "Background Removal API",
    description: "Remove backgrounds from images programmatically",
    icon: Code,
    href: "/docs/background-removal",
    badge: "Popular",
  },
  {
    title: "Image Compression API",
    description: "Compress images while maintaining quality",
    icon: Zap,
    href: "/docs/image-compression",
    badge: null,
  },
  {
    title: "Format Conversion API",
    description: "Convert between different image formats",
    icon: Globe,
    href: "/docs/format-conversion",
    badge: null,
  },
]

const quickStart = [
  { step: 1, title: "Get API Key", description: "Sign up and get your API key from the dashboard" },
  { step: 2, title: "Make Request", description: "Send your first API request with proper authentication" },
  { step: 3, title: "Process Response", description: "Handle the API response and download your processed image" },
]

const codeExample = `curl -X POST "https://api.pixel.com/v1/remove-background" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "image=@/path/to/your/image.jpg"`

export default function DocsPage() {
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
              API Documentation
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Build with <span className="text-[#d03232]">Pixel API</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Integrate powerful AI-driven image processing capabilities into your applications with our comprehensive
              API.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white">
                Get Started
              </Button>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-900 bg-transparent">
                View Examples
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Quick Start</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Get up and running with the Pixel API in minutes</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {quickStart.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Code Example */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Example Request
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-black rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">{codeExample}</code>
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* API Sections */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">API Reference</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Comprehensive documentation for all API endpoints</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {apiSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={section.href}>
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-lg flex items-center justify-center">
                          <section.icon className="w-6 h-6 text-white" />
                        </div>
                        {section.badge && (
                          <Badge
                            className={
                              section.badge === "Popular" ? "bg-[#d03232] text-white" : "bg-yellow-500 text-black"
                            }
                          >
                            {section.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white group-hover:text-[#d03232] transition-colors mb-2">
                            {section.title}
                          </h3>
                          <p className="text-gray-300">{section.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#d03232] group-hover:translate-x-1 transition-all ml-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SDKs and Libraries */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">SDKs & Libraries</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Official SDKs and community libraries for popular programming languages
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["JavaScript", "Python", "PHP", "Ruby"].map((lang, index) => (
              <motion.div
                key={lang}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Book className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{lang}</h3>
                    <p className="text-gray-300 text-sm">Official SDK</p>
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
