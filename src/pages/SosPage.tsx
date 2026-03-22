import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldAlert, ShieldCheck, Radio, Clock, AlertTriangle, Activity } from 'lucide-react'
import { useTransit } from '@/context/TransitContext'
import StatusDot from '@/components/StatusDot'
import { sosActivityLog } from '@/data/mockData'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
}

export default function SosPage() {
  const { isTransit } = useTransit()
  const accentColor = isTransit ? 'text-sovereign-orange' : 'text-sovereign-green'
  const accentBg = isTransit ? 'bg-sovereign-orange' : 'bg-sovereign-green'
  const accentBorder = isTransit ? 'border-sovereign-orange/20' : 'border-sovereign-green/20'

  const [lockStatus, setLockStatus] = useState<'ARMED' | 'DISARMED'>('ARMED')
  const [smsRelay] = useState<'CONNECTED' | 'DISCONNECTED'>('CONNECTED')

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 space-y-4"
    >
      {/* Status cards row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Remote Lock */}
        <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            {lockStatus === 'ARMED' ? (
              <ShieldCheck size={16} className={accentColor} />
            ) : (
              <ShieldAlert size={16} className="text-sovereign-yellow" />
            )}
            <span className="text-xs text-sovereign-text-muted uppercase tracking-wider">Remote Lock</span>
          </div>
          <div className={`text-xl font-bold mb-3 ${lockStatus === 'ARMED' ? accentColor : 'text-sovereign-yellow'}`}>
            {lockStatus}
          </div>
          <button
            onClick={() => setLockStatus(s => s === 'ARMED' ? 'DISARMED' : 'ARMED')}
            data-testid="lock-toggle"
            className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${lockStatus === 'ARMED' ? accentBg : 'bg-sovereign-border-light'}`}
          >
            <motion.div
              className="w-4 h-4 rounded-full bg-white absolute top-0.5"
              animate={{ left: lockStatus === 'ARMED' ? 21 : 2 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </motion.div>

        {/* SMS Relay */}
        <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Radio size={16} className={accentColor} />
            <span className="text-xs text-sovereign-text-muted uppercase tracking-wider">SMS Relay</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusDot status={smsRelay === 'CONNECTED' ? 'online' : 'offline'} size="md" />
            <span className={`text-xl font-bold ${smsRelay === 'CONNECTED' ? accentColor : 'text-sovereign-red'}`}>
              {smsRelay}
            </span>
          </div>
        </motion.div>

        {/* Last Command */}
        <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className={accentColor} />
            <span className="text-xs text-sovereign-text-muted uppercase tracking-wider">Last Command</span>
          </div>
          <div className="text-xs text-sovereign-text font-medium">HEARTBEAT_CHECK</div>
          <div className="text-[10px] text-sovereign-text-muted mt-1">08:42:11 — WearOS Pulse</div>
        </motion.div>

        {/* Wipe Readiness */}
        <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className={accentColor} />
            <span className="text-xs text-sovereign-text-muted uppercase tracking-wider">Wipe Readiness</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusDot status="online" size="md" />
            <span className={`text-xl font-bold ${accentColor}`}>READY</span>
          </div>
          <div className="text-[10px] text-sovereign-text-muted mt-1">TPM keys loaded · Scorched Earth armed</div>
        </motion.div>
      </div>

      {/* Activity Log */}
      <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className={accentColor} />
          <span className="text-sm font-semibold text-sovereign-text">Activity Log</span>
        </div>
        <div className="overflow-hidden rounded-lg border border-sovereign-border">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-sovereign-surface text-sovereign-text-muted">
                <th className="text-left px-4 py-2.5 font-medium">Timestamp</th>
                <th className="text-left px-4 py-2.5 font-medium">Command</th>
                <th className="text-left px-4 py-2.5 font-medium">Status</th>
                <th className="text-left px-4 py-2.5 font-medium">Source</th>
              </tr>
            </thead>
            <tbody>
              {sosActivityLog.map((entry, i) => (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-t border-sovereign-border hover:bg-sovereign-surface/50 transition-colors"
                >
                  <td className="px-4 py-2.5 text-sovereign-text-muted">{entry.timestamp}</td>
                  <td className="px-4 py-2.5 text-sovereign-text font-medium">{entry.command}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-medium border ${accentBorder} ${accentColor} bg-sovereign-surface`}>
                      <StatusDot status={entry.status === 'OK' || entry.status === 'ARMED' || entry.status === 'READY' || entry.status === 'SYNCED' || entry.status === 'VERIFIED' || entry.status === 'ONLINE' ? 'online' : 'warning'} />
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-sovereign-text-muted">{entry.source}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
