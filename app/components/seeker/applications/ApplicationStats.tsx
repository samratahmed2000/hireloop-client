import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { getApplicationStats } from "@/lib/applications"
import { cn } from "@/lib/utils"

type ApplicationStatsProps = {
  stats: ReturnType<typeof getApplicationStats>
}

const ApplicationStats = ({ stats }: ApplicationStatsProps) => {
  const statItems = [
    {
      label: "Total Applied",
      value: stats.total,
      valueClassName: "text-foreground",
    },
    {
      label: "Shortlisted",
      value: stats.shortlisted,
      valueClassName: "text-foreground",
    },
    {
      label: "Interviews",
      value: stats.interviews,
      valueClassName: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Success Rate",
      value: `${stats.successRate}%`,
      valueClassName: "text-emerald-600 dark:text-emerald-400",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {statItems.map((stat) => (
        <Card
          key={stat.label}
          size="sm"
          className="gap-2 rounded-2xl border border-border bg-card py-4 ring-0"
        >
          <CardHeader className="px-4">
            <CardDescription className="text-xs font-medium text-muted-foreground">
              {stat.label}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <p
              className={cn(
                "text-2xl leading-none font-semibold tracking-tight tabular-nums sm:text-3xl",
                stat.valueClassName
              )}
            >
              {stat.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ApplicationStats
