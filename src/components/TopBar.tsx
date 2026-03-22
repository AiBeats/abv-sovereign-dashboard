import { motion, AnimatePresence } from 'framer-motion'
import { Plane, MapPin, Radio } from 'lucide-react'
import { useTransit } from '@/context/TransitContext'

interface TopBarProps {
  currentPage: string
}

const pageLabels: Record<string, string> = {
  dashboard: 'System Overview',
  thermal: 'Fortress Thermal',
  sos: 'Fortress SOS',
  protocol: 'Protocol-A3 Core',
  vault: 'Project Crystal Vault',
}

export default function TopBar({ currentPage }: TopBarProps) {
  const { isTransit, toggleTransit } = useTransit()

  return (
    <div className="h-14 border-b border-sovereign-border bg-sovereign-surface flex items-center justify-between px-6 flex-shrink-0">
      {/* Page title */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-sovereign-text">
          {pageLabels[currentPage] || 'Dashboard'}
        </h1>
        <span className="text-[10px] text-sovereign-text-muted px-2 py-0.5 bg-sovereign-card rounded border border-sovereign-border">
          {new Date().toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Transit toggle + indicators */}
      <div className="flex items-center gap-4">
        <AnimatePresence>
          {isTransit && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-3 text-xs"
            >
              <div className="flex items-center gap-1.5 text-sovereign-orange">
                <MapPin size={14} />
                <span>GPS Tethered</span>
              </div>
              <div className="flex items-center gap-1.5 text-sovereign-orange">
                <Radio size={14} />
                <span>Fob: 1m</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isTransit && (
          <div className="flex items-center gap-1.5 text-xs text-sovereign-text-muted">
            <Radio size={14} />
            <span>Fob: 2m</span>
          </div>
        )}

        {/* Transit toggle */}
        <button
          onClick={toggleTransit}
          data-testid="transit-toggle"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300
            ${isTransit
              ? 'bg-sovereign-orange/15 text-sovereign-orange border-sovereign-orange/40 shadow-[0_0_12px_rgba(255,107,53,0.15)]'
              : 'bg-sovereign-card text-sovereign-text-muted border-sovereign-border hover:text-sovereign-text hover:border-sovereign-border-light'
            }
          `}
        >
          <Plane size={14} />
          Transit Mode
          <div className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${isTransit ? 'bg-sovereign-orange' : 'bg-sovereign-border-light'}`}>
            <motion.div
              className="w-3 h-3 rounded-full bg-white absolute top-0.5"
              animate={{ left: isTransit ? 17 : 2 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </button>
      </div>
    </div>
  )
}
