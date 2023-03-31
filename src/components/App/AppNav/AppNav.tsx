import React, { useState } from 'react'
import AppNavItem from './AppNavItem'

function AppNav(props: { navCollapsed?: boolean }) {

  const theme: "dark" | "light" = 'dark'
  const [navItems] = useState([
    { to: '/', icon: 'i-tabler-home', positionBasedOnSeparator: 'before', title: 'Home' },
    { to: '/home', icon: 'i-tabler-pencil', title: 'Content editor' },
    { to: '/keyword-research', icon: 'i-tabler-search', title: 'Keyword research' },
    { to: '/chat', icon: 'i-tabler-message', title: 'Chat' },
    /* { to: '/tasks', icon: 'i-tabler-checkup-list', title: 'Tasks' },
    { to: '/reporting', icon: 'i-tabler-chart-pie', title: 'Reporting' },
    { to: '/users', icon: 'i-tabler-users', title: 'Users' }, */
  ])

  const [bottomNavItems] = useState([
    { to: '/support', icon: 'i-tabler-lifebuoy', positionBasedOnSeparator: 'after', title: 'Support' },
    { to: '/settings', icon: 'i-tabler-settings', positionBasedOnSeparator: 'after', title: 'Settings' },
  ])


  return (
    <aside className={`${!props.navCollapsed ? 'min-w-[312px] w-[312px]' : 'min-w-[82px] w-[82px]'} top-0 left-0 h-screen transition-transform -translate-x-full sm:translate-x-0 z-40`}>
      <nav className={`${(theme as string) === 'dark' ? 'bg-gray-900' : 'bg-white'} w-full h-full px-4 py-8 flex flex-col gap-1`}>
        <p className='font-bold text-2xl mb-12 text-white text-center'>Logo</p>
        {
          navItems.map((item, index) => <AppNavItem key={index} collapsed={props.navCollapsed} color={theme} icon={item.icon} title={item.title} to={item.to} />)
        }
        <div className='flex-1'></div>
        {
          bottomNavItems.map((item, index) => <AppNavItem key={index} collapsed={props.navCollapsed} color={theme} icon={item.icon} title={item.title} to={item.to} />)
        }
        {
          !props.navCollapsed && <div className={`${(theme as string) === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-dark-900'} px-5 py-4 h-40 text-sm rounded-lg`}>
            <p className='mb-2 font-semibold '>Used space</p>
            <p>Your team has used 80% of your available space. Need more?</p>
          </div>
        }
      </nav>
    </aside>
  )
}

export default AppNav