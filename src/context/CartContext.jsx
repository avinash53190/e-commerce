import { createContext, useContext, useState, useEffect } from 'react'
import { storage } from '../utils/helpers'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => storage.get('nx_cart', []))

  useEffect(() => { storage.set('nx_cart', items) }, [items])

  const addToCart = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
  }

  const clearCart = () => setItems([])

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const itemCount = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
