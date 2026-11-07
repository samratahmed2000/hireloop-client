"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ChartColumn, Crown, Plus, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    icon: Crown,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Start building your insights hub:",
    featured: false,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Growth",
    icon: ChartColumn,
    monthlyPrice: 17,
    yearlyPrice: 14,
    description: "Start building your insights hub:",
    featured: true,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Premium",
    icon: Zap,
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: "Start building your insights hub:",
    featured: false,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
] as const

const Pricing = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative isolate overflow-hidden bg-[#080808] px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-80 w-[80%] -translate-x-1/2 rounded-full bg-[#5b3bf5]/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-96 w-[70%] -translate-x-1/2 rounded-full bg-[#3b1bd8]/10 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center">
        <div className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.18em] text-[#9d8cff] uppercase">
          <span aria-hidden className="size-1 rounded-full bg-[#5b3bf5]" />
          Pricing
          <span aria-hidden className="size-1 rounded-full bg-[#5b3bf5]" />
        </div>

        <h2
          id="pricing-heading"
          className="mt-4 text-center text-3xl leading-[1.12] font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
        >
          Pay for the leverage,
          <span className="block">not the listings</span>
        </h2>

        <div
          role="group"
          aria-label="Billing period"
          className="mt-8 inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-neutral-900/80 p-1 backdrop-blur"
        >
          <button
            type="button"
            aria-pressed={billing === "monthly"}
            onClick={() => setBilling("monthly")}
            className={cn(
              "h-8 rounded-full px-3.5 text-xs font-medium transition-colors focus-visible:ring-3 focus-visible:ring-white/20 focus-visible:outline-none",
              billing === "monthly"
                ? "bg-white text-neutral-950 shadow-sm"
                : "text-neutral-400 hover:text-white"
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            aria-pressed={billing === "yearly"}
            onClick={() => setBilling("yearly")}
            className={cn(
              "flex h-8 items-center gap-1.5 rounded-full px-3.5 text-xs font-medium transition-colors focus-visible:ring-3 focus-visible:ring-white/20 focus-visible:outline-none",
              billing === "yearly"
                ? "bg-white text-neutral-950 shadow-sm"
                : "text-neutral-400 hover:text-white"
            )}
          >
            Yearly
            <Badge className="h-4 rounded-full border-transparent bg-[#5b3bf5] px-1.5 text-[10px] leading-none font-semibold text-white">
              20%
            </Badge>
          </button>
        </div>

        <ul className="mt-10 grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:mt-12 lg:gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price =
              billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice

            return (
              <li key={plan.name} className="flex">
                <Card
                  className={cn(
                    "h-full w-full gap-0 rounded-xl border border-white/10 bg-neutral-950/70 py-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] ring-0 backdrop-blur-sm transition-colors",
                    plan.featured &&
                      "border-white/15 bg-neutral-900/80 shadow-[0_30px_100px_-40px_rgba(91,59,245,0.45)]"
                  )}
                >
                  <CardHeader className="flex flex-row items-start justify-between gap-4 px-5">
                    <div className="flex items-center gap-2 pt-0.5">
                      <Icon
                        aria-hidden
                        className={cn(
                          "size-4",
                          plan.featured ? "text-[#a89bff]" : "text-[#9d8cff]"
                        )}
                        strokeWidth={1.75}
                      />
                      <h3 className="text-sm font-medium text-white">
                        {plan.name}
                      </h3>
                    </div>

                    <p className="flex items-start text-white">
                      <span className="mt-1 text-sm font-medium">$</span>
                      <span className="text-3xl leading-none font-semibold tracking-tight">
                        {price}
                      </span>
                      <span className="mt-2 ml-1 text-[11px] font-normal text-neutral-500">
                        /month
                      </span>
                    </p>
                  </CardHeader>

                  <CardContent className="mt-6 flex flex-1 flex-col px-5">
                    <p className="text-sm text-neutral-400">
                      {plan.description}
                    </p>

                    <ul className="mt-4 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <span
                            aria-hidden
                            className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#5b3bf5]/15 text-[#9d8cff]"
                          >
                            <Plus className="size-2.5" strokeWidth={3} />
                          </span>
                          <span className="text-[13px] leading-5 text-neutral-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-8">
                      <Link
                        href={`/sign-up?plan=${plan.name.toLowerCase()}`}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "lg" }),
                          "h-10 w-full justify-between rounded-lg px-4 text-[13px] font-medium",
                          plan.featured
                            ? "border-transparent bg-white text-neutral-950 hover:bg-neutral-200 hover:text-neutral-950 dark:border-transparent dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 dark:hover:text-neutral-950"
                            : "border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/10 dark:hover:text-white"
                        )}
                      >
                        Choose This Plan
                        <ArrowRight aria-hidden className="size-4" />
                      </Link>
                    </div>
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

export default Pricing
