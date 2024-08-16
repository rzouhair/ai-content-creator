import { Disclosure } from '@headlessui/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '../ui/button';

export default function AppAccordion(props: {
  items: {
    title: string | JSX.Element | JSX.Element[];
    content: () => JSX.Element | JSX.Element[]
  }[];
  className?: string
}) {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`w-full ${props.className || ''}`}>
      <div className="mx-auto w-full rounded-2xl">
        <Accordion type="single" collapsible className="w-full">
          {
            props.items?.map((item, i) => <AccordionItem key={i} value={item.title.toString()}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                {item.content()}
              </AccordionContent>
            </AccordionItem>)
          }
        </Accordion>
      </div>
    </div>
  )
}
