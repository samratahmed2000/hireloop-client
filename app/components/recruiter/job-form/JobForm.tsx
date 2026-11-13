"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/toast"
import { addNewJob, editJob } from "@/lib/actions/jobs"
import type { Job, JobType } from "@/lib/types/jobs"
import { cn } from "@/lib/utils"
import BasicInfoSection from "./BasicInfoSection"
import CompensationSection from "./CompensationSection"
import JobFormFooter from "./JobFormFooter"
import { buildJobPayload, validateJobPayload } from "./payload"
import RequirementsSection from "./RequirementsSection"

type JobFormProps = {
  mode?: "create" | "edit"
  job?: Job
  id?: string
  idPrefix?: string
  className?: string
  onCancel?: () => void
  onSuccess?: () => void
}

function JobForm({
  mode = "create",
  job,
  id,
  idPrefix = "job",
  className,
  onCancel,
  onSuccess,
}: JobFormProps) {
  const router = useRouter()
  const isEditing = mode === "edit" && Boolean(job)

  const [isRemote, setIsRemote] = useState(job?.remote ?? false)
  const [jobType, setJobType] = useState<JobType>(job?.jobType ?? "Full-time")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fieldId = (name: string) => `${idPrefix}-${name}`

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = buildJobPayload(
      new FormData(event.currentTarget),
      jobType,
      isRemote
    )
    const validationError = validateJobPayload(payload)

    if (validationError) {
      toast.add({ ...validationError, type: "error" })
      return
    }

    setIsSubmitting(true)

    try {
      if (isEditing && job) {
        await editJob(job._id, payload)

        toast.add({
          title: "Job updated",
          description: "Your changes are now live for candidates.",
          type: "success",
        })

        onSuccess?.()
        router.refresh()
      } else {
        await addNewJob(payload)

        toast.add({
          title: "Job published",
          description:
            "Your listing is live and visible to qualified candidates.",
          type: "success",
        })

        router.push("/dashboard/recruiter/jobs")
        router.refresh()
      }
    } catch (error) {
      toast.add({
        title: isEditing ? "Could not update job" : "Could not publish job",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-6 rounded-2xl border border-border bg-card p-4 sm:p-6",
        className
      )}
    >
      <BasicInfoSection
        job={job}
        fieldId={fieldId}
        jobType={jobType}
        onJobTypeChange={setJobType}
      />
      <CompensationSection
        job={job}
        fieldId={fieldId}
        isRemote={isRemote}
        onRemoteChange={setIsRemote}
      />
      <RequirementsSection job={job} fieldId={fieldId} />
      <JobFormFooter
        isEditing={isEditing}
        isSubmitting={isSubmitting}
        onCancel={onCancel}
      />
    </form>
  )
}

export default JobForm
