import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-text-primary text-surface-primary hover:bg-[rgba(245,245,245,0.85)]',
  ghost: 'bg-transparent text-text-primary border border-white/20 hover:border-white/60',
  destructive: 'bg-destructive text-white hover:bg-[#DC2626]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-md py-sm text-[14px] rounded-sm',
  md: 'px-lg py-[12px] text-[16px] rounded-md',
  lg: 'px-xl py-md text-[16px] rounded-md',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-body font-bold',
          'transition-all duration-150 ease-out',
          'motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-[0px_8px_24px_rgba(0,0,0,0.5)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-interactive-focus',
          'disabled:pointer-events-none disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps, ButtonVariant, ButtonSize }
