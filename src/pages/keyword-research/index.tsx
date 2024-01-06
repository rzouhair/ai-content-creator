import { Button } from '@/components/ui/button';
import AppCard from '@/components/App/AppCard'
import AppInput from '@/components/App/AppInput'
import LayoutMain from '@/components/Layouts/LayoutMain'
import React, { useState, useCallback, useEffect } from 'react'
import axios from '@/lib/axios'
import AppCheckbox from '@/components/App/AppCheckbox'
import ReactMarkdown from 'react-markdown'
import { Project, Suggestion } from '@/lib/@types'
import { useRouter } from 'next/router'
// @ts-ignore
import { groupBy } from 'lodash-es'
import { useAtom } from 'jotai'
import { activeProject } from '@/stores/projects'
import { PaginationInfo } from "@/lib/@types"
import AppTag from '@/components/App/AppTag'
import AppTooltip from '@/components/App/AppTooltip'
import { deleteSuggestion, getSuggestions } from '@/api/suggestions'
import AppTabs from '@/components/App/AppTabs'
import AppListbox from '@/components/App/AppListbox'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/App/AppDataTable/DataTable';

function KeywordResearch() {

  const router = useRouter()

  const [keyword, setKeyword] = useState('')
  const [checked, setChecked] = useState(true)
  const [loading, setLoading] = useState(false)

  const [project] = useAtom<Project | null>(activeProject)

  const [selectedSuggestions, setSelectedSuggestions] = useState<Suggestion[]>([])

  const [country, setCountry] = useState<string>('us')
  const [googleSuggestions, setGoogleSuggestions] = useState<string[]>([])
  const [bingSuggestions, setBingSuggestions] = useState<string[]>([])
  const [ddgSuggestions, setDdgSuggestions] = useState<string[]>([])
  const [groupedSuggestions, setGroupedSuggestions] = useState([])
  const [pagination, setPagination] = React.useState<PaginationInfo>({
    itemCount: 0,
    pageSize: 10,
    page: 1,
    pageCount: 1,
  })

  function onUpdatePage(page: number) {
    setPagination({
      ...pagination,
      page,
    } as PaginationInfo)

    console.log("Page changed here: " + page)
  }
  function onUpdatePageSize(pageSize: number) {
    setPagination({
      ...pagination,
      pageSize,
      pageCount: 1
    } as PaginationInfo)
    console.log("Page size changed here: " + pageSize)
  }

  const changeHandler = async(e: any) => {
    setKeyword(e.target.value)
  }

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

  const selectSuggestion = async(source: string[], i: number) => {

    try {
      if (!project?._id)
        return
      const data = {
        parent_keyword: keyword,
        search_query: source[i].replaceAll(/<\/?b>/g, ""),
        project: project?._id
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

  const analyzeSerps = async(suggestion_id: string) => {
    try {
      const res = await axios.post(`/keyword-research/analyze/${suggestion_id}/`)

      const suggestionsData = await getSuggestions()

      console.log(suggestionsData)

      if (suggestionsData)
        setSelectedSuggestions(suggestionsData)

    } catch (error) {
      console.error(error)
    }
  }

  const delSuggestion = async(suggestion_id: string) => {
    try {
      await deleteSuggestion(suggestion_id)
      await fetchSuggestions()
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
    fetchSuggestions()
  }, [])

  useEffect(() => {
    try {
      if (keyword) {
        const data = {
          query: keyword,
          country,
          with_styling: checked
        }
  
        setLoading(true)
        axios.post('/keyword-research/suggest/', data).then((res) => {
          setGoogleSuggestions(keyword ? [
            keyword,
            ...res.data.google,
          ] : [])
          setBingSuggestions(keyword ? [
            keyword,
            ...res.data.bing,
          ] : [])
          setDdgSuggestions(keyword ? [
            keyword,
            ...res.data.ddg,
          ] : [])
        }).finally(() => {
          setLoading(false)
        })
      } else {
        setGoogleSuggestions([])
        setBingSuggestions([])
      }
    } catch (error) {
      
    }
  }, [keyword, checked, country])


  const columns = React.useMemo<ColumnDef<any>[]>(() => [
    {
      header: "Query",
      accessorKey: 'search_query',
    },
    {
      header: "Search keyword",
      accessorKey: 'parent_keyword',
    },
    {
      header: "Status",
      accessorKey: 'status',
      cell: ({ row }) => {
        const value: string = row.original.status || ''
        return <AppTag color={
          value === 'ANALYZED' ? 'green'
          : value === 'IN_PROGRESS' ? 'yellow'
          : value === 'ERROR' ? 'red'
          : 'blue' 
        }>{ value.toLowerCase() }</AppTag>
      }
    },
    {
      header: "Actions",
      id: 'expander',
      cell: ({ row }) => {
        const sgs: Suggestion = row.original || {}
        return <div className='flex items-center gap-3 flex-wrap justify-start'>
          <div className='flex flex-wrap gap-2 items-center justify-end'>
            <AppTooltip content={
              <p>{ sgs.status === 'ANALYZED' ? 'Check results' : 'Analyze SERPs' }</p>
            }>
              <div>
                {
                  sgs.status !== 'ANALYZED' &&
                    <Button
                      disabled={sgs.status === 'IN_PROGRESS'}
                      size='icon'
                      /* background={sgs.status === 'IN_PROGRESS' ? 'yellow' : 'orange'} */
                      onClick={(e) => analyzeSerps(sgs._id)}
                    >
                      <i className={`${sgs.status === 'IN_PROGRESS' ? 'i-tabler-loader animate-spin' : 'i-tabler-analyze'} text-white text-xl`}></i>
                    </Button>
                }
                {
                  sgs.status === 'ANALYZED' &&
                    <Button
                      onClick={(e) => getSearch(sgs._id)}
                      size='icon'
                    >
                      <i className='i-tabler-device-analytics text-white text-xl'></i>
                    </Button>
                }
              </div>
            </AppTooltip>

            {
              sgs.status !== 'IN_PROGRESS' && <AppTooltip content={
                <p>Delete suggestion</p>
              }>
                <Button
                  size='icon'
                  variant="destructive"
                  onClick={(e) => delSuggestion(sgs._id)}
                >
                  <i className={`i-tabler-trash text-white text-xl`}></i>
                </Button>
              </AppTooltip>
            }
          </div>
        </div>
      }
    },
  ], [])

  const tabs = {
    'Google': () => (
      <div>
        {
          googleSuggestions?.length > 0 && (
            <div className='mt-2 py-3 '>
              <ul className="rounded-md flex gap-2 flex-col">
                {
                  googleSuggestions?.length ?
                    googleSuggestions.map((s, i) =>
                      <li
                        key={i}
                        className={"bg-gray-100 hover:bg-gray-200 transition-colors rounded-sm cursor-pointer px-2 py-3"} dangerouslySetInnerHTML={{
                          __html: s
                        }}
                        onClick={(e) => selectSuggestion(googleSuggestions, i)}
                      />
                    )
                  : null
                }
              </ul>
              <Button prefixIcon="i-tabler-reload" className='mt-4' onClick={() => setKeyword("")}>
                Reset
              </Button>
            </div>
          )
        }
      </div>
    ),
    "Bing": () => (
      <div>
        {
          bingSuggestions?.length > 0 && (
            <div className='mt-2 py-3 '>
              <ul className="rounded-md flex gap-2 flex-col">
                {
                  bingSuggestions?.length ?
                    bingSuggestions.map((s, i) =>
                      <li
                        key={i}
                        className={"bg-gray-100 hover:bg-gray-200 transition-colors rounded-sm cursor-pointer px-2 py-3"} dangerouslySetInnerHTML={{
                          __html: s
                        }}
                        onClick={(e) => selectSuggestion(bingSuggestions, i)}
                      />
                    )
                  : null
                }
              </ul>
              <Button prefixIcon="i-tabler-reload" className='mt-4' onClick={() => setKeyword("")}>
                Reset
              </Button>
            </div>
          )
        }
      </div>
    ),
    "DDG": () => (
      <div>
        {
          ddgSuggestions?.length > 0 && (
            <div className='mt-2 py-3 '>
              <ul className="rounded-md flex gap-2 flex-col">
                {
                  ddgSuggestions?.length ?
                    ddgSuggestions.map((s, i) =>
                      <li
                        key={i}
                        className={"bg-gray-100 hover:bg-gray-200 transition-colors rounded-sm cursor-pointer px-2 py-3"} dangerouslySetInnerHTML={{
                          __html: s
                        }}
                        onClick={(e) => selectSuggestion(ddgSuggestions, i)}
                      />
                    )
                  : null
                }
              </ul>
              <Button prefixIcon="i-tabler-reload" className='mt-4' onClick={() => setKeyword("")}>
                Reset
              </Button>
            </div>
          )
        }
      </div>
    ),
  }

  return (
    <div className='p-4 relative bg-background min-h-screen'>
      <div className='relative'>
        <Card className={'max-w-2xl mx-auto z-20 relative overflow-visible'}>
          <CardContent className='pt-6'>
            <AppInput
              placeholder='e.g. Best SEO tool'
              hint='Acts as a search engine input'
              label="Keyword"
              prefix={<i className='i-tabler-key'></i>}
              value={keyword}
              debounced={true}
              debounceTime={750}
              onChange={changeHandler}
              suffix={loading ? <i className="i-tabler-loader"></i> : undefined}
            />

          <div className={'bg-gray-50 dark:bg-muted-foreground/10 ring-1 ring-muted rounded-md p-4 my-4 relative z-20'}>
            <AppListbox
              value={country}
              label='Language'
              options={[
                { label: 'United States', value: 'us' },
                { label: 'Morocco', value: 'ma' },
                { label: 'France', value: 'fr' },
                { label: 'Spain', value: 'es' },
              ]}
              onChange={(selected: string) => setCountry(selected)}
            />
          </div>
            <div className='border-t border-dashed border-gray-400 my-6 pt-3'>
              <AppCheckbox checked={checked} id={'with-styling'} onChange={(e) => {
                setChecked(e)
              }}>
                Get suggestions with styling
              </AppCheckbox>
              {/* <Button className='ml-auto mr-0' prefixIcon='i-tabler-search'>Search</Button> */}
            </div>
          </CardContent>

        </Card>
        {
          keyword && <div className='absolute max-w-2xl bg-white z-30 -mt-3 px-4 mx-auto w-full left-0 right-0 align-middle shadow-[0px_1px_3px_#1018282A]'>
            <AppTabs tabs={tabs} />
          </div>
        }
      </div>
      <div className='flex flex-col gap-4 my-4'>
        <DataTable
          pagination={pagination}
          columns={columns}
          data={selectedSuggestions}
          onUpdatePage={onUpdatePage}
          onUpdatePageSize={onUpdatePageSize}
          tableTitle={{
            title: 'Suggestions',
            subtitle: 'Analyze google search suggestions to get related questions and PPA'
          }}
        />
      </div>
    </div>
  )
}

KeywordResearch.getLayout = (page: any) => {
  return <LayoutMain
    title="Keyword research"
    description="Discover dozens of relevant keyword clusters in a matter of minutes"
  >
    {page}
  </LayoutMain>
}

export default KeywordResearch
