import { CategoryIcon } from "@/app/components/recruiter/job/JobDisplay"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Application } from "@/lib/types/applications"
import { cn } from "@/lib/utils"
import ApplicationDetailsLink from "./ApplicationDetailsLink"
import ApplicationStatusBadge from "./ApplicationStatusBadge"
import { getAppliedLabel, getJobMeta } from "./application-utils"

type ApplicationsTableProps = {
  applications: Application[]
}

const headClassName =
  "h-11 px-2 text-[0.68rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase"

const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-border bg-muted/30 hover:bg-muted/30">
          <TableHead className={cn(headClassName, "px-4")}>Job Title</TableHead>
          <TableHead className={headClassName}>Company</TableHead>
          <TableHead
            className={cn(headClassName, "hidden @min-[900px]:table-cell")}
          >
            Applied
          </TableHead>
          <TableHead className={headClassName}>Status</TableHead>
          <TableHead className={cn(headClassName, "px-4 text-right")}>
            Action
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {applications.map((application) => (
          <TableRow key={application._id} className="hover:bg-muted/40">
            <TableCell className="px-4 py-3">
              <div className="flex items-center gap-3">
                <CategoryIcon category={application.jobCategory} />
                <div className="min-w-0">
                  <p className="max-w-64 truncate font-medium text-foreground">
                    {application.jobTitle}
                  </p>
                  <p className="mt-0.5 max-w-64 truncate text-xs text-muted-foreground">
                    {getJobMeta(application)}
                  </p>
                </div>
              </div>
            </TableCell>

            <TableCell className="px-2 py-3">
              <p className="max-w-40 truncate text-sm font-medium text-foreground/80">
                {application.companyName}
              </p>
            </TableCell>

            <TableCell className="hidden px-2 py-3 @min-[900px]:table-cell">
              <p
                suppressHydrationWarning
                className="text-sm text-muted-foreground"
              >
                {getAppliedLabel(application)}
              </p>
            </TableCell>

            <TableCell className="px-2 py-3">
              <ApplicationStatusBadge status={application.status} />
            </TableCell>

            <TableCell className="px-4 py-3 text-right">
              <ApplicationDetailsLink jobId={application.jobId} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ApplicationsTable
