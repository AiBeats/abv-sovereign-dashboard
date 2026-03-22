import { useState } from 'react'
import { motion } from 'framer-motion'
import { HardDrive, Lock, Brain, Film, FileText, Settings, Power, Clock } from 'lucide-react'
import { useTransit } from '@/context/TransitContext'
import StatusDot from '@/components/StatusDot'
import { vaultCategories, vaultAccessLog } from '@/data/mockData'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
}

const iconMap: Record<string, typeof Brain> = {
  Brain,
  Film,
  FileText,
  Settings,
}

export default function VaultPage() {
  const { isTransit, accentHex } = useTransit()
  const accentColor = isTransit ? 'text-sovereign-orange' : 'text-sovereign-green'
  const accentBg = isTransit ? 'bg-sovereign-orange' : 'bg-sovereign-green'
  const accentBorder = isTransit ? 'border-sovereign-orange/20' : 'border-sovereign-green/20'

  const [mounted, setMounted] = useState(true)

  const usedPercent = (2.4 / 5.0) * 100

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 space-y-4"
    >
      {/* Top stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Storage */}
        <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <HardDrive size={16} className={accentColor} />
            <span className="text-xs text-sovereign-text-muted uppercase tracking-wider">Total Storage</span>
          </div>
          <div className="flex items-baseline gap-1 mb-3">
            <span className={`text-2xl font-bold ${accentColor}`}>2.4 TB</span>
            <span className="text-sm text-sovereign-text-muted">/ 5.0 TB</span>
          </div>
          <div className="w-full h-2.5 bg-sovereign-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: accentHex }}
              initial={{ width: 0 }}
              animate={{ width: `${usedPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <div className="text-[10px] text-sovereign-text-muted mt-1.5">{usedPercent.toFixed(0)}% used — 2.6 TB free</div>
        </motion.div>

        {/* Encryption */}
        <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lock size={16} className={accentColor} />
            <span className="text-xs text-sovereign-text-muted uppercase tracking-wider">Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusDot status="online" size="md" />
            <span className={`text-xl font-bold ${accentColor}`}>AES-256</span>
          </div>
          <div className="text-[10px] text-sovereign-text-muted mt-1">ACTIVE — Hardware-accelerated</div>
        </motion.div>

        {/* Mount Control */}
        <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Power size={16} className={accentColor} />
            <span className="text-xs text-sovereign-text-muted uppercase tracking-wider">Vault Mount</span>
          </div>
          <div className={`text-xl font-bold mb-3 ${mounted ? accentColor : 'text-sovereign-red'}`}>
            {mounted ? 'MOUNTED' : 'UNMOUNTED'}
          </div>
          <button
            onClick={() => setMounted(!mounted)}
            data-testid="mount-toggle"
            className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${mounted ? accentBg : 'bg-sovereign-border-light'}`}
          >
            <motion.div
              className="w-4 h-4 rounded-full bg-white absolute top-0.5"
              animate={{ left: mounted ? 21 : 2 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </motion.div>
      </div>

      {/* File Categories */}
      <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <HardDrive size={16} className={accentColor} />
          <span className="text-sm font-semibold text-sovereign-text">File Categories</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {vaultCategories.map(cat => {
            const Icon = iconMap[cat.icon] || FileText
            return (
              <div
                key={cat.name}
                className="bg-sovereign-surface rounded-lg p-4 border border-sovereign-border hover:border-sovereign-border-light transition-colors"
              >
                <Icon size={20} className={`${accentColor} mb-2`} />
                <div className="text-xs font-semibold text-sovereign-text">{cat.name}</div>
                <div className="text-[10px] text-sovereign-text-muted mt-1">{cat.count.toLocaleString()} files</div>
                <div className={`text-xs font-medium ${accentColor} mt-1`}>{cat.size}</div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Recent Access Log */}
      <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className={accentColor} />
          <span className="text-sm font-semibold text-sovereign-text">Recent File Access</span>
        </div>
        <div className="overflow-hidden rounded-lg border border-sovereign-border">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-sovereign-surface text-sovereign-text-muted">
                <th className="text-left px-4 py-2.5 font-medium">Timestamp</th>
                <th className="text-left px-4 py-2.5 font-medium">File</th>
                <th className="text-left px-4 py-2.5 font-medium">Action</th>
                <th className="text-left px-4 py-2.5 font-medium">Category</th>
              </tr>
            </thead>
            <tbody>
              {vaultAccessLog.map((entry, i) => (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-t border-sovereign-border hover:bg-sovereign-surface/50 transition-colors"
                >
                  <td className="px-4 py-2.5 text-sovereign-text-muted">{entry.timestamp}</td>
                  <td className="px-4 py-2.5 text-sovereign-text font-medium">{entry.file}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-medium border ${accentBorder} ${accentColor} bg-sovereign-surface`}>
                      {entry.action}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-sovereign-text-muted">{entry.category}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
