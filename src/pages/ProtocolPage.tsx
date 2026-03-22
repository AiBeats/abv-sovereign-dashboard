import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Network, Wifi, Globe, Shield, MapPin, Radio, Eye } from 'lucide-react'
import { useTransit } from '@/context/TransitContext'
import StatusDot from '@/components/StatusDot'
import { networkFingerprint, networkHistory } from '@/data/mockData'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
}

export default function ProtocolPage() {
  const { isTransit, accentHex } = useTransit()
  const accentColor = isTransit ? 'text-sovereign-orange' : 'text-sovereign-green'
  const accentBorder = isTransit ? 'border-sovereign-orange/20' : 'border-sovereign-green/20'

  const envColorMap: Record<string, string> = {
    HOME: isTransit ? 'text-sovereign-orange' : 'text-sovereign-green',
    OFFICE: 'text-blue-400',
    TRANSIT: 'text-sovereign-orange',
    UNKNOWN: 'text-sovereign-red',
  }

  const threatColorMap: Record<string, string> = {
    LOW: isTransit ? 'text-sovereign-orange' : 'text-sovereign-green',
    MEDIUM: 'text-sovereign-yellow',
    HIGH: 'text-sovereign-red',
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 space-y-4"
    >
      {/* Top row: Environment + VPN + Threat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className={accentColor} />
            <span className="text-xs text-sovereign-text-muted uppercase tracking-wider">Environment</span>
          </div>
          <div className={`text-2xl font-bold ${envColorMap[networkFingerprint.environment]}`}>
            {networkFingerprint.environment}
          </div>
          <div className="text-[10px] text-sovereign-text-muted mt-1">Detected via network fingerprint</div>
        </motion.div>

        <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={16} className={accentColor} />
            <span className="text-xs text-sovereign-text-muted uppercase tracking-wider">VPN / Mesh Sync</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-sovereign-text-muted">VPN</span>
              <div className="flex items-center gap-1.5">
                <StatusDot status="online" />
                <span className={`text-xs font-medium ${accentColor}`}>{networkFingerprint.vpnStatus}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-sovereign-text-muted">Mesh</span>
              <div className="flex items-center gap-1.5">
                <StatusDot status="online" />
                <span className={`text-xs font-medium ${accentColor}`}>{networkFingerprint.meshSync}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Eye size={16} className={accentColor} />
            <span className="text-xs text-sovereign-text-muted uppercase tracking-wider">Threat Level</span>
          </div>
          <div className={`text-2xl font-bold ${threatColorMap[networkFingerprint.threatLevel]}`}>
            {networkFingerprint.threatLevel}
          </div>
          <div className="mt-2 w-full h-2 bg-sovereign-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: accentHex }}
              initial={{ width: 0 }}
              animate={{ width: '20%' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Network Fingerprint Detail */}
      <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Network size={16} className={accentColor} />
          <span className="text-sm font-semibold text-sovereign-text">Network Fingerprint</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-sovereign-surface rounded-lg p-3 border border-sovereign-border">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Wifi size={12} className="text-sovereign-text-muted" />
              <span className="text-[10px] text-sovereign-text-muted uppercase">SSID</span>
            </div>
            <span className={`text-xs font-medium ${accentColor}`}>{networkFingerprint.ssid}</span>
          </div>
          <div className="bg-sovereign-surface rounded-lg p-3 border border-sovereign-border">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Radio size={12} className="text-sovereign-text-muted" />
              <span className="text-[10px] text-sovereign-text-muted uppercase">Gateway MAC</span>
            </div>
            <span className="text-xs font-medium text-sovereign-text">{networkFingerprint.gatewayMAC}</span>
          </div>
          <div className="bg-sovereign-surface rounded-lg p-3 border border-sovereign-border">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Globe size={12} className="text-sovereign-text-muted" />
              <span className="text-[10px] text-sovereign-text-muted uppercase">Public IP</span>
            </div>
            <span className="text-xs font-medium text-sovereign-text">{networkFingerprint.publicIP}</span>
          </div>
          <div className="bg-sovereign-surface rounded-lg p-3 border border-sovereign-border">
            <div className="flex items-center gap-1.5 mb-1.5">
              <MapPin size={12} className="text-sovereign-text-muted" />
              <span className="text-[10px] text-sovereign-text-muted uppercase">Geo</span>
            </div>
            <span className="text-xs font-medium text-sovereign-text">{networkFingerprint.geo}</span>
          </div>
        </div>
      </motion.div>

      {/* Environment History Chart */}
      <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Network size={16} className={accentColor} />
          <span className="text-sm font-semibold text-sovereign-text">Environment History</span>
          <span className="text-[10px] text-sovereign-text-muted">(Threat Level over Time)</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={networkHistory} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: '#64748b' }}
              axisLine={{ stroke: '#1e293b' }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 5]}
              tick={{ fontSize: 10, fill: '#64748b' }}
              axisLine={{ stroke: '#1e293b' }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#151c2c',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
              }}
              labelStyle={{ color: '#64748b' }}
              formatter={(value: number, _name: string, props: any) => [
                `Threat: ${value}`,
                `Env: ${props.payload.env}`,
              ]}
            />
            <Bar
              dataKey="threat"
              fill={accentHex}
              radius={[4, 4, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  )
}
