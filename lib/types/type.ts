import { LucideIcon } from "lucide-react"

export type Role = "seeker" | "recruiter" | "admin"

export type NavItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}
