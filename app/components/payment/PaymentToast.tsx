"use client"

import { useEffect, useRef } from "react"
import { toast } from "@/components/ui/toast"

type PaymentToastProps = {
  title: string
  description?: string
  type?: "success" | "error" | "warning" | "info"
}

const PaymentToast = ({
  title,
  description,
  type = "info",
}: PaymentToastProps) => {
  const hasShown = useRef(false)

  useEffect(() => {
    if (hasShown.current) {
      return
    }

    hasShown.current = true
    toast.add({ title, description, type })
  }, [title, description, type])

  return null
}

export default PaymentToast
