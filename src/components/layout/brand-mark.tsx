interface BrandMarkProps {
  className?: string
}

function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
    >
      <rect width="64" height="64" rx="14" fill="#334155" />
      <path
        d="M18 46L32 18l14 28M24 38h16"
        stroke="#fff"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { BrandMark }
export type { BrandMarkProps }
