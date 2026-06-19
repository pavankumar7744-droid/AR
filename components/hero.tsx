import Link from 'next/link'
import { ArrowRight, ScanLine } from 'lucide-react'
import { products } from '@/lib/products'
import { ModelViewer } from '@/components/model-viewer'

export function Hero() {
  const hero = products[0]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Premium background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -right-48 top-1/2 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-12 pt-12 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:pb-20 lg:pt-20">
        <div className="max-w-xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-premium-sm animate-fade-in-up transition-smooth">
            <ScanLine className="size-3.5 text-accent" aria-hidden="true" />
            Augmented reality, right in your browser
          </span>
          <h1 className="text-balance font-heading text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl animate-fade-in-up text-foreground">
            See it in your room before it&apos;s ever in your room.
          </h1>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground animate-fade-in-up">
            Maru is a furniture studio built for the way you actually shop.
            Place any piece at true scale in your space, walk around it, and
            judge it in your own light — no app to download.
          </p>
          <div className="flex flex-wrap items-center gap-3 animate-fade-in-up pt-2">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-smooth shadow-premium-sm hover:shadow-premium hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore the collection
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={`/product/${hero.slug}`}
              className="group inline-flex items-center gap-2 rounded-full border-2 border-foreground/20 px-6 py-3.5 text-sm font-medium text-foreground transition-smooth hover:border-accent hover:bg-accent/5"
            >
              Try it in AR
            </Link>
          </div>
          <dl className="grid max-w-md grid-cols-3 gap-6 border-t border-border/50 pt-8 animate-fade-in-up">
            {[
              { value: 'True scale', label: 'Centimetre-accurate' },
              { value: 'No app', label: 'Works in your browser' },
              { value: '3D + AR', label: 'On every product' },
            ].map((stat, i) => (
              <div key={stat.label} style={{ animationDelay: `${i * 0.1}s` }} className="animate-fade-in-up">
                <dt className="font-heading text-xl text-foreground">{stat.value}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-fade-in">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-background to-muted shadow-premium-xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-transparent pointer-events-none" />
            <ModelViewer
              src={hero.model}
              alt={`3D model of the ${hero.name}`}
              cameraOrbit={hero.cameraOrbit}
              autoRotate
            />
            <div className="pointer-events-none absolute bottom-5 left-5 rounded-xl bg-card/90 px-4 py-3 backdrop-blur-md border border-border/50 shadow-premium-sm">
              <p className="text-sm font-medium text-foreground">{hero.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Drag to spin · live 3D</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
