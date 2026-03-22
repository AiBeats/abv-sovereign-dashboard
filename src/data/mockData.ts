// Generate thermal history data
export function generateThermalHistory(points = 20) {
  const now = Date.now()
  return Array.from({ length: points }, (_, i) => ({
    time: new Date(now - (points - i) * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    cpu: Math.round(55 + Math.random() * 25 + Math.sin(i / 3) * 8),
    gpu: Math.round(50 + Math.random() * 30 + Math.cos(i / 4) * 10),
  }))
}

// SOS Activity Log
export const sosActivityLog = [
  { id: 1, timestamp: '2026-03-22 08:42:11', command: 'HEARTBEAT_CHECK', status: 'OK', source: 'WearOS Pulse' },
  { id: 2, timestamp: '2026-03-22 08:38:04', command: 'FOB_PROXIMITY', status: 'OK', source: 'ESP32 Ghost Fob' },
  { id: 3, timestamp: '2026-03-22 08:30:22', command: 'LOCK_STATUS_QUERY', status: 'ARMED', source: 'SMS Relay' },
  { id: 4, timestamp: '2026-03-22 08:15:00', command: 'WIPE_READINESS_CHECK', status: 'READY', source: 'System' },
  { id: 5, timestamp: '2026-03-22 07:55:33', command: 'NETWORK_SYNC', status: 'SYNCED', source: 'Protocol-A3' },
  { id: 6, timestamp: '2026-03-22 07:40:18', command: 'BIOMETRIC_AUTH', status: 'VERIFIED', source: 'Fingerprint' },
  { id: 7, timestamp: '2026-03-22 07:20:01', command: 'SYSTEM_BOOT', status: 'ONLINE', source: 'Fortress Core' },
]

// Network environment history
export const networkHistory = [
  { time: '06:00', env: 'HOME', threat: 0 },
  { time: '06:30', env: 'HOME', threat: 0 },
  { time: '07:00', env: 'TRANSIT', threat: 1 },
  { time: '07:30', env: 'TRANSIT', threat: 2 },
  { time: '08:00', env: 'HOME', threat: 0 },
  { time: '08:15', env: 'HOME', threat: 0 },
  { time: '08:30', env: 'HOME', threat: 0 },
  { time: '08:45', env: 'HOME', threat: 1 },
]

// Crystal Vault file categories
export const vaultCategories = [
  { name: 'AI Weights', count: 847, size: '1.2 TB', icon: 'Brain' },
  { name: 'Media', count: 12453, size: '680 GB', icon: 'Film' },
  { name: 'Documents', count: 3211, size: '45 GB', icon: 'FileText' },
  { name: 'Config', count: 156, size: '2.1 GB', icon: 'Settings' },
]

// Crystal Vault recent access log
export const vaultAccessLog = [
  { id: 1, timestamp: '2026-03-22 08:50:22', file: 'llama-3.2-90b-q8.gguf', action: 'READ', category: 'AI Weights' },
  { id: 2, timestamp: '2026-03-22 08:45:11', file: 'sovereign_config.yaml', action: 'WRITE', category: 'Config' },
  { id: 3, timestamp: '2026-03-22 08:30:05', file: 'session_keys.enc', action: 'READ', category: 'Config' },
  { id: 4, timestamp: '2026-03-22 08:12:44', file: 'project_demo_v3.mp4', action: 'READ', category: 'Media' },
  { id: 5, timestamp: '2026-03-22 07:58:00', file: 'threat_analysis_q1.pdf', action: 'READ', category: 'Documents' },
]

// Network fingerprint
export const networkFingerprint = {
  ssid: 'ABV-SECURE-5G',
  gatewayMAC: '4A:2B:8C:D1:E3:F7',
  publicIP: '198.51.100.42',
  geo: 'Atlanta, GA — US',
  vpnStatus: 'CONNECTED',
  meshSync: 'SYNCED',
  environment: 'HOME' as const,
  threatLevel: 'LOW' as const,
}
