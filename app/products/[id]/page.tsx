"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Check, Truck, Shield, RotateCcw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { useParams } from "next/navigation"
import { AnimatedProductDisplay } from "@/components/animated-product-display"

const products = [
  {
    id: 1,
    name: "HYDRATE Pro",
    price: 89.99,
    originalPrice: 109.99,
    images: [
      "/placeholder.svg?height=600&width=400&text=HYDRATE+Pro+Premium",
      "/placeholder.svg?height=600&width=400&text=HYDRATE+Pro+Side+View",
      "/placeholder.svg?height=600&width=400&text=HYDRATE+Pro+Details",
    ],
    description:
      "La HYDRATE Pro est notre bouteille premium en acier inoxydable, conçue pour les professionnels et les passionnés d'hydratation. Avec son isolation thermique de 24 heures, elle maintient vos boissons à la température idéale toute la journée.",
    features: [
      "Isolation thermique 24h chaud/froid",
      "Acier inoxydable 18/8 de qualité alimentaire",
      "Sans BPA, phtalates et toxines",
      "Design ergonomique antidérapant",
      "Bouchon étanche à 100%",
      "Compatible lave-vaisselle",
    ],
    specifications: {
      Matériau: "Acier inoxydable 18/8",
      Capacité: "500ml, 750ml, 1L",
      Poids: "320g (500ml)",
      Dimensions: "25cm x 7cm",
      Isolation: "Double paroi sous vide",
      Garantie: "2 ans",
    },
    colors: ["Noir Mat", "Blanc Nacré", "Bleu Océan", "Rose Gold"],
    sizes: ["500ml", "750ml", "1L"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: 2,
    name: "HYDRATE Elite",
    price: 129.99,
    images: [
      "/placeholder.svg?height=600&width=400&text=HYDRATE+Elite+Smart",
      "/placeholder.svg?height=600&width=400&text=HYDRATE+Elite+Tech",
      "/placeholder.svg?height=600&width=400&text=HYDRATE+Elite+App",
    ],
    description:
      "La HYDRATE Elite révolutionne l'hydratation avec sa technologie connectée. Équipée de capteurs intelligents et d'une application dédiée, elle vous accompagne dans vos objectifs d'hydratation quotidiens.",
    features: [
      "Capteur de température intégré",
      "Application mobile connectée",
      "Rappels d'hydratation personnalisés",
      "Écran LED tactile",
      "Batterie longue durée (30 jours)",
      "Suivi des statistiques d'hydratation",
    ],
    specifications: {
      Matériau: "Acier inoxydable + Électronique",
      Capacité: "600ml, 800ml",
      Poids: "450g (600ml)",
      Dimensions: "26cm x 8cm",
      Connectivité: "Bluetooth 5.0",
      Batterie: "Li-ion rechargeable",
    },
    colors: ["Noir Tech", "Argent Futuriste"],
    sizes: ["600ml", "800ml"],
    rating: 4.9,
    reviews: 89,
    inStock: true,
  },
  {
    id: 3,
    name: "HYDRATE Classic",
    price: 59.99,
    images: [
      "/placeholder.svg?height=600&width=400&text=HYDRATE+Classic+Glass",
      "/placeholder.svg?height=600&width=400&text=HYDRATE+Classic+Bamboo",
      "/placeholder.svg?height=600&width=400&text=HYDRATE+Classic+Eco",
    ],
    description:
      "La HYDRATE Classic allie élégance et durabilité avec son design en verre borosilicate et son bouchon en bambou naturel. Parfaite pour une hydratation pure et écologique.",
    features: [
      "Verre borosilicate résistant",
      "Bouchon en bambou naturel",
      "Design minimaliste et élégant",
      "100% recyclable et écologique",
      "Facile à nettoyer",
      "Goût neutre garanti",
    ],
    specifications: {
      Matériau: "Verre borosilicate + Bambou",
      Capacité: "400ml, 600ml",
      Poids: "280g (400ml)",
      Dimensions: "22cm x 6.5cm",
      Résistance: "Chocs thermiques",
      Entretien: "Lave-vaisselle compatible",
    },
    colors: ["Transparent", "Fumé Élégant"],
    sizes: ["400ml", "600ml"],
    rating: 4.7,
    reviews: 156,
    inStock: true,
  },
]

export default function ProductPage() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)
  const product = products.find((p) => p.id === productId)

  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const { addItem } = useCart()

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Produit non trouvé</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Le produit que vous recherchez n'existe pas.</p>
            <Button
              asChild
              className="bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white rounded-full"
            >
              <Link href="/products">Retour aux produits</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      variant: `${selectedColor} - ${selectedSize}`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-8"
        >
          <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">
            Accueil
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary-600 dark:hover:text-primary-400">
            Produits
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button
            asChild
            variant="outline"
            className="border-primary-200 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-full bg-transparent"
          >
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux produits
            </Link>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <AnimatedProductDisplay product={product} />

              {product.originalPrice && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? "border-primary-600 scale-105"
                      : "border-gray-200 dark:border-gray-700 hover:border-primary-400"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-300">({product.reviews} avis)</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold text-primary-600">{product.price}€</div>
                {product.originalPrice && (
                  <div className="text-xl text-gray-400 line-through">{product.originalPrice}€</div>
                )}
                {product.inStock ? (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <Check className="w-3 h-3 mr-1" />
                    En stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Rupture de stock</Badge>
                )}
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Couleur</label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-300 ${
                      selectedColor === color
                        ? "border-primary-600 bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
                        : "border-gray-200 dark:border-gray-700 hover:border-primary-400 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Taille</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-full">
                  <SelectValue placeholder="Choisir une taille" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Quantité</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 p-0 rounded-full border-gray-300 dark:border-gray-600"
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium text-gray-900 dark:text-white">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 p-0 rounded-full border-gray-300 dark:border-gray-600"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!selectedColor || !selectedSize || !product.inStock}
                className="flex-1 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white rounded-full py-3"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Ajouter au panier - {(product.price * quantity).toFixed(2)}€
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-12 h-12 p-0 rounded-full border-gray-300 dark:border-gray-600 bg-transparent"
              >
                <Heart className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-12 h-12 p-0 rounded-full border-gray-300 dark:border-gray-600 bg-transparent"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">Livraison gratuite</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">dès 75€</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">Garantie 2 ans</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Satisfait ou remboursé</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-2">
                  <RotateCcw className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">Retour gratuit</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">30 jours</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2">
              <TabsTrigger value="features" className="rounded-xl">
                Caractéristiques
              </TabsTrigger>
              <TabsTrigger value="specifications" className="rounded-xl">
                Spécifications
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-xl">
                Avis clients
              </TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-8">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Caractéristiques principales
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Spécifications techniques</h3>
                  <div className="space-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">{key}</span>
                        <span className="text-gray-600 dark:text-gray-300">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Avis clients</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">{product.rating}</span>
                      <span className="text-gray-600 dark:text-gray-300">({product.reviews} avis)</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Sample reviews */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 dark:text-primary-400 font-semibold">M</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Marie L.</div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">il y a 2 semaines</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Excellente qualité ! La bouteille garde mes boissons chaudes pendant des heures. Le design est
                        élégant et la prise en main parfaite.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 dark:text-primary-400 font-semibold">J</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Julien M.</div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                              <Star className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">il y a 1 mois</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Très satisfait de mon achat. La livraison était rapide et l'emballage soigné. Je recommande
                        vivement cette marque.
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-6 border-primary-200 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-full bg-transparent"
                  >
                    Voir tous les avis
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Produits similaires</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{relatedProduct.name}</h4>
                      <span className="text-xl font-bold text-primary-600">{relatedProduct.price}€</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(relatedProduct.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">({relatedProduct.reviews})</span>
                    </div>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white rounded-full"
                    >
                      <Link href={`/products/${relatedProduct.id}`}>Voir le produit</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
