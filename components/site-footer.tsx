import Link from 'next/link'

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'All products', href: '/shop' },
      { label: 'Sofas', href: '/shop?category=Sofas' },
      { label: 'Chairs', href: '/shop?category=Chairs' },
      { label: 'Lighting', href: '/shop?category=Lighting' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'Our story', href: '/' },
      { label: 'Materials', href: '/' },
      { label: 'Showrooms', href: '/' },
      { label: 'Journal', href: '/' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Delivery', href: '/' },
      { label: 'Returns', href: '/' },
      { label: 'How AR works', href: '/#how-ar-works' },
      { label: 'Contact', href: '/' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/40 bg-gradient-to-b from-background to-secondary/10 shadow-premium-sm">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <p className="font-heading text-2xl text-foreground">Maru</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Considered furniture for the modern home — previewed at true scale
              in your space before it ever arrives.
            </p>
          </div>
          {columns.map((col, colIdx) => (
            <div key={col.title}>
              <h3 className="text-xs font-medium uppercase tracking-widest text-accent">
                {col.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/70 transition-smooth hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-border/30 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Maru Studio. All rights reserved.</p>
          <p>Augmented reality powered by your browser — no app required.</p>
        </div>
      </div>
    </footer>
  )
}
