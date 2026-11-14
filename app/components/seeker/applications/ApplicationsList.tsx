import { Card } from "@/components/ui/card"
import type { Application } from "@/lib/types/applications"
import ApplicationCard from "./ApplicationCard"
import ApplicationsTable from "./ApplicationsTable"

type ApplicationsListProps = {
  applications: Application[]
}

const ApplicationsList = ({ applications }: ApplicationsListProps) => {
  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border border-border bg-card py-0 ring-0">
      <div className="@container">
        <div className="hidden @min-[760px]:block">
          <ApplicationsTable applications={applications} />
        </div>

        <div className="flex flex-col gap-3 p-3 @min-[760px]:hidden">
          {applications.map((application) => (
            <ApplicationCard key={application._id} application={application} />
          ))}
        </div>
      </div>
    </Card>
  )
}

export default ApplicationsList
