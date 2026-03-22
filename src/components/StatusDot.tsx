import { useTransit } from '@/context/TransitContext'

interface StatusDotProps {
  status: 'online' | 'warning' | 'offline'
  size?: 'sm' | 'md'
}

export default function StatusDot({ status, size = 'sm' }: StatusDotProps) {
  const { isTransit } = useTransit()

  const sizeClass = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'

  const colorMap = {
    online: isTransit ? 'bg-sovereign-orange text-sovereign-orange' : 'bg-sovereign-green text-sovereign-green',
    warning: 'bg-sovereign-yellow text-sovereign-yellow',
    offline: 'bg-sovereign-red text-sovereign-red',
  }

  return (
    <span className={`${sizeClass} rounded-full ${colorMap[status]} status-dot-pulse inline-block`} />
  )
}
