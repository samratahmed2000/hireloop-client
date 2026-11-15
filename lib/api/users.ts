import { baseUrl } from "../utils"

export const getUserPremiumById = async (userId: string) => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured")
  }

  const res = await fetch(`${baseUrl}/users/${userId}/premium`, {
    cache: "no-store",
  })
  return await res.json()
}
