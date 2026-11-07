import Link from "next/link"
import { BriefcaseBusiness, MapPinIcon, SearchIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
] as const

const stars = Array.from({ length: 56 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${38 + ((index * 53 + 7) % 62)}%`,
  size: index % 13 === 0 ? 2 : 1,
  opacity: 0.18 + (index % 4) * 0.14,
  accent: index % 9 === 0,
}))

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center overflow-hidden bg-[#080808] px-4 py-16 text-center text-white sm:px-6 sm:py-20 md:min-h-[calc(100svh-5rem)] lg:min-h-[calc(100svh-6rem)] lg:px-8 lg:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 size-144 -translate-x-1/2 rounded-full bg-[#5b3bf5]/10 blur-[140px]" />
        <div className="absolute -bottom-64 left-1/2 h-128 w-208 -translate-x-1/2 rounded-full bg-[#3b1bd8]/25 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-[#5b3bf5]/15 to-transparent" />

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
                star.size > 1 ? "0 0 8px rgba(255, 255, 255, 0.65)" : undefined,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        <div className="flex w-full items-center justify-center gap-2 sm:gap-4">
          <span className="h-px w-8 bg-linear-to-r from-transparent to-white/25 sm:w-14" />
          <Badge
            variant="outline"
            className="h-8 gap-1.5 rounded-full border-white/10 bg-neutral-900/70 px-3 text-[9px] tracking-[0.08em] text-neutral-400 backdrop-blur sm:h-9 sm:px-4 sm:text-xs"
          >
            <span className="flex size-5 items-center justify-center">
              <BriefcaseBusiness className="size-5 text-[#ff8a3d]" />
            </span>
            <span className="text-xs font-semibold tracking-normal text-[#ff8a3d] sm:text-sm">
              50,000+
            </span>
            <span className="whitespace-nowrap">NEW JOBS THIS MONTH</span>
          </Badge>
          <span className="h-px w-8 bg-linear-to-l from-transparent to-white/25 sm:w-14" />
        </div>

        <h1 className="mt-6 max-w-4xl text-4xl leading-[1.08] font-bold tracking-tight text-balance text-white sm:mt-8 sm:text-5xl lg:text-[3.25rem]">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-pretty text-neutral-400 sm:mt-5 sm:text-lg sm:leading-8">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role - faster.
        </p>

        <form
          action="/jobs"
          method="get"
          role="search"
          aria-label="Find jobs"
          className="mt-8 w-full max-w-3xl sm:mt-10"
        >
          <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-neutral-900/80 p-2 shadow-[0_24px_80px_-24px_rgba(91,59,245,0.45)] backdrop-blur-xl transition-colors focus-within:border-[#5b3bf5]/40 sm:flex-row sm:items-center sm:gap-0 sm:rounded-xl sm:p-2">
            <label htmlFor="hero-job-search" className="sr-only">
              Job title, skill or company
            </label>
            <InputGroup className="h-11 flex-1 rounded-xl border-0 bg-transparent shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-[#5b3bf5]/40 sm:h-14 dark:bg-transparent">
              <InputGroupAddon className="pl-3 text-neutral-500">
                <SearchIcon className="size-5" />
              </InputGroupAddon>
              <InputGroupInput
                id="hero-job-search"
                name="q"
                type="search"
                enterKeyHint="search"
                autoComplete="off"
                placeholder="Job title, skill or company"
                className="h-full text-sm text-white placeholder:text-neutral-500 md:text-base"
              />
            </InputGroup>

            <Separator className="mx-2 bg-white/10 sm:hidden" />
            <Separator
              orientation="vertical"
              className="mx-1 hidden bg-white/10 sm:block data-vertical:h-8 data-vertical:self-center"
            />

            <label htmlFor="hero-location-search" className="sr-only">
              Location or Remote
            </label>
            <InputGroup className="h-11 flex-1 rounded-xl border-0 bg-transparent shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-[#5b3bf5]/40 sm:h-14 dark:bg-transparent">
              <InputGroupAddon className="pl-3 text-neutral-500">
                <MapPinIcon className="size-5" />
              </InputGroupAddon>
              <InputGroupInput
                id="hero-location-search"
                name="location"
                type="search"
                enterKeyHint="search"
                autoComplete="off"
                placeholder="Location or Remote"
                className="h-full text-sm text-white placeholder:text-neutral-500 md:text-base"
              />
            </InputGroup>

            <Button
              type="submit"
              aria-label="Search jobs"
              className="h-11 w-full rounded-xl border-transparent bg-[#5b3bf5] text-white shadow-[0_0_24px_rgba(91,59,245,0.35)] hover:bg-[#6a4dff] focus-visible:ring-[#5b3bf5]/50 sm:ml-1 sm:size-14 sm:shrink-0 sm:rounded-lg"
            >
              <SearchIcon className="size-5" />
              <span className="sm:sr-only">Search Jobs</span>
            </Button>
          </div>
        </form>

        <div className="mt-5 flex flex-col items-center gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:justify-center">
          <span className="text-xs text-neutral-500 sm:mr-1 sm:text-sm">
            Trending Position
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {trendingPositions.map((position) => (
              <Badge
                key={position}
                variant="outline"
                render={
                  <Link href={`/jobs?q=${encodeURIComponent(position)}`} />
                }
                className="h-7 cursor-pointer rounded-full border-white/10 bg-neutral-900/70 px-3 text-xs font-medium text-neutral-300 backdrop-blur transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white sm:h-8 sm:px-3.5 sm:text-sm"
              >
                {position}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
