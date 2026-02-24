import { Link } from 'react-router-dom'
import { useOrders } from '../context/OrderContext'
import { useAuth } from '../context/AuthContext'
import { formatPrice, formatDate } from '../utils/helpers'

export default function Orders() {
  const { getUserOrders } = useOrders()
  const { user } = useAuth()
  const orders = getUserOrders(user.id)

  if (orders.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center animate-fade-in">
      <div className="text-7xl mb-6">📦</div>
      <h2 className="text-2xl font-bold mb-3">No orders yet</h2>
      <p className="text-slate-500 mb-8">Your order history will appear here</p>
      <Link to="/shop" className="btn-primary text-base px-8">Start Shopping</Link>
    </div>
  )

  const totalSpent = orders.reduce((s, o) => s + o.total, 0)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Orders</h1>
          <p className="text-slate-500 mt-1">{orders.length} orders · {formatPrice(totalSpent)} total spent</p>
        </div>
      </div>

      <div className="space-y-5">
        {orders.map(order => (
          <div key={order.id} className="card p-6 animate-slide-up">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Order #{order.id.toUpperCase()}</p>
                <p className="text-sm text-slate-400 mt-0.5">{formatDate(order.createdAt)}</p>
              </div>
              <div className="text-right">
                <span className="badge bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">✓ Confirmed</span>
                <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{formatPrice(order.total)}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {order.items.map(item => (
                <div key={item.id} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg bg-slate-100 dark:bg-slate-800" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`} className="text-sm font-medium line-clamp-1 hover:text-brand-600">{item.name}</Link>
                    <p className="text-xs text-slate-400 mt-0.5">Qty: {item.quantity} · {formatPrice(item.price)} each</p>
                    <p className="text-sm font-semibold text-brand-600">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 mt-4 pt-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">Shipped to</p>
                  <p className="font-medium">{order.billing?.city}, {order.billing?.country}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">Items</p>
                  <p className="font-medium">{order.items.reduce((s, i) => s + i.quantity, 0)} units</p>
                </div>
                {order.discount > 0 && (
                  <div>
                    <p className="text-slate-400 text-xs mb-0.5">Savings</p>
                    <p className="font-medium text-green-600">−{formatPrice(order.discount)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
