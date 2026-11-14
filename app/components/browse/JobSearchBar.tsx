"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

function JobSearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get("search") ?? ""

  const applySearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const nextSearch = value.trim()

    if (nextSearch) {
      params.set("search", nextSearch)
    } else {
      params.delete("search")
    }

    const query = params.toString()
    router.push(query ? `/browse-jobs?${query}` : "/browse-jobs", {
      scroll: false,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const value = formData.get("searchField")

    applySearch(typeof value === "string" ? value : "")
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "" || !searchParams.has("search")) {
      return
    }

    applySearch("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search jobs"
      className="rounded-2xl border border-border bg-card/80 p-2 shadow-[0_24px_80px_-40px_rgba(91,59,245,0.45)] backdrop-blur-xl sm:p-2.5"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor="browse-job-search" className="sr-only">
          Search by job title, keywords
        </label>
        <InputGroup className="h-12 flex-1 rounded-xl border-border bg-foreground/5 shadow-none">
          <InputGroupAddon className="pl-3 text-muted-foreground">
            <SearchIcon className="size-4.5" />
          </InputGroupAddon>
          <InputGroupInput
            key={search}
            id="browse-job-search"
            name="searchField"
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            defaultValue={search}
            onChange={handleInputChange}
            placeholder="Search by job title, keywords..."
            className="h-full text-sm text-foreground placeholder:text-muted-foreground sm:text-base"
          />
        </InputGroup>

        <Button
          type="submit"
          className="h-12 w-full shrink-0 cursor-pointer rounded-xl border-transparent bg-foreground px-6 text-sm font-semibold text-background shadow-sm hover:bg-foreground/90 focus-visible:ring-ring/50 sm:w-auto"
        >
          Search Jobs
        </Button>
      </div>
    </form>
  )
}

export default JobSearchBar
