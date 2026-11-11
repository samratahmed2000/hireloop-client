import type { ReactNode } from "react"
import { Check, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

const highlights = [
  "Curated roles from vetted companies",
  "AI matching tuned to your skills",
  "Salary insights before you apply",
] as const

const stats = [
  { value: "50,000+", label: "New roles this month" },
  { value: "3 min", label: "To build your profile" },
] as const

type AuthShellProps = {
  title: string
  description: string
  children: ReactNode
}

function AuthShell({ title, description, children }: AuthShellProps) {
  return (
    <main className="relative isolate overflow-hidden bg-[#080808] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 size-120 -translate-x-1/2 rounded-full bg-[#5b3bf5]/15 blur-[120px]" />
        <div className="absolute -right-24 -bottom-40 size-96 rounded-full bg-[#3b1bd8]/25 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#5b3bf5]/8 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <aside className="hidden lg:flex lg:flex-col">
          <Badge
            variant="outline"
            className="h-7 gap-1.5 rounded-full border-white/10 bg-neutral-900/70 px-3 text-[10px] tracking-[0.08em] text-neutral-400"
          >
            <Sparkles className="text-[#ff8a3d]" />
            FREE TO JOIN
          </Badge>

          <h2 className="mt-6 text-4xl leading-[1.1] font-semibold tracking-tight text-balance">
            Your next role starts at{" "}
            <span className="text-[#9d8cff]">HireLoop</span>
          </h2>

          <p className="mt-5 max-w-md text-base leading-7 text-pretty text-neutral-400">
            Build one profile and let the right opportunities find you. Join a
            community of professionals who take their work seriously.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-3 text-sm text-neutral-300"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#5b3bf5]/15 text-[#9d8cff]">
                  <Check className="size-3.5" />
                </span>
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-8 border-t border-white/10 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-semibold text-white">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </aside>

        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <Card className="rounded-2xl border border-white/10 bg-neutral-900 ring-0 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]">
            <CardHeader>
              <h1 className="font-heading text-xl leading-snug font-semibold text-white sm:text-2xl">
                {title}
              </h1>
              <CardDescription className="text-sm leading-6 text-neutral-400">
                {description}
              </CardDescription>
            </CardHeader>

            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default AuthShell
