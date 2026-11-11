"use client"

import { useSyncExternalStore } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const subscribe = () => () => {}

type ThemeToggleProps = {
  className?: string
}

function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      title={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      className={cn(
        "shrink-0 rounded-lg border border-border bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground focus-visible:ring-ring/40",
        className
      )}
    >
      <SunIcon aria-hidden className="hidden size-4 dark:block" />
      <MoonIcon aria-hidden className="size-4 dark:hidden" />
    </Button>
  )
}

export default ThemeToggle
