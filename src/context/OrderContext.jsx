import { createContext, useContext, useState, useEffect } from 'react'
import { storage, generateId } from '../utils/helpers'

const OrderContext = createContext(null)

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => storage.get('nx_orders', []))

  useEffect(() => { storage.set('nx_orders', orders) }, [orders])

  const placeOrder = (cartItems, total, billing, discount = 0) => {
    const order = {
      id: generateId(),
      items: cartItems,
      total,
      discount,
      billing,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      userId: storage.get('nx_user')?.id,
    }
    setOrders(prev => [order, ...prev])
    return order
  }

  const getUserOrders = (userId) => orders.filter(o => o.userId === userId)

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getUserOrders }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => useContext(OrderContext)
