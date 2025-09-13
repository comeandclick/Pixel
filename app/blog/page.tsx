"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

const posts = [
  {
    title: "The Future of AI in Creative Industries",
    excerpt: "Exploring how artificial intelligence is revolutionizing the way creators work and collaborate.",
    author: "Alex Chen",
    date: "March 15, 2024",
    category: "AI & Technology",
    image: "/placeholder.svg?height=300&width=500",
    slug: "future-ai-creative-industries",
  },
  {
    title: "10 Tips for Better Image Compression",
    excerpt: "Learn professional techniques to optimize your images without sacrificing quality.",
    author: "Sarah Johnson",
    date: "March 10, 2024",
    category: "Tutorial",
    image: "/placeholder.svg?height=300&width=500",
    slug: "image-compression-tips",
  },
  {
    title: "Background Removal: From Manual to AI",
    excerpt: "The evolution of background removal techniques and how AI has transformed the process.",
    author: "Mike Rodriguez",
    date: "March 5, 2024",
    category: "Technology",
    image: "/placeholder.svg?height=300&width=500",
    slug: "background-removal-evolution",
  },
  {
    title: "Building Accessible Design Tools",
    excerpt: "How we're making professional design tools accessible to everyone, regardless of skill level.",
    author: "Emily Davis",
    date: "February 28, 2024",
    category: "Design",
    image: "/placeholder.svg?height=300&width=500",
    slug: "accessible-design-tools",
  },
]

const categories = ["All", "AI & Technology", "Tutorial", "Design", "Company News"]

export default function BlogPage() {
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
              Pixel Blog
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Insights & <span className="text-[#d03232]">Updates</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay up to date with the latest news, tutorials, and insights from the Pixel team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`px-4 py-2 rounded-full transition-colors ${
                  index === 0
                    ? "bg-[#d03232] text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 h-full cursor-pointer group">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-[#d03232] text-white">{post.category}</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-white group-hover:text-[#d03232] transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
