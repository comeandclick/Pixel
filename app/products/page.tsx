"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Filter, Search, ShoppingCart, Heart, Eye, Droplets } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/components/cart-provider"

const products = [
  {
    id: 1,
    name: "HYDRATE Pro",
    price: 89.99,
    originalPrice: 109.99,
    description: "Bouteille premium en acier inoxydable avec isolation thermique 24h",
    features: ["Isolation 24h", "Sans BPA", "Design ergonomique", "Acier inoxydable"],
    rating: 4.8,
    reviews: 124,
    category: "premium",
    colors: ["Noir", "Blanc", "Bleu"],
    sizes: ["500ml", "750ml", "1L"],
  },
  {
    id: 2,
    name: "HYDRATE Elite",
    price: 129.99,
    description: "Gourde intelligente avec capteurs de température et application connectée",
    features: ["Capteur de température", "App connectée", "Rappels hydratation", "Écran LED"],
    rating: 4.9,
    reviews: 89,
    category: "smart",
    colors: ["Noir", "Argent"],
    sizes: ["600ml", "800ml"],
  },
  {
    id: 3,
    name: "HYDRATE Classic",
    price: 59.99,
    description: "Bouteille en verre borosilicate avec bouchon en bambou naturel",
    features: ["Verre borosilicate", "Bouchon bambou", "Design minimaliste", "Écologique"],
    rating: 4.7,
    reviews: 156,
    category: "eco",
    colors: ["Transparent", "Fumé"],
    sizes: ["400ml", "600ml"],
  },
  {
    id: 4,
    name: "HYDRATE Sport",
    price: 69.99,
    description: "Bouteille sport avec poignée ergonomique et paille intégrée",
    features: ["Poignée ergonomique", "Paille intégrée", "Anti-fuite", "Facile à nettoyer"],
    rating: 4.6,
    reviews: 203,
    category: "sport",
    colors: ["Rouge", "Bleu", "Vert"],
    sizes: ["650ml", "900ml"],
  },
  {
    id: 5,
    name: "HYDRATE Travel",
    price: 79.99,
    description: "Bouteille pliable pour voyageurs avec système de compression",
    features: ["Pliable", "Compact", "Silicone alimentaire", "Mousqueton inclus"],
    rating: 4.5,
    reviews: 98,
    category: "travel",
    colors: ["Gris", "Bleu", "Orange"],
    sizes: ["500ml", "750ml"],
  },
  {
    id: 6,
    name: "HYDRATE Kids",
    price: 39.99,
    description: "Gourde pour enfants avec designs colorés et système anti-fuite",
    features: ["Design enfant", "Anti-fuite", "Facile à ouvrir", "Motifs amusants"],
    rating: 4.8,
    reviews: 167,
    category: "kids",
    colors: ["Rose", "Bleu", "Vert", "Jaune"],
    sizes: ["350ml", "450ml"],
  },
]

const categories = [
  { value: "all", label: "Tous les produits" },
  { value: "premium", label: "Premium" },
  { value: "smart", label: "Connecté" },
  { value: "eco", label: "Écologique" },
  { value: "sport", label: "Sport" },
  { value: "travel", label: "Voyage" },
  { value: "kids", label: "Enfants" },
]

