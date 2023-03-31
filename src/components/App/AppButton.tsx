import React, { useEffect, useState } from 'react'

export default function AppButton(
  {
    className,
    onClick,
    prefixIcon,
    suffixIconClass,
    suffixIcon,
    prefixIconClass,
    size = 'md',
    text,
    disabled,
    children = 'Button content',
    background = 'indigo',
  }: {
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    prefixIcon?: string;
    prefixIconClass?: string;
    suffixIcon?: string;
    suffixIconClass?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    text?: string;
    children?: any
    background?: string;
    disabled?: boolean
  }) {

  const sizes = {
    'sm': 'gap-2.5 text-sm py-2 px-4',
    'md': 'gap-2.5 text-sm py-2.5 px-4',
    'lg': 'gap-2.5 text-base py-2.5 px-5',
    'xl': 'gap-2.5 text-base py-3 px-5',
    '2xl': 'gap-3.5 text-lg py-4 px-7',
  }

  const [colors, setColors] = useState(`bg-${background}-600 hover:bg-${background}-700 active:bg-${background}-600 active:shadow-[0px_0px_0px_4px_#F2F4F7] !shadow-${background}-100 ${disabled && 'opacity-50 pointer-events-none cursor-not-allowed'}`)

  useEffect(() => {
    setColors(`bg-${background}-600 hover:bg-${background}-700 active:bg-${background}-600 active:shadow-[0px_0px_0px_4px_#F2F4F7] !shadow-${background}-100 ${disabled && 'opacity-50 pointer-events-none cursor-not-allowed'}`)
  }, [background, disabled])
  
  
  return (
    <button onClick={onClick} className={`flex items-center text-center justify-center transition-all duration-100 font-semibold rounded-lg ${sizes[size]} ${`text-${text || 'white'}`} ${colors} ${className} whitespace-nowrap`}>
      { prefixIcon && <i className={`text-lg ${prefixIcon} ${suffixIconClass}`}></i> }
      <span className='flex-1'>{ children }</span>
      { suffixIcon && <i className={`text-lg ${prefixIcon} ${prefixIconClass}`}></i> }
    </button>
  )
}
