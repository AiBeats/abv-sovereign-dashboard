import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TransitProvider, useTransit } from '@/context/TransitContext'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import DashboardPage from '@/pages/DashboardPage'
import ThermalPage from '@/pages/ThermalPage'
import SosPage from '@/pages/SosPage'
import ProtocolPage from '@/pages/ProtocolPage'
import VaultPage from '@/pages/VaultPage'

function AppLayout() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const { isTransit } = useTransit()

  const renderPage = () => {
    switch (currentPage) {
      case 'thermal':
        return <ThermalPage />
      case 'sos':
        return <SosPage />
      case 'protocol':
        return <ProtocolPage />
      case 'vault':
        return <VaultPage />
      default:
        return <DashboardPage onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="flex h-screen bg-sovereign-bg overflow-hidden font-mono">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar currentPage={currentPage} />

        {/* Transit Banner */}
        <AnimatePresence>
          {isTransit && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="transit-pulse bg-sovereign-orange/10 border-b border-sovereign-orange/30 px-6 py-2 flex items-center justify-center gap-2 text-sovereign-orange text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-sovereign-orange animate-pulse" />
                TRANSIT ACTIVE — GPS TETHER ENGAGED — PERIMETER REDUCED
                <span className="w-2 h-2 rounded-full bg-sovereign-orange animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer Attribution */}
        <footer className="border-t border-sovereign-border bg-sovereign-surface px-6 py-2 text-[10px] text-sovereign-text-muted flex items-center justify-between">
          <span>ABV Sovereign Stack — PUBLIC v1.0</span>
          <a
            href="https://www.perplexity.ai/computer"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sovereign-text transition-colors"
          >
            Created with Perplexity Computer
          </a>
        </footer>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <TransitProvider>
      <AppLayout />
    </TransitProvider>
  )
}
