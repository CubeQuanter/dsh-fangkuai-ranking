import type { ReactNode } from 'react'
import { formatSignedPercent } from '../../shared/format.ts'
import { Icon } from './icons.tsx'
import { pctClass } from './display.ts'

export function Pct({ value }: { value: number | null }) {
  return <span className={`dsr-pct ${pctClass(value)}`}>{formatSignedPercent(value)}</span>
}

export function Rank({ value, className = '' }: { value: number; className?: string }) {
  return <span className={`dsr-rank ${value <= 3 ? 'medal' : ''} ${className}`}>{String(value).padStart(2, '0')}</span>
}

export function StockName({ name, ticker }: { name: string; ticker: string }) {
  return (
    <span className="dsr-name">
      <b>{name}</b>
      <span className="dsr-code">{ticker}</span>
    </span>
  )
}

export function Spinner({ label }: { label?: string }) {
  return (
    <span className="dsr-loading">
      <span className="dsr-spinner" />
      {label ? <span>{label}</span> : null}
    </span>
  )
}

export function ErrorLine({ text }: { text: string }) {
  return (
    <div className="dsr-error" role="alert">
      <Icon name="warning" size={15} />
      <span>{text}</span>
    </div>
  )
}

export function Empty({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <div className="dsr-empty-result">
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {children}
    </div>
  )
}
