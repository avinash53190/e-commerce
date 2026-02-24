import { createContext, useContext, useState, useEffect } from 'react'
import { storage, generateId } from '../utils/helpers'
import { defaultProducts } from '../data/products'

const ProductContext = createContext(null)

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const stored = storage.get('nx_products')
    return stored || defaultProducts
  })

  useEffect(() => { storage.set('nx_products', products) }, [products])

  const addProduct = (product) => {
    const newProduct = { ...product, id: generateId(), rating: 0, reviews: 0, stock: parseInt(product.stock) || 10 }
    setProducts(prev => [...prev, newProduct])
    return newProduct
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const addReview = (productId, review) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p
      const reviews = p.reviewList ? [...p.reviewList, review] : [review]
      const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      return { ...p, reviewList: reviews, rating: Math.round(avg * 10) / 10, reviews: reviews.length }
    }))
  }

  const getProduct = (id) => products.find(p => p.id === id)

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct, addReview, getProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext)
