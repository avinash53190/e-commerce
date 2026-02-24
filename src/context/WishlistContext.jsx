import { createContext, useContext, useState, useEffect } from 'react'
import { storage } from '../utils/helpers'

const WishlistContext = createContext(null)

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() => storage.get('nx_wishlist', []))

  useEffect(() => { storage.set('nx_wishlist', items) }, [items])

  const toggle = (product) => {
    setItems(prev => prev.find(i => i.id === product.id)
      ? prev.filter(i => i.id !== product.id)
      : [...prev, product]
    )
  }

  const isWishlisted = (id) => items.some(i => i.id === id)

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
