"use server"

import { Job } from "../types/jobs"
import { baseUrl } from "../utils"

// Get All Jobs
export const getJobs = async () => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured")
  }

  const res = await fetch(`${baseUrl}/jobs`, { cache: "no-store" })

  if (!res.ok) {
    throw new Error("Failed to load jobs")
  }

  return (await res.json()) as Job[]
}

// Browse Jobs
export const getBrowseJobs = async (query = ""): Promise<Job[]> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured")
  }

  const res = await fetch(`${baseUrl}/browse-jobs?${query}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to load jobs")
  }

  return (await res.json()) as Job[]
}

// Job Details
export const getJobById = async (jobId: string): Promise<Job | null> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured")
  }

  const res = await fetch(`${baseUrl}/jobs/${jobId}`, { cache: "no-store" })

  if (!res.ok) {
    throw new Error("Failed to load job details")
  }

  return (await res.json()) as Job | null
}
