import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react'
import { Project, Suggestion } from '@/lib/@types'
import { useRouter } from 'next/router'
// @ts-ignore
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { PaginationInfo } from "@/lib/@types"
import AppTag from '@/components/App/AppTag'
import AppTooltip from '@/components/App/AppTooltip'

import { getKeywordsListSuggestions } from '@/api/keywords';
import { ArrowUpDown } from 'lucide-react';

export default function KeywordList() {

  const router = useRouter();
  const { listId: id } = router.query;

  const [loading, setLoading] = useState(false)

  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  
  const [sortBy, setSortBy] = useState('metadata.modifier')
  const [pagination, setPagination] = React.useState<PaginationInfo>({
    itemCount: 0,
    pageSize: 100,
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

  async function fetchSuggestions(page = pagination.page, pageSize = pagination.pageSize) {
    try {
      if (!id)
        return
      setLoading(true)

      let overAllData: any[] = []

      const res = await getKeywordsListSuggestions(id.toString(), {
        page: page,
        page_size: pageSize,
        sort_by: sortBy
      })

      console.log({
        res
      })
      if(!res?.data)
        return

      overAllData = overAllData.concat(res.data)

      if (res.page_count > 1) {
        const _res = await Promise.all(Array.from(Array(res.page_count - 1).keys()).map((key) => {
          return getKeywordsListSuggestions(id.toString(), {
            page: key + 2,
            page_size: pageSize,
            sort_by: sortBy
          })
        }))

        overAllData = overAllData.concat(..._res.map((r) => r?.data))
      }

      console.log({
        data: groupDataByModifier(overAllData)
      })
      setSuggestions(groupDataByModifier(overAllData))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSuggestions()
  }, [])

  function changeSorting() {
    if (sortBy.startsWith('-')) {
      setSortBy(sortBy.replace('-', ''))
    } else {
      setSortBy('-' + sortBy)
    }
    fetchSuggestions()
  }

  function groupDataByModifier(data: Suggestion[]): any {
    const groupedData: any = {};

    data.forEach(item => {
      if (!item.metadata?.modifier)
        return
      const [category, modifier] = item.metadata.modifier?.split('/');
      if (modifier) {
        if (!groupedData[category]) {
          groupedData[category] = {};
        }
        if (!groupedData[category][modifier]) {
          groupedData[category][modifier] = [];
        }
        groupedData[category][modifier].push(item);
      } else {
        if (!groupedData[category]) {
          groupedData[category] = [];
        }
        groupedData[category].push(item);
      }
    });

    return groupedData;
  }

  function renderTable(list: Suggestion[], header?: string) {
    return <Card>
      <CardHeader className='pb-4'>
        <CardTitle>{header}</CardTitle>
      </CardHeader>
      <CardContent className='px-2'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Keyword</TableHead>
              <TableHead>CPC</TableHead>
              <TableHead>Vol</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((suggestion: Suggestion) => (
              <TableRow key={suggestion._id} className='border-0'>
                <TableCell className='flex-1 px-4 py-2'>{suggestion.search_query}</TableCell>
                <TableCell className='px-4 py-2'>0.5$</TableCell>
                <TableCell className='px-4 py-2'>120</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  }

  function renderTables() {
    return Object.entries(suggestions).map(([modifier, children], j) => {
      
      if (Array.isArray(children)) {
        return <div key={`${modifier}-${j}`} className='grid grid-cols-3 gap-4'>
          {renderTable(children, modifier)}
        </div>
      }
      return <div key={`sub-${modifier}-${j}`}>
        <h1 className='font-semibold'>{modifier}</h1>
        <div className='grid grid-cols-3 gap-4'>
          {
            Object.entries(children).map(([subModifier, list], i) => {
              return renderTable(list, subModifier)
            })
          }
        </div>
      </div>
    })
  }

  return (
    <div className='relative bg-background min-h-screen'>
      <div className='flex flex-col gap-4 mb-12'>
        {renderTables()}
      </div>
    </div>
  )
}
