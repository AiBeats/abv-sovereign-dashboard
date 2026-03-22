import { createContext, useContext, useState, type ReactNode } from 'react'

interface TransitContextType {
  isTransit: boolean
  toggleTransit: () => void
  accent: string
  accentHex: string
}

const TransitContext = createContext<TransitContextType>({
  isTransit: false,
  toggleTransit: () => {},
  accent: 'text-sovereign-green',
  accentHex: '#00ff88',
})

export function TransitProvider({ children }: { children: ReactNode }) {
  const [isTransit, setIsTransit] = useState(false)

  const toggleTransit = () => setIsTransit(prev => !prev)

  const accent = isTransit ? 'text-sovereign-orange' : 'text-sovereign-green'
  const accentHex = isTransit ? '#ff6b35' : '#00ff88'

  return (
    <TransitContext.Provider value={{ isTransit, toggleTransit, accent, accentHex }}>
      {children}
    </TransitContext.Provider>
  )
}

export const useTransit = () => useContext(TransitContext)
