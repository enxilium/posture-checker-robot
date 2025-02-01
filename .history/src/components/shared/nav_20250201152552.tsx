 "use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-4 text-sm lg:gap-6">
      <Link
        href="/"
        className={clsx(
          "transition-colors hover:text-foreground/80",
          pathname === "/" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Home
      </Link>
    </nav>
  )
}
