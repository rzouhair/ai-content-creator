import { Suggestion } from '@/lib/@types';
import axios from '@/lib/axios';
import { Popover, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react'
import AppButton from '../App/AppButton';

function Idea(props: { 
  keyword: string;
  qualifier: string;
}) {

  const [loading, setLoading] = useState<boolean>(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const getQuerySuggestions = async(open: boolean) => {
    if (!open) {
      try {
        setLoading(true)
        const data = {
          query: props.qualifier.replace('%', props.keyword),
          with_styling: true,
        }
        const res = await axios.post('/keyword-research/suggest/', data)
        setSuggestions(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  const copy = async(s: string) => {
    await navigator.clipboard.writeText(s)
  }

  const addSuggestion = async(s: string) => {
    try {
      const data = {
        parent_keyword: `Ideation process for "${props.qualifier.replace('%', props.keyword)}"`,
        search_query: s.replaceAll(/<\/?b>/g, ""),
      }
      await axios.post('/keyword-research/suggestions/', data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='flex items-center justify-between relative'>
      <p>{ props.qualifier.replace('%', props.keyword) }</p>
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button
              className={`${open ? '' : 'text-opacity-90'}`}
            >
              <AppButton size='sm' square={true} onClick={(e) => getQuerySuggestions(open)}>
                <i className='i-tabler-search text-white text-xl'></i>
              </AppButton>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="bg-white absolute left-1/2 z-10 mt-3 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl w-full">
                <div className="overflow-hidden rounded-lg shadow-lg p-4">
                  <h2 className='font-semibold text-lg text-black mb-4'>Google search suggestions</h2>
                  <div className="flex flex-col gap-4">
                    {
                      loading ?
                        <div className='p-5 flex items-center justify-center'>
                          <i className='i-tabler-loader animate-spin' />
                        </div> :
                        suggestions.map((s: string) => <div className='flex items-center justify-between' key={s}>
                          <p dangerouslySetInnerHTML={{ __html: s }} />
                          <div className='gap-2'>
                            <i className='text-indigo-800 i-tabler-copy font-semibold text-xl cursor-pointer' onClick={() => copy(s)}></i>
                            <i className='text-indigo-800 i-tabler-arrow-up-right font-semibold text-xl cursor-pointer' onClick={(e) => window.open(`https://www.google.com/search?q=${s.replaceAll(/<\/?b>/g, "")}&gl=us`, '_blank')} />
                            <i className='text-indigo-800 i-tabler-plus font-semibold text-xl cursor-pointer' onClick={() => addSuggestion(s)}></i>
                          </div>
                        </div>)
                    }
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default Idea