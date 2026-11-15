"use server"

import { baseUrl } from "../utils"
import type { Application } from "../types/applications"

// Get All Applications
export const getApplications = async (query = ""): Promise<Application[]> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured")
  }

  const search = query ? `?${query}` : ""
  const res = await fetch(`${baseUrl}/applications${search}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to load applications")
  }

  return (await res.json()) as Application[]
}

// Applications Count
export const getApplicationsCount = async (
  query = ""
): Promise<{ count: number }> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured")
  }

  const search = query ? `?${query}` : ""
  const res = await fetch(`${baseUrl}/applications/count${search}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to load applications")
  }

  return await res.json()
}
