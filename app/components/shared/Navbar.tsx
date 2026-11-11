"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import Navigation from "@/app/components/shared/Navigation"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
