import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { ReactNode } from "react"

type SectionCardProps = {
  step: number
  title: string
  description: string
  children: ReactNode
}

const SectionCard = ({
  step,
  title,
  description,
  children,
}: SectionCardProps) => {
  return (
    <Card className="rounded-2xl border border-border bg-card ring-0 [--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(6)]">
      <CardHeader className="border-b border-border">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#5b3bf5]/10 text-sm font-semibold text-[#5b3bf5] dark:bg-[#9d8cff]/15 dark:text-[#9d8cff]"
          >
            {step}
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
            <CardDescription className="text-xs leading-5 sm:text-sm">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default SectionCard
