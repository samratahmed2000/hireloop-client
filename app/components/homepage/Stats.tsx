import Image from "next/image"
import { BriefcaseBusiness, ChartColumn, ScanSearch, Star } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const stats = [
  {
    value: "50K",
    label: "Active Jobs",
    icon: BriefcaseBusiness,
  },
  {
    value: "12K",
    label: "Companies",
    icon: ChartColumn,
  },
  {
    value: "2M",
    label: "Job Seekers",
    icon: ScanSearch,
  },
  {
    value: "97%",
    label: "Satisfaction Rate",
    icon: Star,
  },
] as const

const stars = Array.from({ length: 34 }, (_, index) => ({
  left: `${(index * 43 + 17) % 100}%`,
  top: `${(index * 29 + 9) % 58}%`,
  size: index % 11 === 0 ? 2 : 1,
  opacity: 0.16 + (index % 4) * 0.12,
  accent: index % 7 === 0,
}))

const Stats = () => {
  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="relative isolate flex flex-col justify-center overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:min-h-192 lg:justify-end lg:px-8 lg:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 w-[150%] max-w-none -translate-x-1/2 translate-y-[-36%] sm:w-[120%] lg:w-[105%]">
          <Image
            src="/assets/images/globe.png"
            alt=""
            width={1440}
            height={1882}
            sizes="(min-width: 1024px) 105vw, (min-width: 640px) 120vw, 150vw"
            className="h-auto w-full hue-rotate-180 invert select-none dark:hue-rotate-0 dark:invert-0"
          />
        </div>

        <div className="absolute -top-64 left-1/2 h-128 w-208 -translate-x-1/2 rounded-full bg-[#3b1bd8]/25 blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-56 bg-linear-to-b from-[#5b3bf5]/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-background to-transparent" />

        <div className="absolute inset-0 hidden dark:block">
          {stars.map((star, index) => (
            <span
              key={index}
              className="absolute rounded-full"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
                backgroundColor: star.accent ? "#8b7bff" : "#ffffff",
                boxShadow:
                  star.size > 1
                    ? "0 0 8px rgba(255, 255, 255, 0.65)"
                    : undefined,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center">
        <h2
          id="stats-heading"
          className="max-w-160 text-center text-2xl leading-snug font-medium text-balance text-muted-foreground sm:text-3xl lg:text-4xl lg:leading-tight"
        >
          Assisting over{" "}
          <span className="font-semibold text-foreground">15,000</span> job
          seekers find their dream positions.
        </h2>

        <ul className="mt-12 grid w-full grid-cols-1 gap-3 sm:mt-14 sm:gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <li key={stat.label}>
                <Card className="group relative flex h-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 text-center shadow-[0_24px_80px_-32px_rgba(0,0,0,0.12)] ring-0 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-foreground/25 hover:bg-card/90 sm:p-7 lg:p-6 dark:shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)]">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <CardHeader className="flex w-auto items-center justify-center p-0">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-muted/40 transition-colors duration-300 group-hover:border-foreground/20 group-hover:bg-muted/80 md:size-14">
                      <Icon
                        aria-hidden
                        className="size-6 text-muted-foreground transition-colors duration-300 group-hover:text-foreground md:size-7"
                        strokeWidth={1.75}
                      />
                    </div>
                  </CardHeader>

                  <CardContent className="w-auto min-w-0 p-0">
                    <p className="text-3xl leading-none font-bold tracking-tight text-foreground tabular-nums sm:text-4xl lg:text-[2.5rem]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Stats
