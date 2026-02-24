import { createContext, useContext, useState, useEffect } from 'react'
import { storage } from '../utils/helpers'

const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => storage.get('nx_theme', false))

  useEffect(() => {
    storage.set('nx_theme', dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const toggle = () => setDark(d => !d)

  return <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
