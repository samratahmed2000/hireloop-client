import Link from "next/link"
import { EyeIcon, Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Job } from "@/lib/types/jobs"
import EditJobDialog from "../dashboard/EditJobDialog"

export const rowActionButtonClassName =
  "h-9 rounded-lg border-[#5b3bf5]/20 bg-[#5b3bf5]/10 px-2.5 text-xs font-semibold text-[#5b3bf5] hover:bg-[#5b3bf5]/15 hover:text-[#5b3bf5] dark:border-[#9d8cff]/25 dark:bg-[#9d8cff]/10 dark:text-[#c3b9ff] dark:hover:bg-[#9d8cff]/15 dark:hover:text-[#c3b9ff]"

function JobActions({ job }: { job: Job }) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <span>
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          className={rowActionButtonClassName}
          render={<Link href={`/jobs/${job._id}`} />}
        >
          <EyeIcon />
        </Button>
      </span>

      <span>
        <EditJobDialog job={job}/>
      </span>

      <span>
        <Button
          variant="destructive"
          size="sm"
          aria-label={`Delete ${job.jobTitle}`}
          className={rowActionButtonClassName}
        >
          <Trash2Icon />
        </Button>
      </span>
    </div>
  )
}

export default JobActions
