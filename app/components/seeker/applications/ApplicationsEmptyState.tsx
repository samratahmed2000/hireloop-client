import Link from "next/link"
import { FileTextIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { brandButtonClassName } from "./application-utils"
import type { ApplicationsTab } from "./application-utils"

type ApplicationsEmptyStateProps = {
  variant: ApplicationsTab | "error"
}

const emptyContent = {
  error: {
    title: "Couldn't load your applications",
    description:
      "Something went wrong while fetching your applications. Please refresh the page and try again.",
  },
  active: {
    title: "No active applications",
    description:
      "Your submitted applications will appear here once you apply to a role.",
  },
  archived: {
    title: "No archived applications",
    description: "Applications you archive will show up here.",
  },
} as const

const ApplicationsEmptyState = ({ variant }: ApplicationsEmptyStateProps) => {
  const { title, description } = emptyContent[variant]

  return (
    <Empty className="rounded-2xl border border-dashed border-border bg-card py-14 sm:py-16">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileTextIcon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>

      {variant === "active" && (
        <EmptyContent>
          <Button
            nativeButton={false}
            className={brandButtonClassName}
            render={<Link href="/browse-jobs" />}
          >
            Browse Jobs
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}

export default ApplicationsEmptyState
