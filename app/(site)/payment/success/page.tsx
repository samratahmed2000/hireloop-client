import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { checkoutVerify } from "@/lib/actions/payments"
import { stripe } from "@/lib/stripe"
import { cn } from "cn"
import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)")

  const { status, payment_status, customer_email, metadata, payment_intent } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    })

  if (status === "open") {
    return redirect("/")
  }

  if (status === "complete" && payment_status === "paid") {
    console.log(
      status,
      payment_status,
      customer_email,
      metadata,
      payment_intent
    )

    const paymentResult = await checkoutVerify(session_id)

    console.log(paymentResult)

    return (
      <main
        id="success"
        className="relative isolate overflow-hidden bg-background px-4 py-12 text-foreground sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 size-120 -translate-x-1/2 rounded-full bg-[#5b3bf5]/12 blur-[140px]" />
          <div className="absolute -bottom-56 left-1/2 h-96 w-[70%] -translate-x-1/2 rounded-full bg-[#3b1bd8]/10 blur-[160px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-border bg-card/80 p-6 text-center shadow-[0_24px_80px_-40px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:p-8 dark:shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)]">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 shadow-[0_0_40px_-8px_rgba(16,185,129,0.45)] ring-1 ring-emerald-500/20 dark:text-emerald-400">
              <Check aria-hidden className="size-7" strokeWidth={2.5} />
            </span>

            <Badge
              variant="outline"
              className="mt-5 h-6 rounded-full border-[#5b3bf5]/25 bg-[#5b3bf5]/10 px-3 text-[10px] font-semibold tracking-[0.14em] text-[#5b3bf5] uppercase dark:border-[#9d8cff]/25 dark:bg-[#9d8cff]/10 dark:text-[#c3b9ff]"
            >
              Upgrade successful
            </Badge>

            <h1 className="mt-4 font-heading text-2xl leading-snug font-semibold tracking-tight text-balance text-foreground sm:text-[1.75rem]">
              Welcome to HireLoop Pro
            </h1>

            <p className="text-sm leading-6 text-muted-foreground">
              Your payment of{" "}
              <span className="font-semibold text-foreground">$30.00</span> was
              received perfectly.
            </p>

            <Link
              href="/browse-jobs"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "mt-4 h-11 w-full justify-center gap-2 rounded-xl bg-foreground px-5 text-sm font-semibold text-background hover:bg-foreground/90"
              )}
            >
              Browse Jobs
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </main>
    )
  }
}
