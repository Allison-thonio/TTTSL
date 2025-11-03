import Link from 'next/link'

export function Header({ title, description }: { title?: string; description?: string }) {
  // If a title prop is provided, render a classic title + description block.
  if (title) {
    return (
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
    )
  }

  // Default site header: brand + tagline. Tagline stacks under brand on small screens and sits inline on md+
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/"
          className="text-3xl font-light tracking-wide text-foreground flex md:flex-row flex-col md:items-baseline items-center gap-1 md:gap-3"
        >
          <span className="font-semibold">TTTSL</span>
          <span className="swanky-brand text-sm leading-none text-muted-foreground">swanky by ellery</span>
        </Link>
      </div>
    </header>
  )
}

export default Header
