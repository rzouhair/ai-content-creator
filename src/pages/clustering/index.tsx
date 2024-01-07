import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LayoutMain from '@/components/Layouts/LayoutMain';
import { useAtom } from 'jotai';
import { sideBarTheme } from '@/stores/theme';
import { Button } from '@/components/ui/button';;
import { Key, useEffect, useMemo, useState } from 'react';
import KeywordsListCreation from '@/components/Clustering/KeywordsListCreation';
import { Keywords, PaginationInfo } from '@/lib/@types';
import { deleteKeywordsList, getKeywordsLists } from '@/api/keywords';
import AppCard from '@/components/App/AppCard';
import { useRouter } from 'next/router';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { DoorOpen, Trash } from 'lucide-react';
import { DataTable } from '@/components/App/AppDataTable/DataTable';

const inter = Inter({ subsets: ['latin'] })
export default function Clustering() {

  const router = useRouter()

  const [creationModalOpen, setCreationModalOpen] = useState<boolean>(false)
  const [keywordsLists, setKeywordsLists] = useState<Keywords[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
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

  useEffect(() => {
    getKeywords()
  }, [])

  async function getKeywords() {
    try {
      const lists = await getKeywordsLists()
      if (lists)
        setKeywordsLists(lists)
    } catch (error) {
      
    }
  }

  async function deleteList(id: string) {
    try {
      await deleteKeywordsList(id)
      setKeywordsLists(keywordsLists.filter((l: Keywords) => l._id !== id))
    } catch (error) {
      
    }
  }

  async function closeKeywordsCreationModal() {
    setCreationModalOpen(false)
    await getKeywords()
  }

  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      header: "Title",
      accessorKey: 'title',
    },
    {
      header: "Keywords count",
      cell({ row }) {
        const list = row.original.saved_cluster
        const keywordsCount: number = list.reduce((acc: number, li: any) => acc + li.keywords.length, 0) 
        return <p>{keywordsCount}</p>
      }
    },
    {
      header: "Status",
      cell({ row }) {
        const list = row.original
        return list.saved_cluster && Object.values(list.saved_cluster).length
          ? <Badge variant='secondary'>Clustered</Badge>
          : <Badge variant='default'>Created</Badge>
      }
    },
    {
      header: "Actions",
      cell({ row }) {
        const list = row.original
        return <div>
          <div className='flex items-center gap-2'>
            <Button size='icon' onClick={() => router.push(`/clustering/${list._id}`)}>
              <DoorOpen className='w-5 h-5' />
            </Button>
            <Button size='icon' variant='destructive' onClick={() => deleteList(list._id)}>
              <Trash className='w-5 h-5' />
            </Button>
          </div>
        </div>
      }
    },
  ], [deleteList])

  return (
    <div>
      <div>
        <DataTable
          columns={columns}
          data={keywordsLists}
          tableTitle={{
            title: "All Keywords Lists",
          }}
          tableHeader={() =>
            <KeywordsListCreation
              trigger={<Button onClick={() => setCreationModalOpen(true)}>Create Keywords List</Button>}
              open={creationModalOpen}
              onClose={closeKeywordsCreationModal}
            />
          }
          pagination={pagination}
        />
      </div>
    </div>
  )
}

Clustering.getLayout = function getLayout(page: any) {
  return (
    <LayoutMain
      title="Keywords Clustering"
      description="Organize your keywords list by clustering them by similarity and relevance"
    >
      {page}
    </LayoutMain>
  )
}
