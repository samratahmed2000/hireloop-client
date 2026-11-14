import { baseUrl } from "../utils"
import type { Application } from "../types/applications"

// Application
export const applyToJob = async (data: Omit<Application, "_id">) => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured")
  }

  const res = await fetch(`${baseUrl}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(
      typeof result?.message === "string"
        ? result.message
        : "Failed to submit application"
    )
  }

  return result
}
