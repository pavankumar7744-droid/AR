'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { formatPrice } from '@/lib/products'
import { ModelViewer } from '@/components/model-viewer'

export function CartDrawer() {
  const { items, isOpen, setOpen, subtotal, setQuantity, count } = useCart()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, setOpen])

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-foreground/40 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-premium-xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-border/50 px-6 py-5">
          <h2 className="flex items-center gap-2 font-heading text-lg text-foreground">
            <ShoppingBag className="size-5 text-accent" aria-hidden="true" />
            Your bag
            <span className="text-muted-foreground">({count})</span>
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
            aria-label="Close bag"
          >
            <X className="size-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="size-10 text-muted-foreground/50" aria-hidden="true" />
            <p className="text-muted-foreground">Your bag is empty.</p>
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-primary underline underline-offset-4"
            >
              Browse the collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 py-5">
                  <div className="size-20 shrink-0 overflow-hidden rounded-md bg-muted">
                    <ModelViewer
                      src={product.model}
                      alt={product.name}
                      cameraOrbit={product.cameraOrbit}
                      autoRotate={false}
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="font-medium leading-tight">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                      <p className="font-medium">{formatPrice(product.price * quantity)}</p>
                    </div>
                    <div className="mt-auto flex items-center gap-2 pt-3">
                      <button
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        className="flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
                        aria-label={`Decrease quantity of ${product.name}`}
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm tabular-nums font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        className="flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
                        aria-label={`Increase quantity of ${product.name}`}
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-border/50 px-6 py-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-heading text-xl text-foreground">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <button className="w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-smooth shadow-premium hover:shadow-premium-lg hover:bg-primary/90 active:scale-95">
                Proceed to checkout
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
