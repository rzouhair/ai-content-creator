import { Button } from '@/components/ui/button';
import React, { useState, useCallback, useEffect } from 'react'
import axios from '@/lib/axios'
import { Project, Suggestion } from '@/lib/@types'
import { useRouter } from 'next/router'
// @ts-ignore
import { groupBy } from 'lodash-es'
import { useAtom } from 'jotai'
import { activeProject } from '@/stores/app'
import { PaginationInfo } from "@/lib/@types"
import AppTag from '@/components/App/AppTag'
import AppTooltip from '@/components/App/AppTooltip'
import { deleteSuggestion, getSuggestions } from '@/api/suggestions'

import { ColumnDef, SortingState } from '@tanstack/react-table';
import { DataTable } from '@/components/App/AppDataTable/DataTable';
import { getKeywordsListSuggestions } from '@/api/keywords';
import { ArrowUpDown } from 'lucide-react';
import KeywordsClusteringModal from '@/components/Modals/KeywordsClusteringModal';

export default function KeywordList() {

  const router = useRouter();
  const { listId: id } = router.query;

  const [keyword, setKeyword] = useState('')
  const [checked, setChecked] = useState(true)
  const [loading, setLoading] = useState(false)

  const [project] = useAtom<Project | null>(activeProject)

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'modifier', desc: true },
    { id: 'query', desc: false },
  ])

  const [selectedSuggestions, setSelectedSuggestions] = useState<Suggestion[]>([])

  const [country, setCountry] = useState<string>('us')
  const [googleSuggestions, setGoogleSuggestions] = useState<string[]>([])
  const [bingSuggestions, setBingSuggestions] = useState<string[]>([])
  const [ddgSuggestions, setDdgSuggestions] = useState<string[]>([])
  const [groupedSuggestions, setGroupedSuggestions] = useState([])
  
  const [sortBy, setSortBy] = useState('metadata.modifier')
  const [pagination, setPagination] = React.useState<PaginationInfo>({
    itemCount: 0,
    pageSize: 20,
    page: 1,
    pageCount: 1,
  })

  function onUpdatePage(page: number) {
    setPagination((prev: PaginationInfo) => {
      fetchSuggestions(page, prev.pageSize)
      return {
        ...prev,
        page,
      } as PaginationInfo
    })

  }
  function onUpdatePageSize(pageSize: number) {
    setPagination((prev) => {
      fetchSuggestions(prev.page, pageSize)
      return {
        ...prev,
        pageSize,
      } as PaginationInfo
    })
    fetchSuggestions()
  }

  const changeHandler = async(e: any) => {
    setKeyword(e.target.value)
  }

  async function fetchSuggestions(page = pagination.page, pageSize = pagination.pageSize) {
    try {
      if (!id)
        return
      setLoading(true)
      const res = await getKeywordsListSuggestions(id.toString(), {
        page: page,
        page_size: pageSize,
        sort_by: sortBy
      })
      if(!res?.data)
        return

      setPagination({
        ...pagination,
        page: res.page,
        pageSize: res.page_size,
        pageCount: res.page_count,
        itemCount: res.items_count,
      })
      setSelectedSuggestions(res.data)

      const gSuggestions = groupBy((res.data as Suggestion[]), 'parent_keyword');
      setGroupedSuggestions(gSuggestions)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
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
      await axios.post(`/keyword-research/analyze/${suggestion_id}/`)
      await fetchSuggestions()
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

  /* useEffect(() => {
    fetchSuggestions()
  }, [sortBy]) */

  function changeSorting() {
    if (sortBy.startsWith('-')) {
      setSortBy(sortBy.replace('-', ''))
    } else {
      setSortBy('-' + sortBy)
    }
    fetchSuggestions()
  }

  const columns = [
    {
      header: "Query",
      accessorKey: 'search_query',
    },
    {
      accessorKey: 'metadata.modifier',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => changeSorting()}
          >
            Modifier
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const value: string = row.original.metadata.modifier || ''
        return <AppTag color={'green'}>{ value.toLowerCase() }</AppTag>
      }
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
          <div className='flex flex-wrap gap-4 items-center justify-center'>
            <AppTooltip content={
              <p>{ sgs.status === 'ANALYZED' ? 'Check results' : 'Analyze SERPs' }</p>
            }>
              {
                sgs.status !== 'ANALYZED' ?
                  <i onClick={(e) => analyzeSerps(sgs._id)} className={`${sgs.status === 'IN_PROGRESS' ? 'i-tabler-loader animate-spin pointer-events-none opacity-30' : 'i-tabler-analyze'} cursor-pointer text-primary w-4 h-4 text-xl`}></i>
                  : <i onClick={(e) => getSearch(sgs._id)} className='i-tabler-device-analytics text-secondary-100 text-xl'></i>
              }
            </AppTooltip>

            {
              sgs.status !== 'IN_PROGRESS' && <AppTooltip content={
                <p>Delete suggestion</p>
              }>
                <i className={`i-tabler-trash text-destructive w-4 h-4 text-xl cursor-pointer`} onClick={(e) => delSuggestion(sgs._id)}></i>
              </AppTooltip>
            }
          </div>
        </div>
      }
    },
  ]

  /* const tabs = {
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
  } */

  const tableHeader = (table: any) => <>
    <KeywordsClusteringModal
      trigger={
        <Button variant='secondary'>Cluster the KWs list</Button>
      }
      onClose={() => fetchSuggestions()}
    />
  </>

  return (
    <div className='relative bg-background min-h-screen'>
      <div className='flex flex-col gap-4'>
        <DataTable
          pagination={pagination}
          sorting={sorting}
          columns={columns}
          loading={loading}
          rowsSize='small'
          data={selectedSuggestions}
          onUpdatePage={onUpdatePage}
          onUpdatePageSize={onUpdatePageSize}
          onSortingChange={setSorting}
          tableTitle={{
            title: 'Suggestions',
            subtitle: 'Analyze google search suggestions to get related questions and PPA'
          }}
          tableHeader={tableHeader}
        />
      </div>
    </div>
  )
}
