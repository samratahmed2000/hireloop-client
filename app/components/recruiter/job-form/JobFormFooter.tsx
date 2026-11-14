import { SendIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { jobSubmitButtonClassName } from "./constants"

type JobFormFooterProps = {
  isEditing: boolean
  isSubmitting: boolean
  onCancel?: () => void
}

function JobFormFooter({
  isEditing,
  isSubmitting,
  onCancel,
}: JobFormFooterProps) {
  const label = isSubmitting
    ? isEditing
      ? "Updating..."
      : "Publishing..."
    : isEditing
      ? "Update Job"
      : "Publish Job"

  return (
    <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:justify-end">
      {onCancel && (
        <Button
          type="button"
          variant="outline"
          className="h-10 cursor-pointer rounded-xl px-5"
          onClick={onCancel}
        >
          Cancel
        </Button>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className={jobSubmitButtonClassName}
      >
        {label}
        <SendIcon data-icon="inline-end" />
      </Button>
    </div>
  )
}

export default JobFormFooter
