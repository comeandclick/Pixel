"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, Gift, Truck, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { useLanguage } from "@/components/language-provider"

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart()
  const { t } = useLanguage()

  const shippingCost = total > 75 ? 0 : 5.99
  const finalTotal = total + shippingCost

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl">{t("cart.empty.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300">{t("cart.empty.message")}</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="btn-primary">
                    <Link href="/tools">{t("cart.empty.exploreTools")}</Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                  >
                    <Link href="/pricing">{t("cart.empty.viewPricing")}</Link>
                  </Button>
                </div>

                <Button asChild variant="ghost" className="text-gray-400 hover:text-white">
                  <Link href="/" className="flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t("cart.empty.backToHome")}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {t("cart.title")}
            </h1>
            <p className="text-gray-300">
              {items.length} {t("cart.items", { count: items.length })}
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="border-gray-700 hover:bg-gray-800 rounded-full bg-transparent text-white"
          >
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("cart.continueShopping")}
            </Link>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {item.variant && (
                          <Badge variant="secondary" className="mb-2">
                            {item.variant}
                          </Badge>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 p-0 rounded-full border-gray-300"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>

                            <span className="w-8 text-center font-medium">{item.quantity}</span>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0 rounded-full border-gray-300"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">
                              {(item.price * item.quantity).toFixed(2)}€
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.price}€ / {t("cart.unit")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Clear Cart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center pt-4"
            >
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 rounded-full bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t("cart.clearCart")}
              </Button>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Summary Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardTitle className="text-xl">{t("cart.summary.title")}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between text-gray-300">
                  <span>{t("cart.summary.subtotal")}</span>
                  <span>{total.toFixed(2)}€</span>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span>{t("cart.summary.shipping")}</span>
                  <span className={shippingCost === 0 ? "text-green-600 font-medium" : ""}>
                    {shippingCost === 0 ? t("cart.summary.freeShipping") : `${shippingCost}€`}
                  </span>
                </div>

                {total < 75 && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <Gift className="w-4 h-4 inline mr-1" />
                      {t("cart.summary.freeShippingThreshold", { amount: (75 - total).toFixed(2) })}
                    </p>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>{t("cart.summary.total")}</span>
                  <span>{finalTotal.toFixed(2)}€</span>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full mt-6"
                >
                  <Link href="/checkout">{t("cart.summary.checkout")}</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">{t("cart.promo.title")}</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder={t("cart.promo.placeholder")}
                    className="bg-white/50 border-gray-200 focus:border-blue-400 rounded-full"
                  />
                  <Button
                    variant="outline"
                    className="border-blue-200 hover:bg-blue-50 rounded-full px-6 bg-transparent"
                  >
                    {t("cart.promo.apply")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">{t("cart.benefits.title")}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Truck className="w-4 h-4 text-green-600" />
                    </div>
                    <span>{t("cart.benefits.freeShipping")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>{t("cart.benefits.warranty")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Gift className="w-4 h-4 text-purple-600" />
                    </div>
                    <span>{t("cart.benefits.giftWrap")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
