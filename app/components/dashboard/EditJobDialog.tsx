"use client"

import { useState } from "react"
import { PencilIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Job } from "@/lib/types/jobs"
import JobForm from "../recruiter/job-form/JobForm"
import { rowActionButtonClassName } from "../recruiter/JobActions"

const EditJobDialog = ({ job }: { job: Job }) => {
  const [open, setOpen] = useState(false)
  const idPrefix = `edit-job-${job._id}`

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={`${rowActionButtonClassName} cursor-pointer`}
            aria-label={`Edit ${job.jobTitle}`}
          >
            <PencilIcon />
          </Button>
        }
      />

      <DialogContent className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="shrink-0 border-b border-border px-4 py-4 pr-12 sm:px-5">
          <DialogTitle className="text-base sm:text-lg">Update Job</DialogTitle>
          <DialogDescription>
            Update the details of this listing. Changes are visible to
            candidates right away.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
          <JobForm
            id={`${idPrefix}-form`}
            mode="edit"
            job={job}
            idPrefix={idPrefix}
            onCancel={() => setOpen(false)}
            onSuccess={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditJobDialog
