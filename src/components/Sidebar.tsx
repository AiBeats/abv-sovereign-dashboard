import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Thermometer,
  ShieldAlert,
  Network,
  HardDrive,
  ChevronLeft,
  ChevronRight,
  Lock,
} from 'lucide-react'
import { useTransit } from '@/context/TransitContext'

interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'thermal', label: 'Fortress Thermal', icon: Thermometer },
  { id: 'sos', label: 'Fortress SOS', icon: ShieldAlert },
  { id: 'protocol', label: 'Protocol-A3 Core', icon: Network },
  { id: 'vault', label: 'Crystal Vault', icon: HardDrive },
]

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const { isTransit } = useTransit()

  const accentColor = isTransit ? 'text-sovereign-orange' : 'text-sovereign-green'
  const accentBg = isTransit ? 'bg-sovereign-orange/10' : 'bg-sovereign-green/10'
  const accentBorder = isTransit ? 'border-sovereign-orange/30' : 'border-sovereign-green/30'

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="h-screen flex flex-col bg-sovereign-surface border-r border-sovereign-border relative z-20 flex-shrink-0"
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-sovereign-border">
        <div className="flex items-center gap-2 overflow-hidden">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
            <rect x="2" y="2" width="28" height="28" rx="4" stroke={isTransit ? '#ff6b35' : '#00ff88'} strokeWidth="2" />
            <path d="M8 24L16 6L24 24" stroke={isTransit ? '#ff6b35' : '#00ff88'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="11" y1="18" x2="21" y2="18" stroke={isTransit ? '#ff6b35' : '#00ff88'} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className={`font-semibold text-sm whitespace-nowrap ${accentColor}`}
              >
                ABV SOVEREIGN
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-hidden">
        {navItems.map(item => {
          const isActive = currentPage === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              data-testid={`nav-${item.id}`}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 
                ${isActive
                  ? `${accentBg} ${accentColor} ${accentBorder} border`
                  : 'text-sovereign-text-muted hover:text-sovereign-text hover:bg-sovereign-card border border-transparent'
                }
              `}
            >
              <Icon size={18} className="flex-shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sovereign-border px-3 py-3">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-1 text-[10px] text-sovereign-text-muted"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sovereign-green" />
                System: ONLINE
              </div>
              <div>Build: PUBLIC v1.0</div>
              <div className="flex items-center gap-1">
                <Lock size={10} />
                Private Modules: LOCKED
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        data-testid="sidebar-toggle"
        className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-sovereign-card border border-sovereign-border flex items-center justify-center text-sovereign-text-muted hover:text-sovereign-text transition-colors"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  )
}
