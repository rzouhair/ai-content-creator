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
    block,
    loading,
    children = 'Button content',
    background = 'indigo',
    border = 'transparent',
    square,
  }: {
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    prefixIcon?: string;
    prefixIconClass?: string;
    suffixIcon?: string;
    suffixIconClass?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    text?: string;
    block?: boolean
    loading?: boolean
    square?: boolean
    children?: any
    background?: string;
    border?: string
    disabled?: boolean
  }) {

  const sizes = {
    'sm': `gap-2.5 text-sm ${square ? 'p-0 !h-9 !w-9' : 'py-2 px-4'}`,
    'md': `gap-2.5 text-sm ${square ? 'p-0 !h-10 !w-10' : 'py-2.5 px-4'}`,
    'lg': `gap-2.5 text-base ${square ? 'p-0 !h-11 !w-11' : 'py-2.5 px-5'}`,
    'xl': `gap-2.5 text-base ${square ? 'p-0 !h-12 !w-12' : 'py-3 px-5'}`,
    '2xl': `gap-3.5 text-lg ${square ? 'p-0 !h-14 !w-14' : 'py-4 px-7'}`,
  }

  const [colors, setColors] = useState(`bg-${background}-600 hover:bg-${background}-700 active:bg-${background}-600 active:shadow-[0px_0px_0px_4px_#F2F4F7] !shadow-${background}-100 ${disabled && 'opacity-50 pointer-events-none cursor-not-allowed'}`)

  useEffect(() => {
    setColors(`bg-${background}-600 hover:bg-${background}-700 active:bg-${background}-600 active:shadow-[0px_0px_0px_4px_#F2F4F7] !shadow-${background}-100 ${(disabled || loading) && 'opacity-50 pointer-events-none cursor-not-allowed'}`)
  }, [background, disabled, loading])
  
  
  return (
    <button onClick={onClick} className={`flex items-center text-center justify-center transition-all duration-100 font-semibold rounded-lg border ${sizes[size]} ${block ? 'w-full' : ''} ${`text-${text || 'white'}`} ${colors} ${className} ${border ? `border-${border}` : 'border-transparent'} whitespace-nowrap`}>
      { prefixIcon && <i className={`text-lg ${prefixIcon} ${suffixIconClass}`}></i> }
      <span className='flex-1 flex items-center justify-center'>{ children }</span>
      { (suffixIcon && !loading) ? <i className={`text-lg ${suffixIcon} ${suffixIconClass}`}></i> : loading ? <i className={`text-lg i-tabler-loader animate-spin ${suffixIconClass}`}></i> : null }
    </button>
  )
}
