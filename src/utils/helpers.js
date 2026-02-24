export const storage = {
  get: (key, fallback = null) => {
    try {
      const val = localStorage.getItem(key)
      return val ? JSON.parse(val) : fallback
    } catch { return fallback }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  },
  remove: (key) => localStorage.removeItem(key),
}

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)

export const generateId = () => Math.random().toString(36).substr(2, 9)

export const getDiscount = (original, current) =>
  Math.round(((original - current) / original) * 100)

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export const COUPONS = {
  NEXMART10: 0.10,
  SAVE20: 0.20,
  WELCOME15: 0.15,
}
