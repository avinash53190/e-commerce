import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) return setError('Passwords do not match')
    if (form.password.length < 6) return setError('Password must be at least 6 characters')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const result = register(form.name, form.email, form.password)
    setLoading(false)
    if (result.success) navigate('/')
    else setError(result.error)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create account</h1>
          <p className="text-slate-500 mt-1">Join NexMart today</p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text' },
              { name: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email' },
              { name: 'password', label: 'Password', placeholder: '••••••••', type: 'password' },
              { name: 'confirm', label: 'Confirm Password', placeholder: '••••••••', type: 'password' },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={form[f.name]}
                  onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))} className="input" required />
              </div>
            ))}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base mt-2">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
