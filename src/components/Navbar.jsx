import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import { useWishlist } from '../context/WishlistContext'

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
)
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)
const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth()
  const { itemCount } = useCart()
  const { dark, toggle } = useTheme()
  const { items: wishlist } = useWishlist()
  const navigate = useNavigate()

  const navLink = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-brand-600' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white">NexMart</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" end className={navLink}>Home</NavLink>
          <NavLink to="/shop" className={navLink}>Shop</NavLink>
          <NavLink to="/categories" className={navLink}>Categories</NavLink>
          {isAdmin && <NavLink to="/admin" className={navLink}>Dashboard</NavLink>}
        </nav>

        <div className="flex items-center gap-1">
          <button onClick={toggle} className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          <Link to="/cart" className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <CartIcon />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </Link>

          {user && (
            <Link to="/profile" className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              <HeartIcon />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-2 ml-1">
              <Link to="/profile" className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
                  {user.name[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={() => { logout(); navigate('/') }} className="btn-secondary text-sm py-1.5 px-3">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-1">
              <Link to="/login" className="btn-secondary text-sm py-1.5 px-3">Login</Link>
              <Link to="/register" className="btn-primary text-sm py-1.5 px-3">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
