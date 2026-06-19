import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/products'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CartDrawer } from '@/components/cart-drawer'
import { Hero } from '@/components/hero'
import { HowArWorks } from '@/components/how-ar-works'
import { ProductCard } from '@/components/product-card'

export default function HomePage() {
  const featured = products.filter((p) => p.featured)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />

        {/* Featured collection */}
        <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="flex items-end justify-between gap-4 animate-fade-in-up">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                The Lounge Edit
              </p>
              <h2 className="mt-3 text-balance font-heading text-3xl leading-tight tracking-tight sm:text-4xl text-foreground">
                Pieces worth picturing at home
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden shrink-0 items-center gap-2 text-sm font-medium text-foreground transition-smooth hover:text-accent group sm:inline-flex"
            >
              View all
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, idx) => (
              <div key={product.id} style={{ animationDelay: `${idx * 0.1}s` }} className="animate-fade-in-up">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Editorial band */}
        <section className="relative overflow-hidden">
          <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
            <Image
              src="/hero-room.png"
              alt="A calm, sunlit Scandinavian-modern living room"
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/65 via-foreground/30 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
                <div className="max-w-md text-background animate-fade-in-up space-y-4">
                  <h2 className="text-balance font-heading text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                    Designed to be lived with, not just looked at.
                  </h2>
                  <p className="text-pretty leading-relaxed text-background/90">
                    Every Maru piece is made from honest materials and built to
                    settle into your home for years.
                  </p>
                  <Link
                    href="/shop"
                    className="group mt-2 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-smooth shadow-premium hover:shadow-premium-lg hover:scale-105 active:scale-95"
                  >
                    Shop the collection
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HowArWorks />
      </main>
      <SiteFooter />
      <CartDrawer />
    </div>
  )
}
