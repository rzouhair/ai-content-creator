import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

const LocalWrapper = (props: {
  className: string
  to?: string
  children: any
}) => {
  return typeof props.to === 'undefined' ? <div className={props.className}>{props.children}</div> : <Link className={props.className} href={props.to}>{ props.children }</Link>
}

function AppNavItem(props: {
  color: 'dark' | 'light'
  open?: boolean;
  to?: string
  icon: string
  title: string
  notificaitons?: number;
  collapsed?: boolean
}) {

  const router = useRouter()

  const themes = {
    dark: {
      bg: 'bg-gray-900 hover:bg-gray-700 active:bg-gray-900 active:shadow-[0px_0px_0px_4px_#667085] !shadow-gray-500',
      text: 'text-gray-100',
      icons: 'text-gray-100',
      notification: 'text-gray-900 bg-gray-100',
      active: '!bg-gray-700',
    },
    light: {
      bg: 'bg-white hover:bg-gray-50 active:bg-white active:shadow-[0px_0px_0px_4px_#F2F4F7] !shadow-gray-100',
      text: 'text-gray-700',
      icons: 'text-gray-500',
      notification: 'text-gray-900 bg-gray-100',
      active: '!bg-gray-100',
    },
  }

  return (
    <LocalWrapper to={props.to} className={`flex items-center mx-auto px-3 py-2 rounded-md ${props.collapsed ? 'w-12 h-12' : 'w-full h-10'} cursor-pointer transition-all ${themes[props.color || 'dark'].bg} ${router.pathname === props.to && themes[props.color].active}`}>
      {/*
        - Icon
        - Nav item
        - notifications placeholder
        - chevron
      */}
      <span className={`${!props.collapsed ? 'mr-4' : 'm-0'} flex items-center justify-center`}>
        <i className={`${props.icon} text-2xl text-gray-100 ${themes[props.color || 'dark'].icons}`}></i>
      </span>
      { !props.collapsed && <p className={`${themes[props.color || 'dark'].text} flex-1 mr-2 font-medium`}>{ props.title }</p> }
      { (!props.collapsed && !!props.notificaitons) && <span className={`rounded-2xl inline-flex items-center justify-center py-0.5 px-2 mr-1 text-xs ${themes[props.color || 'dark'].notification}`}>10</span> }
      {
        typeof props.open !== 'undefined' && !props.collapsed ? <span>
          <i className={`text-xl i-tabler-chevron-down text-gray-100 transition-transform ${themes[props.color || 'dark'].icons} ${props.open ? 'transform rotate-180' : ''}`}></i>
        </span> : null
      }
    </LocalWrapper>
  )
}

export default AppNavItem