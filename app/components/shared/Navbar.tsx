"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import NavLinks from "@/app/components/shared/NavLinks"
import Navigation from "@/app/components/shared/Navigation"
import ThemeToggle from "@/app/components/shared/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <div className="mx-auto flex h-14 w-full max-w-330 items-center justify-between gap-4 rounded-xl border border-border bg-card/80 px-3 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:h-16 sm:px-4 lg:h-18 lg:px-5">
        <Link
          href="/"
          aria-label="HireLoop home"
          className="w-fit shrink-0 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          <Image
            src="/assets/images/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            loading="eager"
            className="h-8 w-auto sm:h-9 lg:h-10"
          />
        </Link>

        <div className="hidden items-center lg:flex">
          <nav aria-label="Primary" className="flex items-center">
            <NavLinks />
          </nav>

          <div
            aria-hidden
            className="mr-5 ml-1 h-6 w-px shrink-0 self-center bg-border"
          />

          <Navigation />

          <ThemeToggle className="ml-2 size-10 cursor-pointer border-transparent bg-transparent hover:bg-foreground/5" />
        </div>

        <div className="flex items-center justify-end gap-2 lg:hidden">
          <ThemeToggle className="ml-2 size-10 cursor-pointer border-transparent bg-transparent hover:bg-foreground/5" />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="size-10 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                />
              }
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[min(20rem,calc(100vw-1.5rem))] border-border bg-card/95 text-foreground backdrop-blur-xl sm:max-w-sm"
            >
              <SheetHeader className="border-b border-border">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Browse HireLoop pages and account actions.
                </SheetDescription>
                <Link
                  href="/"
                  onClick={closeMenu}
                  aria-label="HireLoop home"
                  className="w-fit rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
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
                <NavLinks mobile onNavigate={closeMenu} />

                <Separator
                  orientation="horizontal"
                  className="my-4 bg-border"
                />

                <div className="mt-auto">
                  <Navigation mobile onNavigate={closeMenu} />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Navbar
