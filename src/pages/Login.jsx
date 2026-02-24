import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const result = login(form.email, form.password)
    setLoading(false)
    if (result.success) navigate(from, { replace: true })
    else setError(result.error)
  }

  const fillDemo = (type) => {
    if (type === 'admin') setForm({ email: 'admin@nexmart.com', password: 'admin123' })
    else setForm({ email: 'user@nexmart.com', password: 'user123' })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h1>
          <p className="text-slate-500 mt-1">Sign in to your NexMart account</p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Email</label>
              <input type="email" placeholder="you@example.com" value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="input" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Password</label>
              <input type="password" placeholder="••••••••" value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))} className="input" required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base mt-2">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6">
            <p className="text-xs text-slate-400 text-center mb-3">Quick Demo Access</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => fillDemo('user')} className="btn-secondary text-sm py-2">
                👤 Demo User
              </button>
              <button onClick={() => fillDemo('admin')} className="btn-secondary text-sm py-2">
                ⚙️ Demo Admin
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-600 font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
