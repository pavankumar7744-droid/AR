'use client'

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { Box, Loader2, Move3d, X as CloseIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type ModelViewerProps = {
  src: string
  alt: string
  poster?: string
  cameraOrbit?: string
  /** Show the larger interactive controls + AR button (product detail) */
  interactive?: boolean
  className?: string
  /** Surface available material variants to the parent */
  onVariants?: (variants: string[]) => void
  /** Active variant name to apply */
  variant?: string | null
  autoRotate?: boolean
}

export type ModelViewerHandle = {
  startCamera: () => Promise<void>
  stopCamera: () => void
}

let loaderPromise: Promise<unknown> | null = null
function ensureModelViewer() {
  if (typeof window === 'undefined') return null
  if (!loaderPromise) {
    loaderPromise = import('@google/model-viewer')
  }
  return loaderPromise
}

export const ModelViewer = forwardRef<ModelViewerHandle, ModelViewerProps>(function ModelViewer(
  {
    src,
    alt,
    poster,
    cameraOrbit = '0deg 78deg 100%',
    interactive = false,
    className,
    onVariants,
    variant,
    autoRotate = true,
  },
  ref,
) {
  const modelViewerRef = useRef<HTMLElement & {
    availableVariants?: string[]
    variantName?: string | null
    activateAR?: () => void
    canActivateAR?: boolean
    loaded?: boolean
  }>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [defined, setDefined] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [arAvailable, setArAvailable] = useState(false)
  const [cameraMode, setCameraMode] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt' | null>(null)

  // Keep the latest onVariants without making it an effect dependency,
  // otherwise an inline callback from the parent re-runs the effect on every
  // render and causes an infinite update loop.
  const onVariantsRef = useRef(onVariants)
  useEffect(() => {
    onVariantsRef.current = onVariants
  }, [onVariants])

  useEffect(() => {
    let active = true
    ensureModelViewer()?.then(() => {
      if (active) setDefined(true)
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const el = modelViewerRef.current
    if (!el) return
    let done = false
    const handleLoad = () => {
      if (done) return
      done = true
      setLoaded(true)
      setArAvailable(Boolean(el.canActivateAR))
      const variants = el.availableVariants
      if (onVariantsRef.current && Array.isArray(variants)) {
        onVariantsRef.current(variants)
      }
    }
    // The `load` event may have already fired before this listener attached
    // (model-viewer lazy-loads independently of React), so check eagerly.
    if (el.loaded) {
      handleLoad()
    }
    el.addEventListener('load', handleLoad)
    return () => el.removeEventListener('load', handleLoad)
  }, [defined])

  // Apply a chosen material variant
  useEffect(() => {
    const el = modelViewerRef.current
    if (!el || !loaded) return
    el.variantName = variant ?? null
  }, [variant, loaded])

  // Handle camera access
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false,
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraMode(true)
        setCameraPermission('granted')
      }
    } catch (err) {
      console.error('[v0] Camera access denied:', err)
      setCameraPermission('denied')
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      setCameraMode(false)
    }
  }

  // Expose camera functions via ref
  useImperativeHandle(ref, () => ({
    startCamera,
    stopCamera,
  }), [])

  return (
    <div className={cn('group relative h-full w-full overflow-hidden bg-background', className)}>
      {cameraMode && (
        <div className="absolute inset-0 z-50 flex flex-col bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
            <button
              onClick={stopCamera}
              className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition-smooth hover:bg-red-600 active:scale-95"
            >
              <CloseIcon className="size-4" aria-hidden="true" />
              Close
            </button>
          </div>
        </div>
      )}

      {!cameraMode && defined ? (
        <model-viewer
          ref={modelViewerRef as never}
          src={src}
          alt={alt}
          poster={poster}
          camera-orbit={cameraOrbit}
          shadow-intensity={interactive ? '1.1' : '0.85'}
          shadow-softness="0.9"
          exposure="1.05"
          tone-mapping="neutral"
          environment-image="neutral"
          camera-controls={interactive ? true : undefined}
          auto-rotate={autoRotate ? true : undefined}
          auto-rotate-delay="0"
          rotation-per-second={interactive ? '18deg' : '26deg'}
          interaction-prompt="none"
          ar={interactive ? true : undefined}
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="fixed"
          ar-placement="floor"
          reveal="auto"
          loading="eager"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            ['--poster-color' as string]: 'transparent',
          }}
        >
          <div slot="progress-bar" />
        </model-viewer>
      ) : null}

      {/* Loading / not-yet-defined state */}
      {!loaded && !cameraMode && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          {defined ? (
            <Loader2 className="size-6 animate-spin" aria-hidden="true" />
          ) : (
            <Box className="size-6" aria-hidden="true" />
          )}
          <span className="text-xs font-medium tracking-wide">Loading 3D model</span>
        </div>
      )}

      {/* Desktop hint */}
      {interactive && loaded && !cameraMode && (
        <div className="pointer-events-none absolute left-4 top-4 hidden items-center gap-1.5 rounded-full bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur md:inline-flex">
          <Move3d className="size-3.5" aria-hidden="true" />
          Drag to rotate
        </div>
      )}

      {/* AR availability badge */}
      {interactive && loaded && arAvailable && (
        <span className="sr-only">Augmented reality is available on this device</span>
      )}
    </div>
  )
})
