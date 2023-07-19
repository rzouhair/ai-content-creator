import { useState } from 'react'
import { Tab } from '@headlessui/react'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface Tabs {
  [key: string]: (() => JSX.Element | JSX.Element[])
}

export default function AppTabs({ tabs }: { tabs: Tabs }) {

  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-transparent p-1">
          {Object.keys(tabs).map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 transition-colors',
                  selected
                    ? 'text-indigo-500 bg-indigo-100'
                    : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50'
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(tabs).map((children, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-transparent p-3 !outline-none',
                
              )}
            >
              {children()}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}