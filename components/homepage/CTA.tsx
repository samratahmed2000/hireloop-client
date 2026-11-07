import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const CTA = () => {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-[#080808] px-4 pt-40 pb-16 text-white sm:px-6 sm:pt-48 sm:pb-20 lg:px-8 lg:pt-64 lg:pb-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-144 bg-[radial-gradient(ellipse_60%_65%_at_50%_20%,rgba(91,59,245,0.5),rgba(59,27,216,0.15)_50%,transparent_78%)]" />

        <div className="absolute inset-x-0 top-20 mx-auto w-[96%] max-w-360">
          <Image
            src="/assets/images/cta-bg.png"
            alt=""
            width={1440}
            height={964}
            sizes="(min-width: 1440px) 1382px, 96vw"
            className="h-auto w-full mask-[linear-gradient(to_bottom,black_55%,transparent_96%)] opacity-60 mix-blend-screen"
          />
        </div>

        <div className="absolute top-20 left-1/2 h-56 w-[88%] max-w-5xl -translate-x-1/2 rounded-[50%] bg-[#8b7bff]/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#080808] via-[#080808]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#080808] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2
          id="cta-heading"
          className="text-3xl leading-[1.12] font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
        >
          Your next role is
          <span className="block text-neutral-400">
            already looking for you
          </span>
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-6 text-pretty text-neutral-400 sm:text-base sm:leading-7">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-lg border-transparent bg-white px-6 text-sm font-semibold text-neutral-950 shadow-[0_8px_30px_rgba(255,255,255,0.12)] hover:bg-neutral-200 sm:h-12 sm:px-7 sm:text-base"
            )}
          >
            Create a free account
          </Link>
          <Link
            href="/pricing"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-lg border-white/15 bg-white/5 px-6 text-sm font-medium text-white hover:bg-white/10 hover:text-white sm:h-12 sm:px-7 sm:text-base"
            )}
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTA
