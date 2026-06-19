import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, Ruler, Smartphone } from 'lucide-react'
import { getProduct, products, formatPrice } from '@/lib/products'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CartDrawer } from '@/components/cart-drawer'
import { ProductGallery } from '@/components/product-gallery'
import { ProductCard } from '@/components/product-card'
import { AddToBag } from '@/components/add-to-bag'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: 'Not found — Maru' }
  return {
    title: `${product.name} — Maru`,
    description: product.tagline,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const related = products.filter((p) => p.id !== product.id).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-smooth hover:text-foreground group animate-fade-in-up"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to shop
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ProductGallery product={product} />

            <div className="lg:py-4 space-y-8">
              <div className="animate-fade-in-up space-y-4">
                <p className="text-sm font-medium uppercase tracking-widest text-accent">
                  {product.collection}
                </p>
                <h1 className="text-balance font-heading text-4xl leading-tight tracking-tight sm:text-5xl text-foreground">
                  {product.name}
                </h1>
                <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                  {product.tagline}
                </p>
                <p className="font-heading text-4xl text-foreground">{formatPrice(product.price)}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 animate-fade-in-up">
                <AddToBag product={product} className="px-8 py-3.5" />
                <span className="inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-3 text-sm text-muted-foreground bg-card/30 backdrop-blur transition-smooth hover:border-accent/50">
                  <Smartphone className="size-4 text-accent" aria-hidden="true" />
                  Use "View in your room" above on mobile
                </span>
              </div>

              <p className="leading-relaxed text-foreground/80 animate-fade-in-up">
                {product.description}
              </p>

              <div className="border-t border-border/50 pt-8 animate-fade-in-up">
                <h2 className="font-heading text-lg text-foreground">Details</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {product.details.map((detail, idx) => (
                    <li key={detail} className="flex items-start gap-3 text-sm text-foreground/80" style={{ animationDelay: `${idx * 0.05}s` }}>
                      <Check className="mt-0.5 size-4 shrink-0 text-accent flex-shrink-0" aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border/50 pt-8 animate-fade-in-up">
                <h2 className="flex items-center gap-2 font-heading text-lg text-foreground">
                  <Ruler className="size-4 text-accent" aria-hidden="true" />
                  Dimensions
                </h2>
                <dl className="mt-5 grid grid-cols-3 gap-4">
                  {[
                    { label: 'Width', value: product.dimensions.width },
                    { label: 'Depth', value: product.dimensions.depth },
                    { label: 'Height', value: product.dimensions.height },
                  ].map((d) => (
                    <div key={d.label} className="rounded-xl bg-gradient-to-br from-secondary to-muted/50 px-4 py-4 shadow-premium-sm">
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                        {d.label}
                      </dt>
                      <dd className="mt-2 font-medium tabular-nums text-foreground">{d.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-sm text-muted-foreground">
                  Materials: {product.materials}
                </p>
              </div>
            </div>
          </div>

          {/* Related */}
          <section className="mt-24 border-t border-border/50 pt-16 lg:mt-32">
            <h2 className="font-heading text-2xl leading-tight tracking-tight sm:text-3xl text-foreground animate-fade-in-up">
              You may also like
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, idx) => (
                <div key={p.id} style={{ animationDelay: `${idx * 0.1}s` }} className="animate-fade-in-up">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
      <CartDrawer />
    </div>
  )
}
