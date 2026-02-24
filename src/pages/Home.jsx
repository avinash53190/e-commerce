import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'
import { categories } from '../data/products'

const categoryIcons = {
  Electronics: '⚡',
  Fashion: '👗',
  'Home & Office': '🏠',
  Kitchen: '☕',
  Sports: '🏃',
}

const categoryColors = {
  Electronics: 'from-blue-500 to-cyan-500',
  Fashion: 'from-pink-500 to-rose-500',
  'Home & Office': 'from-amber-500 to-orange-500',
  Kitchen: 'from-green-500 to-emerald-500',
  Sports: 'from-purple-500 to-violet-500',
}

export default function Home() {
  const { products } = useProducts()
  const featured = products.filter(p => p.featured).slice(0, 4)

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>500+ Verified Vendors</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Shop the Future,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">
                Delivered Today
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Discover premium products from top vendors worldwide. Curated collections, unbeatable prices, and lightning-fast delivery.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary text-base px-8 py-3 rounded-2xl">
                Explore Shop →
              </Link>
              <Link to="/categories" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3 rounded-2xl transition-all">
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Products', value: `${products.length}+` },
            { label: 'Vendors', value: '9+' },
            { label: 'Happy Customers', value: '12K+' },
            { label: 'Categories', value: `${categories.length}` },
          ].map(s => (
            <div key={s.label} className="card px-6 py-5 text-center">
              <div className="text-2xl font-bold text-brand-600 mb-1">{s.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Shop by Category</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Find exactly what you're looking for</p>
          </div>
          <Link to="/categories" className="text-brand-600 text-sm font-semibold hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(cat => (
            <Link
              key={cat}
              to={`/shop?category=${cat}`}
              className="card p-6 text-center hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${categoryColors[cat]} flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                {categoryIcons[cat]}
              </div>
              <p className="font-semibold text-sm text-slate-700 dark:text-slate-200">{cat}</p>
              <p className="text-xs text-slate-400 mt-1">{products.filter(p => p.category === cat).length} items</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Featured Products</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Handpicked by our team</p>
          </div>
          <Link to="/shop" className="text-brand-600 text-sm font-semibold hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-brand-600 to-accent-600 p-10 md:p-16 text-white relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-lg">
            <p className="text-brand-200 font-semibold mb-2 text-sm uppercase tracking-wide">Limited Time Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get 10% off your first order</h2>
            <p className="text-brand-100 mb-6">Use code <span className="font-bold bg-white/20 px-2 py-0.5 rounded">NEXMART10</span> at checkout</p>
            <Link to="/shop" className="bg-white text-brand-600 font-bold px-8 py-3 rounded-2xl hover:bg-brand-50 transition-all inline-block">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">All Products</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{products.length} products available</p>
          </div>
          <Link to="/shop" className="text-brand-600 text-sm font-semibold hover:underline">See all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
