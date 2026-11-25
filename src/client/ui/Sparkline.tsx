import type { ResultRow } from '../../shared/types.ts'
import { pctClass } from './display.ts'

function tint(hex: string, alpha: number): string {
  const value = Number.parseInt(hex.slice(1), 16)
  const red = (value >> 16) & 255
  const green = (value >> 8) & 255
  const blue = value & 255
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

export function Sparkline({ row }: { row: ResultRow }) {
  const values = row.spark
  if (values.length < 2) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const width = 100
  const height = 26
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width
    const y = height - 3 - ((value - min) / span) * (height - 6)
    return `${x.toFixed(2)},${y.toFixed(2)}`
  })
  const area = `0,${height} ${points.join(' ')} ${width},${height}`
  const tone = pctClass(row.pct) === 'down' ? '#35b37e' : '#e05555'
  const last = values[values.length - 1] ?? 0
  const lastY = height - 3 - ((last - min) / span) * (height - 6)

  return (
    <div className="dsr-stock-spark">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
        <path d={`M ${area}`} fill={tint(tone, 0.08)} />
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke={tint(tone, 0.88)}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={width} cy={lastY} r="1.6" fill={tone} />
      </svg>
    </div>
  )
}
