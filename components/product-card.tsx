import Link from 'next/link'
import { Box } from 'lucide-react'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import { ModelViewer } from '@/components/model-viewer'
import { AddToBag } from '@/components/add-to-bag'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col animate-fade-in-up">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-muted shadow-premium transition-smooth hover:shadow-premium-lg"
      >
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-card/80 px-2.5 py-1 text-[0.7rem] font-medium text-foreground backdrop-blur shadow-premium-sm">
          <Box className="size-3" aria-hidden="true" />
          3D / AR
        </span>
        <div className="h-full w-full transition-smooth duration-700 group-hover:scale-[1.05]">
          <ModelViewer
            src={product.model}
            alt={`3D model of ${product.name}`}
            cameraOrbit={product.cameraOrbit}
            autoRotate={false}
          />
        </div>
        {/* Premium overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/0 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
      </Link>

      <div className="absolute right-3 top-3 z-10 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <AddToBag product={product} variant="icon" />
      </div>

      <div className="mt-5 flex items-start justify-between gap-3">
        <div className="flex-1">
          <Link
            href={`/product/${product.slug}`}
            className="font-medium leading-tight transition-smooth hover:text-accent"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
        </div>
        <p className="font-medium tabular-nums text-foreground whitespace-nowrap">{formatPrice(product.price)}</p>
      </div>
    </article>
  )
}
