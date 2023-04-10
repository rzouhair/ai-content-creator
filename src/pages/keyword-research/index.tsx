import AppButton from '@/components/App/AppButton'
import AppCard from '@/components/App/AppCard'
import AppInput from '@/components/App/AppInput'
import LayoutMain from '@/components/Layouts/LayoutMain'
import React, { useState, useCallback, useEffect } from 'react'
import axios from '@/lib/axios'
import AppCheckbox from '@/components/App/AppCheckbox'
import ReactMarkdown from 'react-markdown'
import { Suggestion } from '@/lib/@types'
import { useRouter } from 'next/router'
// @ts-ignore
import { groupBy } from 'lodash-es'
import AppAccordion from '@/components/App/AppAccordion'

function KeywordResearch() {

  const router = useRouter()

  const [keyword, setKeyword] = useState('')
  const [checked, setChecked] = useState(true)
  const [loading, setLoading] = useState(false)

  const [selectedSuggestions, setSelectedSuggestions] = useState<Suggestion[]>([])

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [groupedSuggestions, setGroupedSuggestions] = useState([])

  const changeHandler = async(e: any) => {
    setKeyword(e.target.value)
  }


  const selectSuggestion = async(i: number) => {

    try {
      const data = {
        parent_keyword: keyword,
        search_query: suggestions[i].replaceAll(/<\/?b>/g, ""),
      }
      const res = await axios.post('/keyword-research/suggestions/', data)

      const new_suggestions = [
        ...selectedSuggestions,
        res.data,
      ]
      setSelectedSuggestions(new_suggestions)

    } catch (error) {
      console.error(error)
    }
  }

  const analyzeSerps = async(suggestion_id: string, i: number) => {
    try {
      const res = await axios.post(`/keyword-research/analyze/${suggestion_id}/`)

      setSelectedSuggestions(selectedSuggestions.map((s: Suggestion) => s._id === suggestion_id ? res.data : s))

    } catch (error) {
      console.error(error)
    }
  }

  const getSearch = async(suggestion_id: string) => {
    try {
      router.push(`/keyword-research/suggestion/${suggestion_id}`)
      // const res = await axios.get(`/keyword-research/suggestions/${suggestion_id}/search`)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const res = await axios.get('/keyword-research/suggestions/')
        setSelectedSuggestions(res.data)

        const gSuggestions = groupBy((res.data as Suggestion[]), 'parent_keyword');
        setGroupedSuggestions(gSuggestions)

        console.log({ gSuggestions })
      } catch (error) {
        console.error(error)
      }
    }

    fetchSuggestions()
  }, [])

  useEffect(() => {
    const gSuggestions = groupBy((selectedSuggestions as Suggestion[]), 'parent_keyword');
    setGroupedSuggestions(gSuggestions)
  }, [selectedSuggestions])

  useEffect(() => {
    try {
      if (keyword) {
        const data = {
          query: keyword,
          with_styling: checked
        }
  
        setLoading(true)
        axios.post('/keyword-research/suggest/', data).then((res) => {
          setSuggestions(res.data || [])
        }).finally(() => {
          setLoading(false)
        })
      } else {
        setSuggestions([])
      }
    } catch (error) {
      
    }
  }, [keyword, checked])

  return (
    <div className='p-4 relative'>
      <div className='mb-8'>
        <h1 className='font-bold'>Keyword research</h1>
        <p>Discover dozens of relevant keyword clusters in a matter of minutes</p>
      </div>
      <div className='relative'>
        <AppCard className={'max-w-2xl mx-auto'}>
          <AppInput
            placeholder='e.g. Best SEO tool'
            hint='Only one keyword can be added'
            label="Keyword"
            prefix={<i className='i-tabler-key'></i>}
            value={keyword}
            debounced={true}
            debounceTime={750}
            onChange={changeHandler}
            suffix={loading ? <i className="i-tabler-loader"></i> : undefined}
          />
          <div className='border-t border-dashed border-gray-400 mt-6 pt-3'>
            <AppCheckbox checked={checked} id={'with-styling'} onChange={(e) => {
              setChecked(e.target.checked)
            }}>
              Get suggestions with styling
            </AppCheckbox>
            {/* <AppButton className='ml-auto mr-0' prefixIcon='i-tabler-search'>Search</AppButton> */}
          </div>

        </AppCard>
        <div className='absolute max-w-2xl bg-white z-10 -mt-3 mx-auto w-full left-0 right-0 align-middle shadow-[0px_1px_3px_#1018282A]'>
          {
            suggestions?.length > 0 && (
              <div className='mt-2 px-4 py-3 '>
                <ul className="rounded-md flex gap-2 flex-col">
                  {
                    suggestions?.length ?
                      suggestions.map((s, i) =>
                        <li
                          key={i}
                          className={"bg-gray-100 hover:bg-gray-200 transition-colors rounded-sm cursor-pointer px-2 py-3"} dangerouslySetInnerHTML={{
                            __html: s
                          }}
                          onClick={(e) => selectSuggestion(i)}
                        />
                      )
                    : null
                  }
                </ul>
                <AppButton prefixIcon="i-tabler-reload" className='mt-4' onClick={() => setKeyword("")}>
                  Reset
                </AppButton>
              </div>
            )
          }
        </div>
      </div>
      <div className='flex flex-col gap-4 my-4'>
        {
          Object.entries(groupedSuggestions).map(([parent_keyword, suggestion]: any) => {
            return <AppAccordion
              key={parent_keyword}
              items={[
                {
                  title: parent_keyword,
                  content: () => {
                    return <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {suggestion.map((s: Suggestion, i: number) => (
                        <AppCard key={s._id} className="!pt-2 pb-4 px-4">
                          <h1 className="text-base font-bold">{ s.search_query }</h1>
                          <div className='flex flex-wrap gap-2 items-center justify-end'>
                            {s.status !== 'ANALYZED' && <AppButton prefixIcon='i-tabler-analyze' size='sm' loading={s.status === 'IN_PROGRESS'} onClick={(e) => analyzeSerps(s._id, i)}>Analyze SERPs</AppButton>}
                            {s.status === 'ANALYZED' && <AppButton suffixIcon='i-tabler-arrow-right' onClick={(e) => getSearch(s._id)} background="purple" size='sm'>Check results</AppButton>}
                          </div>
                        </AppCard>
                      ))}
                    </div>
                  }
                }
              ]}
            />
            /* return <div key={parent_keyword} className="bg-slate-100 p-4 rounded-md">
              <h2 className='font-bold text-xl capitalize'>{ parent_keyword }</h2>
              <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                {
                  suggestion.map((s: Suggestion, i: number) => (
                    <AppCard key={s._id} className="!pt-2 pb-4 px-4">
                      <h1 className="text-base font-bold">{ s.search_query }</h1>
                      <div className='flex flex-wrap gap-2 items-center justify-end'>
                        {s.status !== 'ANALYZED' && <AppButton prefixIcon='i-tabler-analyze' size='sm' loading={s.status === 'IN_PROGRESS'} onClick={(e) => analyzeSerps(s._id, i)}>Analyze SERPs</AppButton>}
                        {s.status === 'ANALYZED' && <AppButton suffixIcon='i-tabler-arrow-right' onClick={(e) => getSearch(s._id)} background="purple" size='sm'>Check results</AppButton>}
                      </div>
                    </AppCard>
                  ))
                }
              </div>
            </div> */
          })
        }
      </div>
    </div>
  )
}

KeywordResearch.getLayout = (page: any) => {
  return <LayoutMain>
    {page}
  </LayoutMain>
}

export default KeywordResearch
