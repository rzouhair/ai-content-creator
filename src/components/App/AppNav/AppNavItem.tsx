"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useRouter } from "next/router"

export type NavLink = {
  title: string
  label?: string
  icon: LucideIcon | string
  variant?: "light" | "ghost"
  to: string
  onClick?: Function
}

export interface NavProps {
  isCollapsed: boolean
  links: NavLink[]
  className?: string
}

export function AppNavItem({ links, isCollapsed, className }: NavProps) {
  const router = useRouter()

  const isRouteActive = (link: NavLink) => (router.pathname === '/' && link.to === '/') || (router.pathname.includes(link.to) && link.to !== '/')

  return (
    <div
      data-collapsed={isCollapsed}
      className={`group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 ${className}`}
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.to}
                  onClick={(e) => link.onClick?.(e)}
                  className={cn(
                    buttonVariants({ variant: link.variant || 'ghost', size: "icon" }),
                    "h-9 w-9",
                    (!link.variant || link.variant === "light") &&
                      "dark:bg-transparent dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                    isRouteActive(link) && "bg-muted dark:bg-muted dark:text-white",
                  )}
                >
                  { typeof link.icon === 'string' ? <i className={`${link.icon} text-xl`}></i> : <link.icon className="h-4 w-4" /> }
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href={link.to}
              onClick={(e) => link.onClick?.(e)}
              className={cn(
                buttonVariants({ variant: link.variant || 'ghost', size: "sm" }),
                (!link.variant || link.variant === "light") &&
                  "dark:bg-transparent dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                isRouteActive(link) && "bg-muted dark:bg-muted dark:text-white",
                "justify-start"
              )}
            >
              { typeof link.icon === 'string' ? <i className={`${link.icon} mr-3 text-xl`}></i> : <link.icon className="h-4 w-4" /> }
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    (!link.variant || link.variant === "light") &&
                      "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}