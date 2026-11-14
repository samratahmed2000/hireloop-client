"use client"

import { useState } from "react"
import { toast } from "@/components/ui/toast"
import { getApplicationStats } from "@/lib/applications"
import type { Application } from "@/lib/types/applications"
import ApplicationsEmptyState from "./ApplicationsEmptyState"
import ApplicationsHeader from "./ApplicationsHeader"
import ApplicationsList from "./ApplicationsList"
import ApplicationStats from "./ApplicationStats"
import { getApplicationsByTab } from "./application-utils"
import type { ApplicationsTab } from "./application-utils"
import { exportApplicationsToPdf } from "./export-applications"

type ApplicationsViewProps = {
  applications: Application[]
  loadFailed?: boolean
}

const ApplicationsView = ({
  applications,
  loadFailed = false,
}: ApplicationsViewProps) => {
  const [tab, setTab] = useState<ApplicationsTab>("active")

  const stats = getApplicationStats(applications)
  const filteredApplications = getApplicationsByTab(applications, tab)

  const handleExport = () => {
    const exported = exportApplicationsToPdf(filteredApplications)

    if (!exported) {
      toast.add({
        title: "Pop-up blocked",
        description:
          "Allow pop-ups for this site to export your applications as a PDF.",
        type: "error",
      })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <ApplicationsHeader
        tab={tab}
        onTabChange={setTab}
        onExport={handleExport}
        exportDisabled={loadFailed || filteredApplications.length === 0}
      />

      {loadFailed ? (
        <ApplicationsEmptyState variant="error" />
      ) : (
        <>
          <ApplicationStats stats={stats} />

          {filteredApplications.length === 0 ? (
            <ApplicationsEmptyState variant={tab} />
          ) : (
            <ApplicationsList applications={filteredApplications} />
          )}
        </>
      )}
    </div>
  )
}

export default ApplicationsView
