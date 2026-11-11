"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOutIcon } from "lucide-react"
import NavLinks from "@/app/components/shared/NavLinks"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { signOut, useSession } from "@/lib/auth-client"

const getStartedClassName =
  "border-transparent bg-[#5b3bf5] text-white shadow-[0_0_24px_rgba(91,59,245,0.28)] hover:bg-[#6a4dff] focus-visible:ring-[#5b3bf5]/50"

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U"

type NavigationProps = {
  mobile?: boolean
  onNavigate?: () => void
}

function UserInfoSkeleton({ mobile }: { mobile: boolean }) {
  return (
    <div
      aria-hidden
      className={cn("flex items-center gap-2", mobile && "w-full")}
    >
      <div
        className={cn(
          "flex min-w-0 items-center gap-2.5 rounded-xl border border-white/10 bg-white/5",
          mobile ? "flex-1 p-3" : "max-w-48 py-1.5 pr-3 pl-1.5 lg:max-w-64"
        )}
      >
        <Skeleton
          className={cn(
            "shrink-0 rounded-full bg-white/10",
            mobile ? "size-10" : "size-8"
          )}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Skeleton className="h-3.5 w-20 bg-white/10" />
          <Skeleton className="h-3 w-28 max-w-full bg-white/10" />
        </div>
      </div>

      <Skeleton
        className={cn(
          "shrink-0 rounded-xl bg-white/10",
          mobile ? "size-11" : "size-10"
        )}
      />
    </div>
  )
}

function Navigation({ mobile = false, onNavigate }: NavigationProps) {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { data: session, isPending } = useSession()
  const user = session?.user

  const handleSignOut = async () => {
    setIsSigningOut(true)

    try {
      const { error } = await signOut()

      if (error) {
        toast.add({
          title: "Couldn't sign you out",
          description:
            error.message ?? "Something went wrong. Please try again.",
          type: "error",
          priority: "high",
        })
        return
      }

      toast.add({
        title: "Signed out",
        description: "You've been signed out successfully.",
        type: "success",
      })

      onNavigate?.()
      router.push("/")
      router.refresh()
    } catch {
      toast.add({
        title: "Couldn't sign you out",
        description: "Something went wrong. Please try again.",
        type: "error",
        priority: "high",
      })
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <>
      <NavLinks mobile={mobile} onNavigate={onNavigate} />

      <Separator
        orientation={mobile ? "horizontal" : "vertical"}
        className={cn(
          "bg-white/10",
          mobile ? "my-3" : "mx-2 data-vertical:h-6 data-vertical:self-center"
        )}
      />

      <div
        className={cn(
          "flex items-center gap-1",
          mobile && "flex-col items-stretch gap-2"
        )}
      >
        {isPending ? (
          <UserInfoSkeleton mobile={mobile} />
        ) : user ? (
          <div className={cn("flex items-center gap-2", mobile && "w-full")}>
            <div
              className={cn(
                "flex min-w-0 items-center gap-2.5 rounded-xl border border-white/10 bg-white/5",
                mobile
                  ? "flex-1 p-3"
                  : "max-w-48 py-1.5 pr-3 pl-1.5 lg:max-w-64"
              )}
            >
              <Avatar
                size={mobile ? "lg" : "default"}
                className="border border-white/10"
              >
                <AvatarImage src={user.image ?? undefined} alt={user.name} />
                <AvatarFallback className="bg-[#5b3bf5]/20 text-xs font-semibold text-[#b9adff]">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p
                  title={user.name}
                  className="truncate text-sm font-semibold text-white"
                >
                  {user.name}
                </p>
                <p
                  title={user.email}
                  className="truncate text-xs text-neutral-400"
                >
                  {user.email}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              disabled={isSigningOut}
              aria-label="Sign out"
              title="Sign out"
              className={cn(
                "shrink-0 rounded-xl border border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white focus-visible:ring-white/20",
                mobile ? "size-11" : "size-10"
              )}
            >
              {isSigningOut ? (
                <Spinner className="size-4" />
              ) : (
                <LogOutIcon className="size-4" />
              )}
            </Button>
          </div>
        ) : (
          <>
            <Link
              href="/sign-in"
              onClick={onNavigate}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-10 rounded-lg px-3 text-sm font-medium text-[#9d8cff] hover:bg-white/5 hover:text-[#b9adff]",
                mobile && "h-11 w-full justify-center text-base"
              )}
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              onClick={onNavigate}
              className={cn(
                buttonVariants(),
                getStartedClassName,
                "h-10 rounded-lg px-5 text-sm font-semibold",
                mobile && "h-11 w-full justify-center text-base"
              )}
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </>
  )
}

export default Navigation
