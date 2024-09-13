import React, { Fragment, useEffect, useState } from "react";
import { AppNavItem } from "./AppNavItem";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { setSidebarTheme, sideBarTheme } from "@/stores/theme";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import AppProjects from "@/components/App/AppNav/AppProjects";
import { NavLink } from "@/components/App/AppNav/AppNavItem";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import link from "next/link";
import { DoorClosed } from "lucide-react";
import { useRouter } from "next/router";
import { activeProject as _activeProject, loggedInUser } from "@/stores/app";
import { Separator } from "@/components/ui/separator";

function AppNav(props: { navCollapsed?: boolean }) {
  const user = useAtomValue(loggedInUser)
  const setUser = useSetAtom(loggedInUser)

  const [activeProject, setActiveProject] = useAtom(_activeProject)

  const [theme] = useAtom(sideBarTheme);
  const [, setSideTheme] = useAtom(setSidebarTheme);
  const router = useRouter()

  const navLinks = {
    upper: [
      {
        to: "/",
        icon: "i-tabler-home",
        title: "Home",
      },
      { to: "/content", icon: "i-tabler-pencil", title: "Content editor" },
      {
        to: "/keyword-research",
        icon: "i-tabler-search",
        title: "Keyword research",
      },
      { to: "/ideation", icon: "i-tabler-bulb", title: "Ideation" },
      { to: "/memories", icon: "i-tabler-brain", title: "Memories" },
      { to: "/tools", icon: "i-tabler-tools", title: "Tools" },
      { to: "/flow", icon: "i-tabler-article", title: "Post generation" },
      /* { to: "/chat", icon: "i-tabler-message", title: "Chat" }, */
    ],
    bottom: [
      { to: '/settings', icon: 'i-tabler-settings', title: 'Settings' }
    ]
  }
  const adminLinks = {
    upper: [
      { to: "/admin/users", icon: "i-tabler-users", title: "Users" },
      { to: "/admin/skills", icon: "i-tabler-tool", title: "Skills" },
    ],
    bottom: []
  }

  const [navItems, setNavItems] = useState<NavLink[]>([]);

  const [bottomNavItems, setBottomNavItems] = useState<NavLink[]>([]);

  useEffect(() => {
    if (user) {
      if (user.is_admin) {
        setNavItems(adminLinks.upper)
        setBottomNavItems(adminLinks.bottom)
      } else {
        setNavItems(navLinks.upper)
        setBottomNavItems(navLinks.bottom)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function logout(e: any) {
    e.preventDefault()
    localStorage.removeItem('rb_access_token')
    localStorage.removeItem('rb_refresh_token')
    setActiveProject(null)
    await router.push('/login')
    setUser(null)
  }

  return (
    <aside
      data-collapsed={props.navCollapsed}
      className={`${
        !props.navCollapsed
          ? "min-w-[312px] w-[312px]"
          : "min-w-[82px] w-[82px]"
      } top-0 left-0 h-screen transition-transform -translate-x-full sm:translate-x-0 z-40 border-r`}
    >
      <nav
        className={`${
          (theme as string) === "dark" ? "bg-gray-900" : "bg-white"
        } w-full h-full py-8 flex flex-col gap-1 ${
          props.navCollapsed ?? "items-center"
        }`}
      >
        <div className="font-bold text-2xl mb-3 text-white text-center h-8 w-8 bg-gray-700 rounded-lg mx-auto"></div>

        <div className="w-full px-4">
          <AppProjects navCollapsed={props.navCollapsed} />
        </div>

        <AppNavItem
          className="flex-1 w-full"
          isCollapsed={!!props.navCollapsed}
          links={navItems}
        />
        <div className="flex-1"></div>
        <AppNavItem
          className="flex-1 w-full justify-end"
          isCollapsed={!!props.navCollapsed}
          links={bottomNavItems}
        />
        {/* {!props.navCollapsed && (
          <div
            className={`${
              (theme as string) === "dark"
                ? "bg-gray-800 text-gray-100"
                : "bg-gray-100 text-dark-900"
            } px-5 py-4 h-40 text-sm rounded-lg`}
          >
            <p className="mb-2 font-semibold ">Used space</p>
            <p>Your team has used 80% of your available space. Need more?</p>
          </div>
        )} */}
        <div className="px-5 mb-4 w-full">
          <Separator className="" />
        </div>
        <div className={`text-text w-full px-5 flex items-center gap-2 ${props.navCollapsed ? 'flex-col' : ''}`}>
          {!props.navCollapsed
            ? <div className={`flex-1 flex flex-col gap-1`}>
                <p className="text-md font-medium dark:text-muted-foreground">{user?.first_name} {user?.last_name}</p>
                <p className="text-sm dark:text-muted-foreground/50">{user?.email}</p>
              </div>
            : <div className="flex items-center rounded-full bg-muted h-10 w-10 justify-center">
              <p className="text-md font-medium dark:text-muted-foreground">{user?.first_name.substring(0, 1)}{user?.last_name.substring(0, 1)}</p>
            </div>
          }

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon' className={`flex h-9 w-9 items-center justify-center dark:text-muted-foreground ${props.navCollapsed ? '' : 'mr-0'}`}>
                <i
                  className={`${
                    theme === "dark"
                      ? "i-tabler-sun text-muted-foreground hover:text-white"
                      : "i-tabler-moon text-gray-700 hover:text-muted"
                  } my-3 text-2xl transition-colors`}
                  onClick={(e) => setSideTheme(theme === "dark" ? "light" : "dark")}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side={props.navCollapsed ? "right" : "top"} className="flex items-center gap-4">
              <span className="ml-auto text-muted-foreground dark:text-white">
                Dark/Light Theme
              </span>
            </TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button size="icon" variant='ghost' className="h-9 w-9">
                <DoorClosed className="h-6 w-6 cursor-pointer dark:hover:text-white duration-250 transition-colors dark:text-muted-foreground" onClick={logout} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              <span className="ml-auto text-muted-foreground dark:text-white">
                Logout
              </span>
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>
    </aside>
  );
}


export default AppNav;
