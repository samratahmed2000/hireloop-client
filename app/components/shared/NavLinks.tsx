"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
] as const

type NavLinksProps = {
  mobile?: boolean
  onNavigate?: () => void
}

function NavLinks({ mobile = false, onNavigate }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <ul
      className={cn(
        "flex items-center gap-1.5",
        mobile && "flex-col items-stretch gap-1"
      )}
    >
      {navigation.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40",
                isActive && "bg-foreground/10 text-foreground",
                mobile && "w-full rounded-lg px-3 py-2.5 text-base"
              )}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavLinks
