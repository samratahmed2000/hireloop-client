import { CreditCard, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const ORDER = {
  name: "Hireloop Pro Plan",
  description: "Access to all features",
  amount: "$30.00",
}

const PaymentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>
}) => {
  const { canceled } = await searchParams

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you're ready."
    )
  }
  return (
    <main className="relative isolate overflow-hidden bg-background px-4 py-10 text-foreground sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 size-120 -translate-x-1/2 rounded-full bg-[#5b3bf5]/12 blur-[140px]" />
        <div className="absolute -bottom-56 left-1/2 h-96 w-[70%] -translate-x-1/2 rounded-full bg-[#3b1bd8]/10 blur-[160px]" />
      </div>

      {/* Payment Card */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        <div className="mx-auto mt-8 w-full max-w-md">
          <div className="rounded-2xl border border-border bg-card/80 p-6 text-center shadow-[0_24px_80px_-40px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:p-8 dark:shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)]">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-[#5b3bf5]/20 bg-[#5b3bf5]/10 text-[#5b3bf5] dark:text-[#9d8cff]">
              <CreditCard aria-hidden className="size-5" />
            </span>

            <h2 className="mt-4 font-heading text-xl font-semibold tracking-tight text-foreground">
              {ORDER.name}
            </h2>
            <p className="mx-auto max-w-xs text-sm leading-6 text-muted-foreground">
              {ORDER.description}
            </p>

            <form action="/api/checkout_sessions" method="POST">
              <section>
                <Button
                  type="submit"
                  role="link"
                  className="mt-6 h-11 w-full cursor-pointer rounded-xl border-transparent bg-[#5b3bf5] px-5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(91,59,245,0.35)] hover:bg-[#6a4dff] focus-visible:ring-[#5b3bf5]/50"
                >
                  Pay {ORDER.amount}
                </Button>
              </section>
            </form>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck aria-hidden className="size-3.5" />
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PaymentPage
