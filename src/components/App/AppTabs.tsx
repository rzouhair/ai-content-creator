import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface Tabs {
  [key: string]: (() => JSX.Element | JSX.Element[])
}

export default function AppTabs({ tabs }: { tabs: Tabs }) {

  return (
    <div className="w-full">
      <Tabs defaultValue={Object.keys(tabs)?.[0]}>
        <TabsList className="flex space-x-1 overflow-x-auto scrollbar-none rounded-xl">
          {Object.keys(tabs).map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className='w-full rounded-lg text-sm font-medium leading-5 transition-colors'
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-2">
          {Object.entries(tabs).map(([val, children], idx) => (
            <TabsContent
              key={idx}
              value={val}
            >
              {children()}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}