import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { formatPrice, getDiscount } from '../utils/helpers'

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(i => (
      <svg key={i} viewBox="0 0 20 20" className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'star-filled' : 'star-empty'}`} fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
  </div>
)

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const discount = product.originalPrice ? getDiscount(product.originalPrice, product.price) : 0
  const wished = isWishlisted(product.id)

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="badge bg-red-500 text-white">{discount}% OFF</span>
          )}
          {product.featured && (
            <span className="badge bg-brand-600 text-white">Featured</span>
          )}
        </div>
        <button
          onClick={() => toggle(product)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${wished ? 'bg-red-500 text-white' : 'bg-white/90 text-slate-400 hover:text-red-500'} shadow-md`}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs text-brand-600 font-semibold mb-1">{product.vendor}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 mb-2 hover:text-brand-600 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-slate-500 dark:text-slate-400">({product.reviews?.toLocaleString()})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through ml-2">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full btn-primary mt-3 text-sm py-2"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
