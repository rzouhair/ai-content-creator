import React, { useState } from 'react'

export default function AppCheckbox({ className, partiallyChecked, children, checked, onChange, id }: { className?: string; partiallyChecked?: boolean; children?: any; checked?: boolean; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; id?: string }) {

  const classesByState = {
    unchecked: 'border border-gray-300 bg-white',
    hovered: 'hover:border-indigo-600 hover:bg-indigo-100',
    checked: 'border-indigo-600 bg-indigo-100',
    disabled: 'pointer-events-none cursor-not-allowed opacity-50',
    focused: 'focus:border-indigo-300 focus:shadow-[0px_0px_0px_4px_#F2F4F7] !shadow-indigo-100',
    active: 'active:border-indigo-300 active:shadow-[0px_0px_0px_4px_#F2F4F7] !shadow-indigo-100',
  }

  return (
    <div className="flex items-center mr-4 mb-2">  
      <input type="checkbox" id={id} name="A3-confirmation" className="opacity-0 absolute pointer-events-none h-4 w-4" value={checked ? 'yes' : 'no'} onChange={(e) => {
        onChange?.(e)
      }} />  
        
      <label htmlFor={id} className="select-none flex items-center justify-start gap-2">
        <div className={`border-2 rounded-md w-6 h-6 flex flex-shrink-0 justify-center items-center transition-colors ${checked ? classesByState.checked : classesByState.unchecked} ${classesByState.focused} ${classesByState.hovered} ${classesByState.active}`}>  
          <i className={`${partiallyChecked ? 'i-tabler-minus' : 'i-tabler-check'} ${checked ? 'text-indigo-500' : 'hidden'}`}></i>
        </div> 
        { children }
      </label>  
    </div>  
  )
}
