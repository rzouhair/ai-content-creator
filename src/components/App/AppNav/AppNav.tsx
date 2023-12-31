import React, { Fragment, useState } from "react";
import { AppNavItem } from "./AppNavItem";
import { useAtom } from "jotai";
import { setSidebarTheme, sideBarTheme } from "@/stores/theme";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import AppProjects from "@/components/App/AppNav/AppProjects";
import { NavLink } from "@/components/App/AppNav/AppNavItem";

function AppNav(props: { navCollapsed?: boolean }) {
  const [theme] = useAtom(sideBarTheme);
  const [, setSideTheme] = useAtom(setSidebarTheme);

  const [navItems] = useState<NavLink[]>([
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
    { to: "/clustering", icon: "i-tabler-filters", title: "Keywords Clustering" },
    { to: "/chat", icon: "i-tabler-message", title: "Chat" },
    { to: "/video-extractor", icon: "i-tabler-brand-youtube", title: "Youtube extractor" },
    /* { to: '/tasks', icon: 'i-tabler-checkup-list', title: 'Tasks' },
    { to: '/reporting', icon: 'i-tabler-chart-pie', title: 'Reporting' },
    { to: '/users', icon: 'i-tabler-users', title: 'Users' }, */
  ]);

  const [bottomNavItems] = useState<NavLink[]>([
    {
      to: "/support",
      icon: "i-tabler-lifebuoy",
      title: "Support",
    },
    {
      to: "/settings",
      icon: "i-tabler-settings",
      title: "Settings",
    },
  ]);


  return (
    <aside
      className={`${
        !props.navCollapsed
          ? "min-w-[312px] w-[312px]"
          : "min-w-[82px] w-[82px]"
      } top-0 left-0 h-screen transition-transform -translate-x-full sm:translate-x-0 z-40`}
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
        <span className={`flex items-center justify-center`}>
          <i
            className={`${
              theme === "dark"
                ? "i-tabler-sun text-gray-100"
                : "i-tabler-moon text-gray-700"
            } my-3 text-2xl`}
            onClick={(e) => setSideTheme(theme === "dark" ? "light" : "dark")}
          />
        </span>
      </nav>
    </aside>
  );
}


export default AppNav;
