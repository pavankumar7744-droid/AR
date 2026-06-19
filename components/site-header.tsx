'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/components/cart-context'

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop?category=Sofas', label: 'Sofas' },
  { href: '/shop?category=Lighting', label: 'Lighting' },
  { href: '/#how-ar-works', label: 'How AR works' },
]

export function SiteHeader() {
  const { count, setOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl transition-smooth shadow-premium-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-full p-1.5 text-foreground transition-smooth hover:bg-muted/50"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <Link
          href="/"
          className="font-heading text-2xl tracking-tight md:text-[1.65rem] text-foreground transition-smooth hover:text-accent"
          onClick={() => setMenuOpen(false)}
        >
          Maru
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-smooth hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="relative flex items-center gap-2 rounded-full px-3 py-2 text-sm text-foreground transition-smooth hover:bg-muted/50 active:scale-95"
          aria-label={`Open bag, ${count} items`}
        >
          <ShoppingBag className="size-5" />
          <span className="hidden sm:inline">Bag</span>
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[0.65rem] font-medium text-accent-foreground shadow-premium-sm animate-glow-pulse">
              {count}
            </span>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-border/40 bg-background/95 backdrop-blur-md px-5 py-4 md:hidden animate-fade-in">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-foreground transition-smooth hover:bg-muted/50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
