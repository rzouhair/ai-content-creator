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

interface ListBoxProps {
  options: { label: string; value: string; }[]
  label?: string
  value?: string
  onChange?: Function,
  disabled?: boolean,
}

export default function AppListbox(props: ListBoxProps) {
  const [selected, setSelected] = useState(props.value || props.options?.[0]?.value)
  const [selectedLabel, setSelectedLabel] = useState(props.options?.find((o) => o.value === selected)?.label)

  useEffect(() => {
    setSelected(props.value || '')
  }, [props])

  function onValueChange (value: string) {
    if (!value?.length)
      return

    setSelected(value)
    props.onChange?.(value)
    setSelectedLabel(props.options?.find((o) => o.value === value)?.label)
  }

  return (
    <div className="flex gap-2 w-full flex-col">
      { props.label && <label className="text-base font-semibold">{props.label}</label> }
      <Select {...props} onValueChange={onValueChange} defaultValue={selected} disabled={props.disabled}>
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