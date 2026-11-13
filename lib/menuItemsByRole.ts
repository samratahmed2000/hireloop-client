import { NavItem, Role } from "@/app/types/type"
import {
  BookmarkIcon,
  BriefcaseIcon,
  Building2Icon,
  CreditCardIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  PlusCircle,
  SettingsIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react"

export const menuItemsByRole: Record<Role, NavItem[]> = {
  seeker: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboardIcon,
    },
    {
      id: "jobs",
      name: "Jobs",
      url: "/dashboard/seeker/jobs",
      icon: BriefcaseIcon,
    },
    {
      id: "saved",
      name: "Saved Jobs",
      url: "/dashboard/seeker/saved-jobs",
      icon: BookmarkIcon,
    },
    {
      id: "applications",
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileTextIcon,
    },
    {
      id: "billing",
      name: "Billing",
      url: "/dashboard/seeker/billing",
      icon: WalletIcon,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: SettingsIcon,
    },
  ],
  recruiter: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboardIcon,
    },
    {
      id: "add-job",
      name: "Add Job",
      url: "/dashboard/recruiter/new",
      icon: PlusCircle,
    },
    {
      id: "jobs",
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: BriefcaseIcon,
    },
    {
      id: "applications",
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileTextIcon,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: SettingsIcon,
    },
  ],
  admin: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboardIcon,
    },
    {
      id: "users",
      name: "Users",
      url: "/dashboard/admin/users",
      icon: UsersIcon,
    },
    {
      id: "companies",
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2Icon,
    },
    {
      id: "jobs",
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: BriefcaseIcon,
    },
    {
      id: "payments",
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: CreditCardIcon,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: SettingsIcon,
    },
  ],
}

export const isRole = (value: string | null | undefined): value is Role =>
  value === "seeker" || value === "recruiter" || value === "admin"
