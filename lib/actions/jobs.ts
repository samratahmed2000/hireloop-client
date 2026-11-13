"use server"

import type { InsertedJob, NewJobInput } from "@/lib/types/jobs"
import { baseUrl } from "../utils"

export const AddNewJob = async (job: NewJobInput): Promise<InsertedJob> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured")
  }

  const res = await fetch(`${baseUrl}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
    cache: "no-store",
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(
      typeof data?.message === "string" ? data.message : "Failed to publish job"
    )
  }

  return data as InsertedJob
}
