import React, { useEffect, useState } from 'react'
import { Document, Search, Suggestion } from "@/lib/@types";
import { useAtom } from 'jotai';
import { sideBarTheme } from '@/stores/theme';
import { Button } from '@/components/ui/button';
import { getSuggestionSearch, getSuggestions } from '@/api/suggestions';
import { updateDocument } from '@/api/documents';
import AppTabs from '../App/AppTabs';
import SearchStructure from './Search/SearchStructure';
import Variables from './ProgrammaticSeo/Variables';

function ContentStructure({ document }: { document: Document | null }) {

  const [theme] = useAtom(sideBarTheme)
  const [isChoosingSuggestion, setIsChoosingSuggestion] = useState<boolean>(false)

  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [search, setSearch] = useState<Search | null>(null)

  const [loading, setLoading] = useState(false)

  const startChoosingDocument = async() => {
    try {
      const suggestionsRes = await getSuggestions()

      if (suggestionsRes) {
        setSuggestions(suggestionsRes)
        setIsChoosingSuggestion(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function selectSuggestion(suggestion: Suggestion) {
    try {
      if (document) {
        await updateDocument(document?._id, {
          ...document,
          suggestion: suggestion._id,
        })

        await getSearch(suggestion)
        setIsChoosingSuggestion(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function getSearch(suggestion: Suggestion) {
    try {
      if (document) {
        const searchRes = await getSuggestionSearch(suggestion._id)
        if (searchRes) {
          setSearch(searchRes)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (document?.suggestion) {
      getSearch(document?.suggestion)
    }
  }, [document])

  const tabs = {
    Structure: () => (
      <div>
        <SearchStructure search={search} />
      </div>
    ),
    "Questions": () => (
      <div>
      </div>
    ),
    "Serps": () => (
      <div>
      </div>
    ),
    "Outlines": () => (
      <div>
      </div>
    ),
    "Variables": () => (
      <div>
        <Variables
          document={document}
        />
      </div>
    )
  }


  return (
    <div className={`w-full max-w-lg h-screen transition-colors ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800' }`}>
      <div className="px-4 h-[42px] flex items-center border-b border-gray-200">
        <h2 className="font-semibold p-1 text-indigo-600">Content structure</h2>
      </div>
      {(!document?.suggestion && !isChoosingSuggestion) && <div className='px-4'>
        <p className='font-bold my-4'>No suggestions is linked to this document</p>  
        <Button block={true} onClick={startChoosingDocument}>Choose</Button>
      </div>}
      {(!document?.suggestion && isChoosingSuggestion) && <div className='px-4'>
        <h2 className='font-bold py-4 text-center'>Suggestions list<br />(keyword - parent keyword)</h2>
        <ul>
          {suggestions.map((suggestion: Suggestion) => {
            return <li key={suggestion._id} className='flex items-center justify-between'>
              <p className='truncate' dangerouslySetInnerHTML={{ __html: `${suggestion.search_query} - ${suggestion.parent_keyword}` }}></p>
              <Button onClick={() => selectSuggestion(suggestion)} border="transparent" background='white' text='indigo-500' size='sm'>Select</Button>
            </li>
          })}
        </ul>
      </div>}
      {
        document?.suggestion && <div className='px-2'>
          <AppTabs tabs={tabs} />
        </div>
      }
    </div>
  )
}

export default ContentStructure