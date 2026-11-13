import {
  CalendarDaysIcon,
  DollarSignIcon,
  GlobeIcon,
  MapPinIcon,
} from "lucide-react"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { Job } from "@/lib/types/jobs"
import JobFormSection, { RequiredMark } from "./JobFormSection"
import {
  controlClassName,
  salaryFrequencies,
  selectTriggerClassName,
  toDateInputValue,
} from "./constants"

type CompensationSectionProps = {
  job?: Job
  fieldId: (name: string) => string
  isRemote: boolean
  onRemoteChange: (isRemote: boolean) => void
}

function CompensationSection({
  job,
  fieldId,
  isRemote,
  onRemoteChange,
}: CompensationSectionProps) {
  return (
    <JobFormSection
      step={2}
      title="Location, Compensation & Timeline"
      description="Set where the role is based, how it pays, and when to apply."
    >
      <FieldGroup className="gap-4">
        <Field
          orientation="horizontal"
          className="items-center gap-3 rounded-xl border border-border bg-muted/40 p-4"
        >
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#5b3bf5]/10 text-[#5b3bf5] dark:bg-[#9d8cff]/15 dark:text-[#9d8cff]"
          >
            <GlobeIcon className="size-4" />
          </span>
          <FieldContent>
            <FieldLabel htmlFor={fieldId("remote")}>
              Remote Work Allowed (IsRemote)
            </FieldLabel>
            <FieldDescription>
              Enable worldwide or distributed candidate applications
            </FieldDescription>
          </FieldContent>
          <Switch
            id={fieldId("remote")}
            checked={isRemote}
            onCheckedChange={onRemoteChange}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor={fieldId("job-location")}>
              Job Location <RequiredMark />
            </FieldLabel>
            <InputGroup className={controlClassName}>
              <InputGroupAddon>
                <MapPinIcon />
              </InputGroupAddon>
              <InputGroupInput
                id={fieldId("job-location")}
                name="location"
                defaultValue={job?.location}
                placeholder="e.g. New York, USA"
                autoComplete="address-level2"
                required
              />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor={fieldId("application-deadline")}>
              Application Deadline <RequiredMark />
            </FieldLabel>
            <InputGroup className={controlClassName}>
              <InputGroupAddon>
                <CalendarDaysIcon />
              </InputGroupAddon>
              <InputGroupInput
                id={fieldId("application-deadline")}
                name="applicationDeadline"
                type="date"
                defaultValue={toDateInputValue(job?.applicationDeadline)}
                className="text-muted-foreground"
                required
              />
            </InputGroup>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field>
            <FieldLabel htmlFor={fieldId("min-salary")}>
              Min Salary / Rate <RequiredMark />
            </FieldLabel>
            <InputGroup className={controlClassName}>
              <InputGroupAddon>
                <DollarSignIcon />
              </InputGroupAddon>
              <InputGroupInput
                id={fieldId("min-salary")}
                name="minSalary"
                type="number"
                inputMode="numeric"
                min={0}
                defaultValue={job?.minSalary}
                placeholder="25"
                required
              />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor={fieldId("max-salary")}>
              Max Salary / Rate <RequiredMark />
            </FieldLabel>
            <InputGroup className={controlClassName}>
              <InputGroupAddon>
                <DollarSignIcon />
              </InputGroupAddon>
              <InputGroupInput
                id={fieldId("max-salary")}
                name="maxSalary"
                type="number"
                inputMode="numeric"
                min={0}
                defaultValue={job?.maxSalary}
                placeholder="40"
                required
              />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor={fieldId("salary-frequency")}>
              Frequency <RequiredMark />
            </FieldLabel>
            <Select
              items={salaryFrequencies}
              defaultValue={job?.salaryFrequency ?? "hourly"}
              name="salaryFrequency"
              required
            >
              <SelectTrigger
                id={fieldId("salary-frequency")}
                className={selectTriggerClassName}
              >
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                {salaryFrequencies.map((frequency) => (
                  <SelectItem key={frequency.value} value={frequency.value}>
                    {frequency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </FieldGroup>
    </JobFormSection>
  )
}

export default CompensationSection
