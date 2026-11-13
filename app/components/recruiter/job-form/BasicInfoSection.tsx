import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Job, JobType } from "@/lib/types/jobs"
import JobFormSection, { RequiredMark } from "./JobFormSection"
import {
  controlClassName,
  isJobType,
  jobCategories,
  jobTypeItemClassName,
  jobTypes,
  selectTriggerClassName,
} from "./constants"

type BasicInfoSectionProps = {
  job?: Job
  fieldId: (name: string) => string
  jobType: JobType
  onJobTypeChange: (jobType: JobType) => void
}

function BasicInfoSection({
  job,
  fieldId,
  jobType,
  onJobTypeChange,
}: BasicInfoSectionProps) {
  return (
    <JobFormSection
      step={1}
      title="Basic Information"
      description="The core details candidates see at the top of your listing."
    >
      <FieldGroup className="gap-4 sm:grid sm:grid-cols-2">
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor={fieldId("job-title")}>
            Job Title <RequiredMark />
          </FieldLabel>
          <InputGroup className={controlClassName}>
            <InputGroupInput
              id={fieldId("job-title")}
              name="jobTitle"
              defaultValue={job?.jobTitle}
              placeholder="e.g. Senior Frontend Engineer"
              autoComplete="off"
              required
            />
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel htmlFor={fieldId("company-name")}>
            Company Name <RequiredMark />
          </FieldLabel>
          <InputGroup className={controlClassName}>
            <InputGroupInput
              id={fieldId("company-name")}
              name="companyName"
              defaultValue={job?.companyName}
              placeholder="e.g. HireLoop Network"
              autoComplete="organization"
              required
            />
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel htmlFor={fieldId("job-category")}>
            Job Category <RequiredMark />
          </FieldLabel>
          <Select
            items={jobCategories}
            defaultValue={job?.jobCategory ?? "engineering"}
            name="jobCategory"
            required
          >
            <SelectTrigger
              id={fieldId("job-category")}
              className={selectTriggerClassName}
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {jobCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field className="sm:col-span-2">
          <FieldLabel id={fieldId("job-type-label")}>
            Job Type <RequiredMark />
          </FieldLabel>
          <ToggleGroup
            aria-labelledby={fieldId("job-type-label")}
            value={[jobType]}
            onValueChange={(value) => {
              const [selected] = value.filter(isJobType)

              if (selected) {
                onJobTypeChange(selected)
              }
            }}
            spacing={2}
            className="flex w-full flex-wrap"
          >
            {jobTypes.map((type) => (
              <ToggleGroupItem
                key={type}
                value={type}
                variant="outline"
                className={jobTypeItemClassName}
              >
                {type}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Field>
      </FieldGroup>
    </JobFormSection>
  )
}

export default BasicInfoSection
