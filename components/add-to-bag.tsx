'use client'

import { Plus } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import type { Product } from '@/lib/products'
import { cn } from '@/lib/utils'

export function AddToBag({
  product,
  variant = 'solid',
  className,
  label = 'Add to bag',
}: {
  product: Product
  variant?: 'solid' | 'outline' | 'icon'
  className?: string
  label?: string
}) {
  const { add } = useCart()

  if (variant === 'icon') {
    return (
      <button
        onClick={(e) => {
          e.preventDefault()
          add(product)
        }}
        aria-label={`Add ${product.name} to bag`}
        className={cn(
          'flex size-10 items-center justify-center rounded-full bg-card/80 text-foreground shadow-premium transition-smooth backdrop-blur hover:bg-primary hover:text-primary-foreground hover:shadow-premium-lg active:scale-95',
          className,
        )}
      >
        <Plus className="size-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => add(product)}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-smooth shadow-premium-sm',
        variant === 'solid'
          ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-premium active:scale-95'
          : 'border border-foreground/20 text-foreground hover:border-accent hover:bg-accent/5 hover:shadow-premium-sm',
        className,
      )}
    >
      {label}
    </button>
  )
}
