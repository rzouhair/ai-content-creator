import { Disclosure } from '@headlessui/react'

export default function AppAccordion(props: { items: { title: string; content: () => JSX.Element | JSX.Element[] }[]; className?: string }) {

  return (
    <div className={`w-full ${props.className || ''}`}>
      <div className="mx-auto w-full rounded-2xl bg-white">
        {
          props.items.map((item, i) => <Disclosure key={i} as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-indigo-100 px-4 py-2 h-10 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 transition-all">
                  <span>{ item.title }</span>
                  <i
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-indigo-500 i-tabler-chevron-up`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  { item.content() }
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>)
        }
      </div>
    </div>
  )
}
