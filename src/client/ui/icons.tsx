import type { SVGProps } from 'react'

export type IconName =
  | 'plus'
  | 'refresh'
  | 'settings'
  | 'close'
  | 'back'
  | 'chevron'
  | 'search'
  | 'download'
  | 'edit'
  | 'copy'
  | 'trash'
  | 'check'
  | 'eye'
  | 'eye-off'
  | 'key'
  | 'list'
  | 'cards'
  | 'bars'
  | 'groups'
  | 'arrow-right'
  | 'warning'

const paths: Record<IconName, string[]> = {
  plus: ['M12 5v14', 'M5 12h14'],
  refresh: ['M20 11a8 8 0 1 1-2.3-5.7', 'M20 4v7h-7'],
  settings: ['M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z', 'M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h0a1.7 1.7 0 0 0 1-1.6V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v0a1.7 1.7 0 0 0 1.6 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z'],
  close: ['M6 6l12 12', 'M18 6l-12 12'],
  back: ['M15 18l-6-6 6-6'],
  chevron: ['M6 9l6 6 6-6'],
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M21 21l-4.3-4.3'],
  download: ['M12 3v12', 'M7 10l5 5 5-5', 'M5 21h14'],
  edit: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z'],
  copy: ['M9 9h11v11H9Z', 'M5 15H4V4h11v1'],
  trash: ['M3 6h18', 'M8 6V4h8v2', 'M19 6l-1 14H6L5 6', 'M10 11v6', 'M14 11v6'],
  check: ['M20 6L9 17l-5-5'],
  eye: ['M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  'eye-off': ['M3 3l18 18', 'M10.6 6.2A9 9 0 0 1 12 6c6.5 0 10 6 10 6a15 15 0 0 1-3.3 3.8', 'M6.4 8.1A15 15 0 0 0 2 12s3.5 6 10 6c1.4 0 2.8-.3 4-.8', 'M9.5 9.5a3 3 0 0 0 4.2 4.2'],
  key: ['M15 7a4 4 0 1 0 3 6.6', 'M18 13l4 4-2 2-4-4', 'M14 10l-9 9 2 2 9-9'],
  list: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.1', 'M3 12h.1', 'M3 18h.1'],
  cards: ['M3 3h7v7H3Z', 'M14 3h7v7h-7Z', 'M3 14h7v7H3Z', 'M14 14h7v7h-7Z'],
  bars: ['M5 20V10', 'M12 20V4', 'M19 20v-7'],
  groups: ['M4 5h6v6H4Z', 'M14 5h6v6h-6Z', 'M4 14h6v6H4Z', 'M14 14h6v6h-6Z'],
  'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
  warning: ['M12 3l10 18H2L12 3Z', 'M12 9v5', 'M12 18h.1'],
}

export function Icon({ name, size = 18, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  )
}

/** 方块量化品牌图标：白底圆角方块 + 黑色立方体线稿，与应用图标同源。 */
export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <rect x="1" y="1" width="98" height="98" rx="4" fill="#ffffff" />
      <polygon
        points="50,6.26 90.6,26.56 90.6,73.44 50,93.74 9.4,73.44 9.4,26.56"
        fill="#000000"
      />
      <g stroke="#ffffff" strokeWidth="2.03" strokeLinecap="round">
        <line x1="50" y1="46.86" x2="9.4" y2="26.56" />
        <line x1="50" y1="46.86" x2="90.6" y2="26.56" />
        <line x1="50" y1="46.86" x2="50" y2="93.74" />
      </g>
    </svg>
  )
}
