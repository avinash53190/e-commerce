import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { formatPrice, getDiscount, generateId } from '../utils/helpers'
import ProductCard from '../components/ProductCard'

const StarRating = ({ rating, size = 'md' }) => {
  const s = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} viewBox="0 0 20 20" className={`${s} ${i <= Math.round(rating) ? 'star-filled' : 'star-empty'}`} fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const { products, addReview, getProduct } = useProducts()
  const { addToCart } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const { user } = useAuth()
  const product = getProduct(id)
  const [qty, setQty] = useState(1)
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [showSuccess, setShowSuccess] = useState(false)

  if (!product) return (
    <div className="text-center py-32">
      <div className="text-6xl mb-4">😕</div>
      <h2 className="text-2xl font-bold mb-2">Product not found</h2>
      <Link to="/shop" className="btn-primary inline-block">Back to Shop</Link>
    </div>
  )

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const discount = product.originalPrice ? getDiscount(product.originalPrice, product.price) : 0
  const wished = isWishlisted(product.id)

  const handleAddCart = () => {
    addToCart(product, qty)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const submitReview = () => {
    if (!reviewText.trim()) return
    addReview(product.id, {
      id: generateId(),
      userId: user.id,
      userName: user.name,
      rating: reviewRating,
      text: reviewText,
      date: new Date().toISOString(),
    })
    setReviewText('')
    setReviewRating(5)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-brand-600">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-brand-600">{product.category}</Link>
        <span>/</span>
        <span className="text-slate-700 dark:text-slate-300">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {discount > 0 && (
            <div className="absolute top-4 left-4 badge bg-red-500 text-white text-sm px-3 py-1">{discount}% OFF</div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div>
            <Link to={`/shop?category=${product.category}`} className="text-brand-600 font-semibold text-sm hover:underline">{product.category}</Link>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 leading-tight">{product.name}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">by {product.vendor}</p>
          </div>

          <div className="flex items-center gap-3">
            <StarRating rating={product.rating} size="lg" />
            <span className="text-slate-600 dark:text-slate-300 font-semibold">{product.rating}</span>
            <span className="text-slate-400">({product.reviews?.toLocaleString()} reviews)</span>
          </div>

          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-slate-900 dark:text-white">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xl text-slate-400 line-through mb-1">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-2">
            <span className={`badge ${product.stock > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700'}`}>
              {product.stock > 0 ? `✓ In Stock (${product.stock})` : '✗ Out of Stock'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors">−</button>
              <span className="px-4 py-3 font-semibold min-w-[3rem] text-center">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors">+</button>
            </div>
            <button onClick={handleAddCart} disabled={product.stock === 0} className="btn-primary flex-1 py-3 relative">
              {showSuccess ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
            <button
              onClick={() => toggle(product)}
              className={`p-3 rounded-xl border transition-all ${wished ? 'bg-red-500 border-red-500 text-white' : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:border-red-300'}`}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {product.tags?.map(tag => (
              <span key={tag} className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Customer Reviews</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Write Review */}
          {user && (
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-4">Write a Review</h3>
              <div className="mb-4">
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">Your Rating</p>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(r => (
                    <button key={r} onClick={() => setReviewRating(r)} className={r <= reviewRating ? 'star-filled text-2xl' : 'star-empty text-2xl'}>★</button>
                  ))}
                </div>
              </div>
              <textarea
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Share your experience..."
                className="input h-28 resize-none mb-3"
              />
              <button onClick={submitReview} disabled={!reviewText.trim()} className="btn-primary">Submit Review</button>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {(product.reviewList || []).length === 0 ? (
              <div className="card p-8 text-center text-slate-400">
                <p className="text-4xl mb-2">💬</p>
                <p>No reviews yet. Be the first!</p>
              </div>
            ) : (
              product.reviewList.map(r => (
                <div key={r.id} className="card p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-brand-600 font-bold text-sm">
                      {r.userName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{r.userName}</p>
                      <StarRating rating={r.rating} />
                    </div>
                    <span className="ml-auto text-xs text-slate-400">{new Date(r.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{r.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
