import { Suggestion } from '@/lib/@types';
// @ts-ignore
import { groupBy, capitalize } from 'lodash-es'
import axios from '@/lib/axios';
import { Popover, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useAtom } from 'jotai';
import { activeProject as _activeProject } from '@/stores/projects'

function Idea(props: { 
  keyword: string;
  qualifier: string;
  country: string
}) {

  const [activeProject] = useAtom(_activeProject)
  const [loading, setLoading] = useState<boolean>(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const getQuerySuggestions = async() => {
    try {
      setLoading(true)
      const data = {
        query: props.qualifier.replace('%', props.keyword),
        country: props.country,
        with_styling: true,
      }
      const res = await axios.post('/keyword-research/suggest/', data)
      setSuggestions(Object.entries(res.data).map(([searchEngine, values]) => (values as string[]).map((v: string) => `${searchEngine}: ${v}`)).flat(1))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const copy = async(s: string) => {
    await navigator.clipboard.writeText(s)
  }

  const addSuggestion = async(s: string) => {
    try {
      const data = {
        parent_keyword: `Ideation process for "${props.qualifier.replace('%', props.keyword.length ? props.keyword : '_')}"`,
        search_query: s.replaceAll(/<\/?b>/g, ""),
        project: activeProject?._id,
      }
      await axios.post('/keyword-research/suggestions/', data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getQuerySuggestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const keywordsByEngine = groupBy(
    suggestions
      .map((suggestion: string) => suggestion.split(':'))
      .map(([searchEngine, keyword]: string[]) => ({
        searchEngine,
        keyword
      })),
    'searchEngine'
  )
  
  const engineLink = (engine: string, keyword: string) => {
    return {
      'google': `https://www.google.com/search?q=${keyword}&gl=us`,
      'bing': `https://www.bing.com/search?q=${keyword}&gl=us`,
      'ddg': `https://www.duckduckgo.com/?q=${keyword}&gl=us`,
    }[engine]
  }

  return (
    <div className='flex items-center justify-between relative w-full'>
      <div className="overflow-hidden rounded-lg shadow-lg p-4 w-full">
        <div className="flex flex-col gap-4">
          {
            loading
            ? <div className='p-5 flex items-center justify-center'>
              <i className='i-tabler-loader animate-spin' />
            </div>
            : <Tabs defaultValue="google">
              <TabsList className={`grid w-full grid-cols-${Object.values(keywordsByEngine).length}`}>
                {
                  Object.entries(keywordsByEngine).map(([engine]) => <TabsTrigger value={engine} key={engine}>{capitalize(engine)}</TabsTrigger>)
                }
              </TabsList>
              {
                Object.entries(keywordsByEngine).map(([engine, keywords]: any, i: number) => <TabsContent value={engine} key={engine}>
                  {
                    keywords.map(({ searchEngine, keyword: kw }: any, i: number) => <div className='flex items-center justify-between py-1' key={i}>
                      <p dangerouslySetInnerHTML={{ __html: kw }} />
                      <div className='gap-2'>
                        <i className='text-primary i-tabler-copy font-semibold text-xl cursor-pointer' onClick={() => copy(kw)}></i>
                        <i className='text-primary i-tabler-arrow-up-right font-semibold text-xl cursor-pointer' onClick={(e) => window.open(engineLink(searchEngine, kw.replaceAll(/<\/?b>/g, "")), '_blank')} />
                        <i className='text-primary i-tabler-plus font-semibold text-xl cursor-pointer' onClick={() => addSuggestion(kw)}></i>
                      </div>
                    </div>)
                  }
                </TabsContent>)
              }
            </Tabs>
          }
        </div>
      </div>
    </div>
  )
}

export default Idea