import { Badge } from "@/components/ui/badge"
import {
  applicationStatusMeta,
  normalizeApplicationStatus,
} from "@/lib/applications"
import { cn } from "@/lib/utils"
import type { ApplicationStatus } from "@/lib/types/applications"

type ApplicationStatusBadgeProps = {
  status?: ApplicationStatus | string | null
  className?: string
}

const ApplicationStatusBadge = ({
  status,
  className,
}: ApplicationStatusBadgeProps) => {
  const normalizedStatus = normalizeApplicationStatus(status)
  const meta = applicationStatusMeta[normalizedStatus]

  return (
    <Badge
      variant="outline"
      className={cn(
        "h-6 rounded-full px-2.5 text-[11px] font-semibold",
        meta.className,
        className
      )}
    >
      {meta.label}
    </Badge>
  )
}

export default ApplicationStatusBadge
