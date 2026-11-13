"use client"

import { useState, type FormEvent } from "react"
import {
  CalendarDaysIcon,
  DollarSignIcon,
  MapPinIcon,
  SendIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import SectionCard from "./SectionCard"
import {
  Field,
  FieldContent,
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
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { toast } from "@/components/ui/toast"
import { AddNewJob } from "@/lib/actions/jobs"
import type {
  JobCategory,
  JobType,
  NewJobInput,
  SalaryFrequency,
} from "@/lib/types/jobs"

const jobCategories = [
  { value: "engineering", label: "Engineering & Tech" },
  { value: "design", label: "Design" },
  { value: "product", label: "Product" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Customer Support" },
  { value: "operations", label: "Operations" },
  { value: "finance", label: "Finance" },
  { value: "people", label: "People & HR" },
  { value: "other", label: "Other" },
] satisfies readonly { value: JobCategory; label: string }[]

const salaryFrequencies = [
  { value: "hourly", label: "Per hour" },
  { value: "monthly", label: "Per month" },
  { value: "yearly", label: "Per year" },
] satisfies readonly { value: SalaryFrequency; label: string }[]

const jobTypes: readonly JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
]

const controlClassName = "h-10 rounded-xl border-border bg-foreground/5"
const selectTriggerClassName =
  "h-10 w-full rounded-xl border-border bg-foreground/5"

function isJobType(value: string): value is JobType {
  return (jobTypes as readonly string[]).includes(value)
}

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-destructive">
      *
    </span>
  )
}

