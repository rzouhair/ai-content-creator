import React from 'react'
import AppNav from '../App/AppNav/AppNav'

function LayoutMain(props: any) {
  return (
    <div className='flex items-stretch justify-center max-h-screen'>
      <AppNav navCollapsed={props.navCollapsed} />
      <div className="flex-1">
        { props.children }
      </div>
    </div>
  )
}

export default LayoutMain