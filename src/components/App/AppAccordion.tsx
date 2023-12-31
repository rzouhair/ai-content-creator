import { Disclosure } from '@headlessui/react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '../ui/button';

export default function AppAccordion(props: { items: { title: string | JSX.Element | JSX.Element[]; content: () => JSX.Element | JSX.Element[] }[]; className?: string }) {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`w-full ${props.className || ''}`}>
      <div className="mx-auto w-full rounded-2xl">
        {
          props.items.map((item, i) => <Collapsible
            key={i}
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2"
          >
            <div className="flex items-center justify-between space-x-4 pl-4 pr-2 bg-white dark:bg-night ring-1 ring-muted rounded-sm py-1">
              <h4 className="text-sm font-semibold">
                {item.title}
              </h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md border px-4 py-3 text-sm">
                { item.content() }
              </div>
            </CollapsibleContent>
          </Collapsible>)
        }
      </div>
    </div>
  )
}
