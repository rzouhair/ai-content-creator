import { cn } from '@/lib/utils';
import React from 'react'

interface IdeationMethodCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
  title: string;
  selected: boolean
  description?: string;
}

function IdeationMethodCard(props: IdeationMethodCardProps) {
  return (
    <div className={cn(
        'w-[300px] flex flex-col text-center items-center justify-center py-8 px-4 border border-input rounded-sm cursor-pointer transition-colors',
        props.selected && 'border-secondary bg-secondary-900 hover:bg-secondary-800',
        !props.selected && 'hover:bg-accent'
      )} onClick={props.onClick}>
      <div className='bg-secondary border-muted text-black rounded-md px-2 py-2 w-fit h-fit mb-4'>
        <i className={`w-7 h-7 ${props.icon}`}></i>
      </div>
      <h4 className='text-xl font-semibold leading-none tracking-tight mb-4 text-text'>{ props.title }</h4>
      <p className='text-sm text-muted-foreground'>{ props.description }</p>
    </div>
  )
}

export default IdeationMethodCard