function NewJobForm() {
  const [isRemote, setIsRemote] = useState(false)
  const [jobType, setJobType] = useState<JobType[]>(["Full-time"])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const job: NewJobInput = {
      jobTitle: String(formData.get("jobTitle") ?? "").trim(),
      companyName: String(formData.get("companyName") ?? "").trim(),
      jobCategory: formData.get("jobCategory") as JobCategory,
      jobType: jobType[0] ?? "Full-time",
      remote: isRemote,
      location: String(formData.get("location") ?? "").trim(),
      applicationDeadline: String(formData.get("applicationDeadline") ?? ""),
      minSalary: Number(formData.get("minSalary")),
      maxSalary: Number(formData.get("maxSalary")),
      salaryFrequency: formData.get("salaryFrequency") as SalaryFrequency,
      responsibilities: String(formData.get("responsibilities") ?? "").trim(),
      qualifications: String(formData.get("qualifications") ?? "").trim(),
    }

    setIsSubmitting(true)

    try {
      await AddNewJob(job)

      toast.add({
        title: "Job published",
        description:
          "Your listing is live and visible to qualified candidates.",
        type: "success",
      })

      form.reset()
      setIsRemote(false)
      setJobType(["Full-time"])
    } catch (error) {
      toast.add({
        title: "Could not publish job",
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
      id="new-job-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 sm:gap-6"
    >
      <SectionCard
        step={1}
        title="Basic Information"
        description="The core details candidates see at the top of your listing."
      >
        <FieldGroup className="sm:grid sm:grid-cols-2">
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="job-title">
              Job Title <RequiredMark />
            </FieldLabel>
            <InputGroup className={controlClassName}>
              <InputGroupInput
                id="job-title"
                name="jobTitle"
                placeholder="e.g. Senior Frontend Engineer"
                autoComplete="off"
                required
              />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="company-name">
              Company Name <RequiredMark />
            </FieldLabel>
            <InputGroup className={controlClassName}>
              <InputGroupInput
                id="company-name"
                name="companyName"
                placeholder="e.g. HireLoop Network"
                autoComplete="organization"
                required
              />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="job-category">
              Job Category <RequiredMark />
            </FieldLabel>
            <Select
              items={jobCategories}
              defaultValue="engineering"
              name="jobCategory"
              required
            >
              <SelectTrigger
                id="job-category"
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
            <FieldLabel id="job-type-label">
              Job Type <RequiredMark />
            </FieldLabel>
            <ToggleGroup
              aria-labelledby="job-type-label"
              value={jobType}
              onValueChange={(value) => {
                const selected = value.filter(isJobType)

                if (selected.length > 0) {
                  setJobType(selected)
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
                  className="h-10 min-w-0 flex-1 basis-[calc(50%-0.25rem)] justify-center rounded-xl border-border bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground data-pressed:border-[#5b3bf5]/50 data-pressed:bg-[#5b3bf5]/10 data-pressed:text-[#5b3bf5] sm:basis-0 dark:data-pressed:border-[#9d8cff]/40 dark:data-pressed:bg-[#9d8cff]/15 dark:data-pressed:text-[#c3b9ff]"
                >
                  {type}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </Field>
        </FieldGroup>
      </SectionCard>

      <SectionCard
        step={2}
        title="Location, Compensation & Timeline"
        description="Set where the role is based, how it pays, and when to apply."
      >
        <FieldGroup className="gap-5 sm:grid sm:grid-cols-2">
          <Field
            orientation="horizontal"
            className="items-center rounded-xl border border-border bg-muted/40 p-4 sm:col-span-2"
          >
            <FieldContent>
              <FieldLabel htmlFor="remote">Remote Work</FieldLabel>
            </FieldContent>
            <Switch
              id="remote"
              name="remote"
              checked={isRemote}
              onCheckedChange={setIsRemote}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="job-location">
              Job Location <RequiredMark />
            </FieldLabel>
            <InputGroup className={controlClassName}>
              <InputGroupAddon>
                <MapPinIcon />
              </InputGroupAddon>
              <InputGroupInput
                id="job-location"
                name="location"
                placeholder="e.g. New York, USA"
                autoComplete="address-level2"
                required
              />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="application-deadline">
              Application Deadline <RequiredMark />
            </FieldLabel>
            <InputGroup className={controlClassName}>
              <InputGroupAddon>
                <CalendarDaysIcon />
              </InputGroupAddon>
              <InputGroupInput
                id="application-deadline"
                name="applicationDeadline"
                type="date"
                className="text-muted-foreground"
                required
              />
            </InputGroup>
          </Field>

          <div className="grid gap-5 sm:col-span-2 sm:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="min-salary">
                Min Salary / Rate <RequiredMark />
              </FieldLabel>
              <InputGroup className={controlClassName}>
                <InputGroupAddon>
                  <DollarSignIcon />
                </InputGroupAddon>
                <InputGroupInput
                  id="min-salary"
                  name="minSalary"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="25"
                  required
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="max-salary">
                Max Salary / Rate <RequiredMark />
              </FieldLabel>
              <InputGroup className={controlClassName}>
                <InputGroupAddon>
                  <DollarSignIcon />
                </InputGroupAddon>
                <InputGroupInput
                  id="max-salary"
                  name="maxSalary"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="40"
                  required
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="salary-frequency">
                Frequency <RequiredMark />
              </FieldLabel>
              <Select
                items={salaryFrequencies}
                defaultValue="hourly"
                name="salaryFrequency"
                required
              >
                <SelectTrigger
                  id="salary-frequency"
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
      </SectionCard>

      <SectionCard
        step={3}
        title="Responsibilities & Requirements"
        description="Help candidates understand what you are looking for."
      >
        <FieldGroup className="gap-5">
          <Field>
            <FieldLabel htmlFor="responsibilities" className="justify-between">
              <span>
                Key Responsibilities <RequiredMark />
              </span>
            </FieldLabel>

            <Textarea
              id="responsibilities"
              name="responsibilities"
              placeholder={
                "• Design and ship responsive, accessible interfaces\n• Collaborate with product, design, and backend teams\n• Improve performance and developer experience"
              }
              className="min-h-32 rounded-xl border-border bg-foreground/5"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="qualifications" className="justify-between">
              <span>
                Qualifications & Requirements <RequiredMark />
              </span>
            </FieldLabel>

            <Textarea
              id="qualifications"
              name="qualifications"
              placeholder={
                "• 3+ years of experience with modern web tooling\n• Solid understanding of design systems\n• Experience partnering closely with product"
              }
              className="min-h-32 rounded-xl border-border bg-foreground/5"
              required
            />
          </Field>
        </FieldGroup>
      </SectionCard>

      <div className="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:items-center sm:justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-10 cursor-pointer rounded-xl border-transparent bg-[#5b3bf5] px-5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(91,59,245,0.35)] hover:bg-[#6a4dff] focus-visible:ring-[#5b3bf5]/50"
        >
          {isSubmitting ? "Publishing..." : "Publish Job"}
          <SendIcon data-icon="inline-end" />
        </Button>
      </div>
    </form>
  )
}

export default NewJobForm
