import { DownloadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { tabItemClassName } from "./application-utils"
import type { ApplicationsTab } from "./application-utils"

type ApplicationsHeaderProps = {
  tab: ApplicationsTab
  onTabChange: (tab: ApplicationsTab) => void
  onExport: () => void
  exportDisabled?: boolean
}

const ApplicationsHeader = ({
  tab,
  onTabChange,
  onExport,
  exportDisabled = false,
}: ApplicationsHeaderProps) => {
  const handleTabChange = (value: string[]) => {
    const nextTab = value[0]

    if (nextTab === "active" || nextTab === "archived") {
      onTabChange(nextTab)
    }
  }

  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
          My Applications
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-pretty text-muted-foreground">
          Track your job applications and interview progress in real-time.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <ToggleGroup
          aria-label="Filter applications"
          variant="outline"
          value={[tab]}
          onValueChange={handleTabChange}
          className="rounded-xl border-border bg-card p-1"
        >
          <ToggleGroupItem value="active" className={tabItemClassName}>
            Active
          </ToggleGroupItem>
          <ToggleGroupItem value="archived" className={tabItemClassName}>
            Archived
          </ToggleGroupItem>
        </ToggleGroup>

        <Button
          type="button"
          variant="outline"
          onClick={onExport}
          disabled={exportDisabled}
          className="h-9 cursor-pointer rounded-xl border-border bg-card px-3.5 text-xs font-semibold shadow-xs hover:bg-muted disabled:cursor-not-allowed"
        >
          <DownloadIcon />
          Export PDF
        </Button>
      </div>
    </header>
  )
}

export default ApplicationsHeader
