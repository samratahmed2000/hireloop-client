import { baseUrl } from "../utils"

// Payment
export const checkoutVerify = async (sessionId: string) => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured")
  }

  const res = await fetch(`${baseUrl}/payments/checkout_verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId }),
    cache: "no-store",
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(
      typeof result?.message === "string"
        ? result.message
        : `Failed to verify payment `
    )
  }

  return result
}
