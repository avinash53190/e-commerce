import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'
import { SkeletonGrid } from '../components/Skeleton'
import { categories } from '../data/products'

export default function Shop() {
  const { products } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [sort, setSort] = useState('default')
  const [priceRange, setPriceRange] = useState([0, 3000])

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    let res = [...products]
    if (search) res = res.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.vendor.toLowerCase().includes(search.toLowerCase()))
    if (category !== 'All') res = res.filter(p => p.category === category)
    res = res.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (sort === 'price-asc') res.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') res.sort((a, b) => b.price - a.price)
    else if (sort === 'rating') res.sort((a, b) => b.rating - a.rating)
    else if (sort === 'newest') res.sort((a, b) => b.id.localeCompare(a.id))
    return res
  }, [products, search, category, sort, priceRange])

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setCategory(cat)
  }, [searchParams])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Shop All Products</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{filtered.length} products found</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="card p-5 sticky top-24 space-y-6">
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-3 text-sm uppercase tracking-wide">Search</h3>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input"
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-3 text-sm uppercase tracking-wide">Category</h3>
              <div className="space-y-1.5">
                {['All', ...categories].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                      category === cat
                        ? 'bg-brand-600 text-white font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                    <span className={`float-right text-xs ${category === cat ? 'text-brand-200' : 'text-slate-400'}`}>
                      {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-3 text-sm uppercase tracking-wide">
                Max Price: ${priceRange[1].toLocaleString()}
              </h3>
              <input
                type="range" min="0" max="3000" step="50"
                value={priceRange[1]}
                onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-brand-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>$0</span><span>$3,000</span>
              </div>
            </div>

            <button
              onClick={() => { setSearch(''); setCategory('All'); setSort('default'); setPriceRange([0, 3000]) }}
              className="btn-secondary w-full text-sm"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">{filtered.length} results</p>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="input w-auto py-2 text-sm"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {loading ? (
            <SkeletonGrid count={8} />
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">No products found</h3>
              <p className="text-slate-400">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
