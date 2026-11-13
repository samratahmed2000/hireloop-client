"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOutIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { signOut, useSession } from "@/lib/auth-client"
import Image from "next/image"
import { NavItem } from "@/app/types/type"
import { isRole, menuItemsByRole } from "@/lib/menuItemsByRole"

const DashboardSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const role = isRole(session?.user?.role) ? session.user.role : "seeker"
  const user = session?.user

  const displayName = user?.name?.trim() || "HireLoop member"

  const initials =
    displayName
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "HL"

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/"
    }

    const isDashboardHome = /^\/dashboard\/[^/]+$/.test(url)

    return isDashboardHome
      ? pathname === url
      : pathname === url || pathname.startsWith(`${url}/`)
  }

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
          router.refresh()
        },
      },
    })
  }

  const renderNavItem = (item: NavItem) => {
    const active = isActive(item.url)

    return (
      <SidebarMenuItem key={item.id}>
        {active && (
          <span
            aria-hidden="true"
            className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-sidebar-primary group-data-[collapsible=icon]:hidden"
          />
        )}
        <SidebarMenuButton
          isActive={active}
          tooltip={item.name}
          render={
            <Link href={item.url} aria-current={active ? "page" : undefined} />
          }
        >
          <item.icon />
          <span>{item.name}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b border-sidebar-border/70 p-3 group-data-[collapsible=icon]:p-1">
          <Link
            href="/"
            className="flex flex-col gap-1 rounded-lg p-1 ring-sidebar-ring outline-hidden transition-colors group-data-[collapsible=icon]:justify-center hover:bg-sidebar-accent/60 focus-visible:ring-2"
          >
            <span>
              <Image
                src="/assets/images/logo.png"
                alt="HireLoop"
                width={154}
                height={44}
                loading="eager"
                className="h-8 w-auto sm:h-9 lg:h-10"
              />
            </span>
          </Link>

          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="Account settings"
              className="h-auto gap-3 py-2"
              render={<Link href={`/dashboard/${role}/settings`} />}
            >
              <Avatar size="sm" className="size-8">
                <AvatarImage src={user?.image ?? undefined} alt={displayName} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="flex min-w-0 flex-1 flex-col leading-tight group-data-[collapsible=icon]:hidden">
                <span className="flex min-w-0 items-center gap-1.5">
                  <span className="truncate text-sm font-medium">
                    {displayName}
                  </span>
                  <span className="shrink-0 rounded-full bg-sidebar-primary/15 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-sidebar-primary uppercase">
                    {role}
                  </span>
                </span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarHeader>

        <SidebarContent className="gap-1">
          <SidebarGroup className="p-2">
            <SidebarMenu>
              {menuItemsByRole[role].map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border/70 p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Log out"
                onClick={handleSignOut}
                className="text-sidebar-foreground/70 hover:text-destructive"
              >
                <LogOutIcon />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  )
}

export default DashboardSidebar
