export function LogoMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      aria-hidden
    />
  );
}
