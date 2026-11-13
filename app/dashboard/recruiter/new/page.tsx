import {} from "@/components/ui/breadcrumb"
import NewJobForm from "@/app/components/recruiter/NewJobForm"

const NewJobPage = () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="flex flex-col gap-5 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Post a New Job
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-pretty text-muted-foreground">
            Fill in the position specifications to attract qualified talent
            across our network.
          </p>
        </div>
      </header>

      <div className="sm:mt-8">
        <NewJobForm />
      </div>
    </div>
  )
}

export default NewJobPage
