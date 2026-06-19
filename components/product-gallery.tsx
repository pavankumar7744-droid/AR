'use client'

import { useState, useRef } from 'react'
import { Box, Camera } from 'lucide-react'
import type { Product } from '@/lib/products'
import { ModelViewer } from '@/components/model-viewer'

export function ProductGallery({ product }: { product: Product }) {
  const [variants, setVariants] = useState<string[]>([])
  const [active, setActive] = useState<string | null>(null)
  const modelViewerRef = useRef<any>(null)

  const handleCameraClick = async () => {
    try {
      if (modelViewerRef.current?.startCamera) {
        await modelViewerRef.current.startCamera()
      }
    } catch (error) {
      console.error('Camera error:', error)
      alert('Unable to access camera. Please check your browser permissions and try again.')
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-background to-muted shadow-premium-xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-transparent pointer-events-none" />
        <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1.5 text-xs font-medium backdrop-blur shadow-premium-sm">
          <Box className="size-3.5" aria-hidden="true" />
          Live 3D &middot; AR ready
        </span>
        <ModelViewer
          ref={modelViewerRef}
          src={product.model}
          alt={`Interactive 3D model of the ${product.name}`}
          cameraOrbit={product.cameraOrbit}
          interactive
          variant={active}
          onVariants={(v) => setVariants(v)}
        />
        <button
          onClick={handleCameraClick}
          className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 inline-flex items-center gap-2 rounded-full bg-card/90 px-5 py-3 text-sm font-medium text-foreground shadow-premium transition-smooth backdrop-blur hover:bg-card active:scale-95"
          aria-label="Use laptop camera to view furniture in your room"
        >
          <Camera className="size-4" aria-hidden="true" />
          Use laptop camera
        </button>
      </div>

      {variants.length > 1 && (
        <div className="mt-7 animate-fade-in-up">
          <p className="text-sm font-medium text-foreground">
            Finish
            <span className="ml-2 font-normal text-muted-foreground">
              {active ?? variants[0]}
            </span>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {variants.map((v) => {
              const isActive = (active ?? variants[0]) === v
              return (
                <button
                  key={v}
                  onClick={() => setActive(v)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-smooth ${
                    isActive
                      ? 'border-accent bg-accent/10 text-foreground shadow-premium'
                      : 'border-border/50 text-muted-foreground hover:border-accent/50 hover:text-foreground hover:bg-accent/5'
                  }`}
                >
                  {v}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
