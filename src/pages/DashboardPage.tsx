import { motion } from 'framer-motion'
import { Thermometer, ShieldAlert, Network, HardDrive } from 'lucide-react'
import StatusDot from '@/components/StatusDot'
import { useTransit } from '@/context/TransitContext'

interface DashboardPageProps {
  onNavigate: (page: string) => void
}

const modules = [
  {
    id: 'thermal',
    name: 'Fortress Thermal',
    icon: Thermometer,
    status: 'online' as const,
    metric: 'CPU: 62°C',
    description: 'Adaptive thermal governor',
  },
  {
    id: 'sos',
    name: 'Fortress SOS',
    icon: ShieldAlert,
    status: 'online' as const,
    metric: 'Relay: CONNECTED',
    description: 'Remote lock & wipe relay',
  },
  {
    id: 'protocol',
    name: 'Protocol-A3 Core',
    icon: Network,
    status: 'online' as const,
    metric: 'Env: HOME',
    description: 'Network fingerprinting',
  },
  {
    id: 'vault',
    name: 'Crystal Vault',
    icon: HardDrive,
    status: 'online' as const,
    metric: '2.4 TB / 5.0 TB',
    description: 'Encrypted file system',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { isTransit } = useTransit()
  const accentColor = isTransit ? 'text-sovereign-orange' : 'text-sovereign-green'
  const accentBorder = isTransit ? 'border-sovereign-orange/20' : 'border-sovereign-green/20'
  const accentGlow = isTransit
    ? 'hover:shadow-[0_0_20px_rgba(255,107,53,0.08)]'
    : 'hover:shadow-[0_0_20px_rgba(0,255,136,0.08)]'

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6"
    >
      {/* Header */}
      <motion.div variants={cardVariants} className="mb-6">
        <h2 className={`text-lg font-semibold ${accentColor}`}>Module Status</h2>
        <p className="text-xs text-sovereign-text-muted mt-1">
          All public modules operational — Private layer: LOCKED
        </p>
      </motion.div>

      {/* 2x2 Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        {modules.map(mod => {
          const Icon = mod.icon
          return (
            <motion.button
              key={mod.id}
              variants={cardVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onNavigate(mod.id)}
              data-testid={`card-${mod.id}`}
              className={`bg-sovereign-card border ${accentBorder} rounded-xl p-5 text-left transition-all duration-300 ${accentGlow} group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-lg bg-sovereign-surface border border-sovereign-border`}>
                  <Icon size={20} className={accentColor} />
                </div>
                <div className="flex items-center gap-2">
                  <StatusDot status={mod.status} />
                  <span className="text-[10px] uppercase tracking-wider text-sovereign-text-muted font-medium">
                    {mod.status}
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-sovereign-text mb-1">{mod.name}</h3>
              <p className="text-[11px] text-sovereign-text-muted mb-3">{mod.description}</p>
              <div className={`text-xs font-medium ${accentColor} bg-sovereign-surface rounded-md px-3 py-1.5 inline-block border border-sovereign-border`}>
                {mod.metric}
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* System summary bar */}
      <motion.div
        variants={cardVariants}
        className="mt-6 bg-sovereign-card border border-sovereign-border rounded-xl p-4 max-w-4xl"
      >
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <StatusDot status="online" />
              <span className="text-sovereign-text-muted">System Health:</span>
              <span className={accentColor}>NOMINAL</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sovereign-text-muted">Uptime:</span>
              <span className="text-sovereign-text">14d 6h 42m</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sovereign-text-muted">Last Sync:</span>
            <span className="text-sovereign-text">2m ago</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