const sortOptions = [
  { value: "featured", label: "Mis en avant" },
  { value: "price-low", label: "Prix croissant" },
  { value: "price-high", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
  { value: "newest", label: "Nouveautés" },
]

function ProductBottleSVG({ productId, className = "" }: { productId: number; className?: string }) {
  const colors = {
    1: { primary: "#1F2937", secondary: "#374151" }, // Pro - Dark
    2: { primary: "#374151", secondary: "#6B7280" }, // Elite - Tech
    3: { primary: "#059669", secondary: "#10B981" }, // Classic - Green
    4: { primary: "#DC2626", secondary: "#EF4444" }, // Sport - Red
    5: { primary: "#7C3AED", secondary: "#8B5CF6" }, // Travel - Purple
    6: { primary: "#EC4899", secondary: "#F472B6" }, // Kids - Pink
  }

  const color = colors[productId as keyof typeof colors] || colors[1]

  return (
    <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} transition={{ duration: 0.3 }} className={className}>
      <svg
        width="120"
        height="200"
        viewBox="0 0 120 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id={`productGradient-${productId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color.primary} />
            <stop offset="100%" stopColor={color.secondary} />
          </linearGradient>
          <linearGradient id={`waterGradient-${productId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>

        {/* Main bottle shape */}
        <path
          d="M30 50 L30 170 Q30 185 45 185 L75 185 Q90 185 90 170 L90 50 Q90 35 75 35 L45 35 Q30 35 30 50 Z"
          fill={`url(#productGradient-${productId})`}
          stroke="#1E40AF"
          strokeWidth="1.5"
        />

        {/* Water inside */}
        <motion.path
          d="M35 55 L35 165 Q35 175 45 175 L75 175 Q85 175 85 165 L85 55"
          fill={`url(#waterGradient-${productId})`}
          opacity="0.6"
          animate={{
            d: [
              "M35 55 L35 165 Q35 175 45 175 L75 175 Q85 175 85 165 L85 55",
              "M35 60 L35 165 Q35 175 45 175 L75 175 Q85 175 85 165 L85 60",
              "M35 55 L35 165 Q35 175 45 175 L75 175 Q85 175 85 165 L85 55",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Bottle cap */}
        <rect x="40" y="20" width="40" height="20" rx="4" fill="#374151" />
        <rect x="45" y="15" width="30" height="12" rx="3" fill="#6B7280" />

        {/* Label */}
        <rect x="42" y="90" width="36" height="40" rx="4" fill="white" opacity="0.95" />
        <text x="60" y="105" textAnchor="middle" className="text-xs font-bold fill-primary-600">
          HYDRATE
        </text>
        <text x="60" y="118" textAnchor="middle" className="text-xs fill-gray-600">
          {products.find((p) => p.id === productId)?.name.split(" ")[1] || "Pro"}
        </text>

        {/* Highlights */}
        <ellipse cx="50" cy="70" rx="6" ry="12" fill="white" opacity="0.25" />

        {/* Special features for different products */}
        {productId === 2 && (
          <>
            {/* LED indicator for Elite */}
            <circle cx="60" cy="45" r="3" fill="#10B981" opacity="0.8" />
            <motion.circle
              cx="60"
              cy="45"
              r="3"
              fill="#10B981"
              animate={{ opacity: [0.8, 0.3, 0.8] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </>
        )}

        {productId === 4 && (
          <>
            {/* Handle for Sport */}
            <path d="M90 80 Q105 80 105 95 Q105 110 90 110" stroke={color.primary} strokeWidth="3" fill="none" />
          </>
        )}
      </svg>
    </motion.div>
  )
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const { addItem } = useCart()

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Notre Collection
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez notre gamme complète de gourdes et bouteilles premium, conçues pour tous vos besoins
            d'hydratation.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-400 rounded-full"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-full">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-full">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé
              {filteredProducts.length > 1 ? "s" : ""}
            </p>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden">
                <div className="relative overflow-hidden rounded-t-3xl">
                  {product.originalPrice && (
                    <Badge className="absolute top-4 left-4 z-10 bg-red-500 text-white">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  )}

                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-10 h-10 p-0 rounded-full bg-white/90 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      variant="secondary"
                      className="w-10 h-10 p-0 rounded-full bg-white/90 hover:bg-white"
                    >
                      <Link href={`/products/${product.id}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center relative">
                    <ProductBottleSVG productId={product.id} />

                    {/* Floating droplet */}
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="absolute top-4 left-4 w-6 h-6 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Droplets className="w-3 h-3 text-primary-600" />
                    </motion.div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{product.price}€</div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">{product.originalPrice}€</div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{product.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>Couleurs: {product.colors.length}</span>
                      <span>Tailles: {product.sizes.length}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: `/placeholder.svg?height=400&width=400&text=${product.name}`,
                        })
                      }
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Ajouter
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="px-4 rounded-full border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-transparent"
                    >
                      <Link href={`/products/${product.id}`}>Voir</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Essayez de modifier vos critères de recherche ou de navigation.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full"
            >
              Réinitialiser les filtres
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
