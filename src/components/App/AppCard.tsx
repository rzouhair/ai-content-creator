import React from 'react'

function AppCard({children}: { children: any }) {
  return (
    <div className="w-full transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-[0px_1px_3px_#1018282A] transition-all">
      {children}
    </div>
  )
}

export default AppCard