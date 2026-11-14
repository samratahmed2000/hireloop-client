"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2Icon, Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { deleteJob } from "@/lib/actions/jobs"
import type { Job } from "@/lib/types/jobs"
import { rowActionButtonClassName } from "../recruiter/job/JobActions"

const DeleteJobDialog = ({ job }: { job: Job }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteJob = async () => {
    setIsDeleting(true)

    try {
      await deleteJob(job._id)

      toast.add({
        title: "Job deleted",
        description: `"${job.jobTitle}" has been removed permanently.`,
        type: "success",
      })

      setOpen(false)
      router.refresh()
    } catch (error) {
      toast.add({
        title: "Could not delete job",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        type: "error",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="destructive"
            size="sm"
            className={`${rowActionButtonClassName} cursor-pointer`}
            aria-label={`Delete ${job.jobTitle}`}
          >
            <Trash2Icon />
          </Button>
        }
      />

      <AlertDialogContent
        size="sm"
        className="data-[size=sm]:max-w-[calc(100%-1.5rem)] data-[size=sm]:sm:max-w-sm"
      >
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete job post?</AlertDialogTitle>
          <AlertDialogDescription className="wrap-break-word">
            <span className="font-medium text-foreground">{job.jobTitle}</span>{" "}
            will be permanently deleted. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            variant="outline"
            disabled={isDeleting}
            className="cursor-pointer"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDeleteJob}
            disabled={isDeleting}
            className="cursor-pointer"
          >
            {isDeleting ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <Trash2Icon />
            )}
            {isDeleting ? "Deleting..." : "Delete job"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteJobDialog
