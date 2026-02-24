import { createContext, useContext, useState, useEffect } from 'react'
import { storage, generateId } from '../utils/helpers'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => storage.get('nx_user'))
  const [users, setUsers] = useState(() => storage.get('nx_users', [
    { id: 'admin1', name: 'Admin User', email: 'admin@nexmart.com', password: 'admin123', role: 'admin', createdAt: new Date().toISOString() },
    { id: 'user1', name: 'John Doe', email: 'user@nexmart.com', password: 'user123', role: 'user', createdAt: new Date().toISOString() },
  ]))

  useEffect(() => { storage.set('nx_users', users) }, [users])
  useEffect(() => { storage.set('nx_user', user) }, [user])

  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { success: false, error: 'Invalid email or password' }
    setUser(found)
    return { success: true, user: found }
  }

  const register = (name, email, password) => {
    if (users.find(u => u.email === email)) return { success: false, error: 'Email already exists' }
    const newUser = { id: generateId(), name, email, password, role: 'user', createdAt: new Date().toISOString() }
    setUsers(prev => [...prev, newUser])
    setUser(newUser)
    return { success: true, user: newUser }
  }

  const logout = () => { setUser(null); storage.remove('nx_user') }

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    setUsers(prev => prev.map(u => u.id === user.id ? updated : u))
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
