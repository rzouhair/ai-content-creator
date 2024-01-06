import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ListBoxProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange'> {
  options: { label: string; value: string; }[]
  label?: string
  value: string
  onChange?: Function
}

export default function AppListbox(props: ListBoxProps) {
  const [selected, setSelected] = useState(props.value || props.options?.[0].value)
  const [selectedLabel, setSelectedLabel] = useState(props.options?.find((o) => o.value === selected)?.label)

  useEffect(() => {
    props.onChange?.(selected)
    setSelectedLabel(props.options?.find((o) => o.value === selected)?.label)
  }, [selected, props])

  useEffect(() => {
    setSelected(props.value)
  }, [props])

  return (
    <div className="flex gap-2 w-full flex-col">
      { props.label && <label className="text-base font-semibold">{props.label}</label> }
      <Select onValueChange={setSelected} defaultValue={selected}>
        <SelectTrigger className='outline-none ring-transparent focus:ring-1 focus:ring-secondary focus:ring-offset-0'>
          <SelectValue className='outline-none ring-transparent focus:ring-1 focus:ring-secondary focus:ring-offset-0' placeholder={selectedLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{props.label}</SelectLabel>
            {props.options.map((option, optionId) => (
              <SelectItem key={optionId} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}