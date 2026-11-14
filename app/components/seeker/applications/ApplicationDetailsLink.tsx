import Link from "next/link"
import { Button } from "@/components/ui/button"
import { detailsButtonClassName } from "./application-utils"

const ApplicationDetailsLink = ({ jobId }: { jobId: string }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      nativeButton={false}
      className={detailsButtonClassName}
      render={<Link href={`/browse-jobs/${jobId}`} />}
    >
      Details
    </Button>
  )
}

export default ApplicationDetailsLink
