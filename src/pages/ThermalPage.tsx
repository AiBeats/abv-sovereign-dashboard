import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Thermometer, Cpu, MonitorDot, Zap } from 'lucide-react'
import { useTransit } from '@/context/TransitContext'
import { generateThermalHistory } from '@/data/mockData'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
}

export default function ThermalPage() {
  const { isTransit, accentHex } = useTransit()
  const accentColor = isTransit ? 'text-sovereign-orange' : 'text-sovereign-green'
  const accentBg = isTransit ? 'bg-sovereign-orange' : 'bg-sovereign-green'

  const [thermalData, setThermalData] = useState(() => generateThermalHistory(20))
  const [cpuTemp, setCpuTemp] = useState(62)
  const [gpuTemp, setGpuTemp] = useState(58)
  const [throttleState, setThrottleState] = useState<'NORMAL' | 'THROTTLED' | 'CRITICAL'>('NORMAL')
  const [adaptiveThrottling, setAdaptiveThrottling] = useState(true)
  const [cpuLoad, setCpuLoad] = useState(45)
  const [gpuLoad, setGpuLoad] = useState(62)

  const updateTemps = useCallback(() => {
    const newCpu = Math.round(55 + Math.random() * 25 + Math.sin(Date.now() / 5000) * 5)
    const newGpu = Math.round(50 + Math.random() * 30 + Math.cos(Date.now() / 6000) * 5)
    setCpuTemp(newCpu)
    setGpuTemp(newGpu)
    setCpuLoad(Math.round(30 + Math.random() * 50))
    setGpuLoad(Math.round(40 + Math.random() * 45))

    if (newCpu > 75 || newGpu > 75) setThrottleState('THROTTLED')
    else if (newCpu > 85 || newGpu > 85) setThrottleState('CRITICAL')
    else setThrottleState('NORMAL')

    setThermalData(prev => {
      const newPoint = {
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        cpu: newCpu,
        gpu: newGpu,
      }
      return [...prev.slice(1), newPoint]
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(updateTemps, 3000)
    return () => clearInterval(interval)
  }, [updateTemps])

  const throttleColor = {
    NORMAL: 'text-sovereign-green',
    THROTTLED: 'text-sovereign-yellow',
    CRITICAL: 'text-sovereign-red',
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 space-y-4"
    >
      {/* Temperature displays */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Cpu size={16} className={accentColor} />
            <span className="text-xs text-sovereign-text-muted uppercase tracking-wider">CPU Temperature</span>
          </div>
          <div className="flex items-baseline gap-1">
            <motion.span
              key={cpuTemp}
              initial={{ scale: 1.1, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-3xl font-bold ${cpuTemp > 75 ? 'text-sovereign-yellow' : accentColor}`}
            >
              {cpuTemp}
            </motion.span>
            <span className="text-sm text-sovereign-text-muted">°C</span>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-sovereign-text-muted mb-1">
              <span>Load</span>
              <span>{cpuLoad}%</span>
            </div>
            <div className="w-full h-2 bg-sovereign-surface rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${accentBg}`}
                initial={{ width: 0 }}
                animate={{ width: `${cpuLoad}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ opacity: 0.8 }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <MonitorDot size={16} className={accentColor} />
            <span className="text-xs text-sovereign-text-muted uppercase tracking-wider">GPU Temperature</span>
          </div>
          <div className="flex items-baseline gap-1">
            <motion.span
              key={gpuTemp}
              initial={{ scale: 1.1, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-3xl font-bold ${gpuTemp > 75 ? 'text-sovereign-yellow' : accentColor}`}
            >
              {gpuTemp}
            </motion.span>
            <span className="text-sm text-sovereign-text-muted">°C</span>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-sovereign-text-muted mb-1">
              <span>Load</span>
              <span>{gpuLoad}%</span>
            </div>
            <div className="w-full h-2 bg-sovereign-surface rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${accentBg}`}
                initial={{ width: 0 }}
                animate={{ width: `${gpuLoad}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ opacity: 0.8 }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className={accentColor} />
            <span className="text-xs text-sovereign-text-muted uppercase tracking-wider">Throttle State</span>
          </div>
          <div className={`text-2xl font-bold ${throttleColor[throttleState]} mb-3`}>
            {throttleState}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-sovereign-text-muted">Adaptive Throttling</span>
            <button
              onClick={() => setAdaptiveThrottling(!adaptiveThrottling)}
              data-testid="throttle-toggle"
              className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${adaptiveThrottling ? accentBg : 'bg-sovereign-border-light'}`}
            >
              <motion.div
                className="w-4 h-4 rounded-full bg-white absolute top-0.5"
                animate={{ left: adaptiveThrottling ? 21 : 2 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Temperature chart */}
      <motion.div variants={cardVariants} className="bg-sovereign-card border border-sovereign-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Thermometer size={16} className={accentColor} />
            <span className="text-sm font-semibold text-sovereign-text">Temperature History</span>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-[2px] rounded" style={{ backgroundColor: accentHex }} />
              <span className="text-sovereign-text-muted">CPU</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-[2px] rounded bg-sovereign-yellow" />
              <span className="text-sovereign-text-muted">GPU</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={thermalData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: '#64748b' }}
              axisLine={{ stroke: '#1e293b' }}
              tickLine={false}
            />
            <YAxis
              domain={[30, 100]}
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
            />
            <Line
              type="monotone"
              dataKey="cpu"
              stroke={accentHex}
              strokeWidth={2}
              dot={false}
              animationDuration={500}
            />
            <Line
              type="monotone"
              dataKey="gpu"
              stroke="#eab308"
              strokeWidth={2}
              dot={false}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  )
}
