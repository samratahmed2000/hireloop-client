import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import type { Job } from "@/lib/types/jobs"
import JobFormSection, { RequiredMark } from "./JobFormSection"

type RequirementsSectionProps = {
  job?: Job
  fieldId: (name: string) => string
}

function RequirementsSection({ job, fieldId }: RequirementsSectionProps) {
  return (
    <JobFormSection
      step={3}
      title="Responsibilities & Requirements"
      description="Help candidates understand what you are looking for."
    >
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor={fieldId("responsibilities")}>
            Key Responsibilities <RequiredMark />
          </FieldLabel>
          <Textarea
            id={fieldId("responsibilities")}
            name="responsibilities"
            defaultValue={job?.responsibilities}
            placeholder={
              "• Design and ship responsive, accessible interfaces\n• Collaborate with product, design, and backend teams\n• Improve performance and developer experience"
            }
            className="min-h-32 rounded-xl border-border bg-foreground/5"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor={fieldId("qualifications")}>
            Qualifications & Requirements <RequiredMark />
          </FieldLabel>
          <Textarea
            id={fieldId("qualifications")}
            name="qualifications"
            defaultValue={job?.qualifications}
            placeholder={
              "• 3+ years of experience with modern web tooling\n• Solid understanding of design systems\n• Experience partnering closely with product"
            }
            className="min-h-32 rounded-xl border-border bg-foreground/5"
            required
          />
        </Field>
      </FieldGroup>
    </JobFormSection>
  )
}

export default RequirementsSection
