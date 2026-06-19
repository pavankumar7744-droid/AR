import Image from 'next/image'
import { MousePointerClick, ScanLine, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: MousePointerClick,
    title: 'Pick a piece',
    body: 'Browse the collection and open any product. Every item ships with a true-to-life 3D model.',
  },
  {
    icon: ScanLine,
    title: 'Tap “View in your room”',
    body: 'On a phone or tablet, point your camera at the floor. Maru drops the piece in at exact scale.',
  },
  {
    icon: Sparkles,
    title: 'Walk around it',
    body: 'Move closer, step back, change the finish, and see how it sits in your own light before you buy.',
  },
]

export function HowArWorks() {
  return (
    <section id="how-ar-works" className="scroll-mt-20 relative overflow-hidden py-20 sm:py-28 lg:py-32">
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-background pointer-events-none" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-48 -top-48 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -left-48 bottom-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div className="relative order-last aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-muted shadow-premium-xl lg:order-first">
          <Image
            src="/ar-room.png"
            alt="A phone showing a lounge chair placed in a living room with augmented reality"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-foreground/5 via-transparent to-transparent pointer-events-none" />
        </div>
        <div className="max-w-lg space-y-6">
          <div className="animate-fade-in-up">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              How it works
            </p>
            <h2 className="mt-4 text-balance font-heading text-4xl leading-tight tracking-tight sm:text-5xl text-foreground">
              Confidence before checkout.
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              Returns are the worst part of buying furniture online. Maru removes
              the guesswork by letting you preview every piece in your real space,
              at the size it will actually be.
            </p>
          </div>
          <ol className="flex flex-col gap-6 mt-10">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-5 animate-fade-in-up group">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent/70 text-card shadow-premium transition-smooth group-hover:shadow-premium-lg group-hover:scale-110">
                  <step.icon className="size-6" aria-hidden="true" />
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="flex items-center gap-3 font-medium text-foreground">
                    <span className="font-heading text-lg text-accent">0{i + 1}</span>
                    <span>{step.title}</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
