import type { CategoryMeta, JobCategory } from "@/lib/types/jobs"
import {
  BriefcaseIcon,
  CodeXmlIcon,
  HeadsetIcon,
  LandmarkIcon,
  LayoutGridIcon,
  MegaphoneIcon,
  PenToolIcon,
  TrendingUpIcon,
  UsersIcon,
  WorkflowIcon,
} from "lucide-react"

const CategoryMeta: Record<JobCategory, CategoryMeta> = {
  engineering: {
    label: "Engineering",
    icon: CodeXmlIcon,
    iconClassName:
      "bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
  },
  design: {
    label: "Design",
    icon: PenToolIcon,
    iconClassName:
      "bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400",
  },
  product: {
    label: "Product",
    icon: LayoutGridIcon,
    iconClassName:
      "bg-purple-500/10 text-purple-600 dark:bg-purple-400/10 dark:text-purple-400",
  },
  marketing: {
    label: "Marketing",
    icon: MegaphoneIcon,
    iconClassName:
      "bg-pink-500/10 text-pink-600 dark:bg-pink-400/10 dark:text-pink-400",
  },
  sales: {
    label: "Sales",
    icon: TrendingUpIcon,
    iconClassName:
      "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
  },
  support: {
    label: "Customer Support",
    icon: HeadsetIcon,
    iconClassName:
      "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400",
  },
  operations: {
    label: "Operations",
    icon: WorkflowIcon,
    iconClassName:
      "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400",
  },
  finance: {
    label: "Finance",
    icon: LandmarkIcon,
    iconClassName:
      "bg-teal-500/10 text-teal-600 dark:bg-teal-400/10 dark:text-teal-400",
  },
  people: {
    label: "People & HR",
    icon: UsersIcon,
    iconClassName:
      "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400",
  },
  other: {
    label: "Other",
    icon: BriefcaseIcon,
    iconClassName:
      "bg-zinc-500/10 text-zinc-600 dark:bg-zinc-400/10 dark:text-zinc-400",
  },
}

export default CategoryMeta
