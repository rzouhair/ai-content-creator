import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'
import AppInput from '../AppInput'
import NewProject from '@/components/Modals/NewProject'
import { getProjects } from '@/api/projects'
import { setProjects as _setProjects, projects as _projects, activeProject as _activeProject, setActiveProject } from '@/stores/projects'
import { useAtom } from 'jotai'
import { Project } from '@/lib/@types'

function AppProjects(props: any) {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState<boolean>(false)

  const [projects] = useAtom(_projects)
  const [activeProject] = useAtom(_activeProject)
  const [, setProjects] = useAtom(_setProjects)
  const [, setProject] = useAtom(setActiveProject)

  useEffect(() => {
    async function getPrj() {
      try {
        const res = await getProjects()

        if (res)
          setProjects(res)
      } catch (error) {
        
      }
    }

    getPrj()
  }, [])

  return (
    <div className='w-full'>
      <Menu as="div" className="relative inline-block text-left w-full">
        <div>
          <Menu.Button
            className={`group mb-2 flex items-center truncate w-full px-4 py-2 rounded-lg selectionRing hover:ring-gray-300 hover:bg-gray-100 bg-gray-50 ring-1 ring-gray-200 dark:bg-muted dark:hover:bg-muted/70 transition-100 dark:text-white dark:ring-muted-foreground/30 ${props.navCollapsed ? 'justify-center' : 'justify-between'}`}
            aria-label="Select a project"
          >
            <span className={`${props.navCollapsed ? 'hidden' : 'block'} items-start truncate`}>
              <span className="uppercase block text-left mt-1 text-xs font-normal text-gray-500">
                Projects
              </span>
              <span className="block text-left truncate font-semibold">
                {activeProject?.name || '-'}
              </span>
            </span>
            <span className={`${props.navCollapsed ? 'py-2' : 'ml-3 -mr-1'}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                ></path>
              </svg>
            </span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-full z-10 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none left-0 min-w-[282px]">
            <div className="px-4 py-3">
              <AppInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search project"
              />
            </div>
            <div className="px-1 py-1 ">
              {
                projects.map((p: Project) => (<Menu.Item key={p._id}>
                {({ active }) => (
                  <button
                    className={`text-left w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm ${activeProject?._id === p._id ? 'bg-gray-100' : ''}`}
                    onClick={(e) => setProject(p)}
                  >
                    {p.name}
                  </button>
                )}
              </Menu.Item>))
              }
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link className="font-bold text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 truncate" href={'/content'}>
                    <span className="flex justify-between">
                      <span>See all projects</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    id="newProject"
                    className="text-left w-full text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-4 py-2"
                    onClick={() => setOpen(true)}
                  >
                    + New project
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <NewProject open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default AppProjects