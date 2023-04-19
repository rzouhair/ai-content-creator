import React from 'react'

function AppTag(props: {
  className?: string;
  color: string;
  children: any
}) {

  const theme = `bg-${props.color}-200 bg-opacity-50 text-${props.color}-900`

  return (
    <div className={`${props.className} ${theme} rounded-full px-3 py-2 h-6 text-sm w-fit capitalize flex items-center justify-center`}>
      {props.children}
    </div>
  )
}

export default AppTag