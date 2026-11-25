type LogoProps = {
  className?: string
  markOnly?: boolean
}

export function Logo({ className = '', markOnly = false }: LogoProps) {
  return (
    <span className={`brand ${className}`}>
      <span className="logo-plate" aria-hidden="true">
        <img src="/images.jfif" alt="" />
      </span>

      {!markOnly && (
        <span className="logo-wordmark">
          <strong>AT Art Gallery</strong>
          <span>Faisalabad</span>
        </span>
      )}
    </span>
  )
}
