import { Inter } from 'next/font/google'
import LayoutMain from '@/components/Layouts/LayoutMain';
import { Button } from '@/components/ui/button';;
import { useEffect, useMemo, useState } from 'react';
import KeywordsListCreation from '@/components/Clustering/KeywordsListCreation';
import { Keywords, PaginationInfo } from '@/lib/@types';
import { deleteKeywordsList, getKeywordsLists } from '@/api/keywords';
import { useRouter } from 'next/router';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { DoorOpen, Trash } from 'lucide-react';
import { DataTable } from '@/components/App/AppDataTable/DataTable';

const inter = Inter({ subsets: ['latin'] })
export default function KeywordResearch() {

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
        const list = row.original.suggestions
        return <p>{list.length}</p>
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
            <Button size='icon' onClick={() => router.push(`/keyword-research/${list._id}`)}>
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

KeywordResearch.getLayout = (page: any) => {
  return <LayoutMain
    title="Keyword research"
    description="Discover dozens of relevant keyword clusters in a matter of minutes"
  >
    {page}
  </LayoutMain>
}
