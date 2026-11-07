"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navigation = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
] as const

const getStartedClassName =
  "border-transparent bg-[#5b3bf5] text-white shadow-[0_0_24px_rgba(91,59,245,0.28)] hover:bg-[#6a4dff] focus-visible:ring-[#5b3bf5]/50"

type NavigationProps = {
  mobile?: boolean
  onNavigate?: () => void
}

function Navigation({ mobile = false, onNavigate }: NavigationProps) {
  const pathname = usePathname()

  return (
    <>
      <ul
        className={cn(
          "flex items-center gap-1",
          mobile && "flex-col items-stretch"
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
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium text-neutral-300 transition-colors outline-none hover:bg-white/5 hover:text-white focus-visible:ring-3 focus-visible:ring-white/20",
                  isActive && "bg-white/5 text-white",
                  mobile && "px-3 py-2.5 text-base"
                )}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>

      <Separator
        orientation={mobile ? "horizontal" : "vertical"}
        className={cn(
          "bg-white/10",
          mobile ? "my-3" : "mx-2 data-vertical:h-6 data-vertical:self-center"
        )}
      />

      <div
        className={cn(
          "flex items-center gap-1",
          mobile && "flex-col items-stretch gap-2"
        )}
      >
        <Link
          href="/sign-in"
          onClick={onNavigate}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-10 rounded-lg px-3 text-sm font-medium text-[#9d8cff] hover:bg-white/5 hover:text-[#b9adff]",
            mobile && "h-11 w-full justify-center text-base"
          )}
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          onClick={onNavigate}
          className={cn(
            buttonVariants(),
            getStartedClassName,
            "h-10 rounded-lg px-5 text-sm font-semibold",
            mobile && "h-11 w-full justify-center text-base"
          )}
        >
          Get Started
        </Link>
      </div>
    </>
  )
}

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 px-3 pt-4 sm:px-6 lg:px-8 lg:pt-6">
      <div className="mx-auto flex h-14 w-full max-w-330 items-center justify-between gap-3 rounded-xl border border-white/10 bg-neutral-900/80 px-3 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:h-16 sm:px-4 lg:h-18 lg:px-5">
        <Link
          href="/"
          aria-label="HireLoop home"
          className="shrink-0 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-white/20"
        >
          <Image
            src="/assets/images/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            loading="eager"
            className="h-8 w-auto sm:h-9 lg:h-11"
          />
        </Link>

        <div className="hidden items-center md:flex">
          <nav aria-label="Primary" className="flex items-center">
            <Navigation />
          </nav>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="text-neutral-300 hover:bg-white/5 hover:text-white md:hidden"
              />
            }
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[min(20rem,calc(100vw-1.5rem))] border-white/10 bg-neutral-950/95 text-neutral-50 backdrop-blur-xl sm:max-w-sm"
          >
            <SheetHeader className="border-b border-white/10">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Browse HireLoop pages and account actions.
              </SheetDescription>
              <Link
                href="/"
                onClick={closeMenu}
                aria-label="HireLoop home"
                className="w-fit rounded-md outline-none focus-visible:ring-3 focus-visible:ring-white/20"
              >
                <Image
                  src="/assets/images/logo.png"
                  alt="HireLoop"
                  width={154}
                  height={44}
                  className="h-9 w-auto"
                />
              </Link>
            </SheetHeader>

            <nav aria-label="Mobile" className="flex flex-1 flex-col p-4">
              <Navigation mobile onNavigate={closeMenu} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Navbar
