"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  variant?: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number, variant?: string) => void
  updateQuantity: (id: number, quantity: number, variant?: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  const addItem = useCallback(
    (newItem: Omit<CartItem, "quantity">) => {
      setItems((currentItems) => {
        const existingItemIndex = currentItems.findIndex(
          (item) => item.id === newItem.id && item.variant === newItem.variant,
        )

        if (existingItemIndex > -1) {
          // Item already exists, increase quantity
          const updatedItems = [...currentItems]
          updatedItems[existingItemIndex].quantity += 1

          toast({
            title: "Quantité mise à jour",
            description: `${newItem.name} (quantité: ${updatedItems[existingItemIndex].quantity})`,
          })

          return updatedItems
        } else {
          // New item, add to cart
          toast({
            title: "Produit ajouté au panier",
            description: `${newItem.name} a été ajouté à votre panier`,
          })

          return [...currentItems, { ...newItem, quantity: 1 }]
        }
      })
    },
    [toast],
  )

  const removeItem = useCallback(
    (id: number, variant?: string) => {
      setItems((currentItems) => {
        const filteredItems = currentItems.filter((item) => !(item.id === id && item.variant === variant))

        toast({
          title: "Produit retiré",
          description: "Le produit a été retiré de votre panier",
        })

        return filteredItems
      })
    },
    [toast],
  )

  const updateQuantity = useCallback(
    (id: number, quantity: number, variant?: string) => {
      if (quantity <= 0) {
        removeItem(id, variant)
        return
      }

      setItems((currentItems) => {
        return currentItems.map((item) => {
          if (item.id === id && item.variant === variant) {
            return { ...item, quantity }
          }
          return item
        })
      })
    },
    [removeItem],
  )

  const clearCart = useCallback(() => {
    setItems([])
    toast({
      title: "Panier vidé",
      description: "Tous les produits ont été retirés de votre panier",
    })
  }, [toast])

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }, [items])

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [items])

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
