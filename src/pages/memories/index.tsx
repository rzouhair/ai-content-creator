import { Inter } from 'next/font/google'
import LayoutMain from '@/components/Layouts/LayoutMain';
import { Button } from '@/components/ui/button';;
import { useEffect, useMemo, useState } from 'react';
import KeywordsListCreation from '@/components/Clustering/KeywordsListCreation';
import { Keywords, MEMORY_STATUS_TYPES, MEMORY_TYPES, Memory, PaginationInfo } from '@/lib/@types';
import { deleteMemory, getMemories as getMemoriesList } from '@/api/memories';
import { useRouter } from 'next/router';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { DoorOpen, Trash } from 'lucide-react';
import { DataTable } from '@/components/App/AppDataTable/DataTable';

const inter = Inter({ subsets: ['latin'] })
export default function KeywordResearch() {

  const router = useRouter()

  const [creationModalOpen, setCreationModalOpen] = useState<boolean>(false)
  const [memories, setMemories] = useState<Memory[]>([])
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
    getMemories()
  }, [])

  async function getMemories() {
    try {
      const lists = await getMemoriesList()
      if (lists)
        setMemories(lists)
    } catch (error) {
      
    }
  }

  async function deleteList(id: string) {
    try {
      await deleteMemory(id)
      setMemories(memories.filter((l: Memory) => l._id !== id))
    } catch (error) {
      
    }
  }

  async function closeKeywordsCreationModal() {
    setCreationModalOpen(false)
    await getMemories()
  }

  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      header: "Title",
      accessorKey: 'name',
    },
    {
      header: "Type",
      cell({ row }) {
        const list = row.original as Memory
        switch (list.type) {
          case MEMORY_TYPES.TEXT:
            return <Badge variant='default' className='py-1'>
              <i className='i-tabler-text-caption w-4 h-4 mr-1'></i>
              Text
            </Badge>

          case MEMORY_TYPES.FILE:
            return <Badge variant='secondary' className='py-1'>
              <i className='i-tabler-file w-4 h-4 mr-1'></i>
              File
            </Badge>

          case MEMORY_TYPES.YTB:
            return <Badge variant='destructive' className='py-1'>
              <i className='i-tabler-brand-youtube w-4 h-4 mr-1'></i>
              Youtube
            </Badge>
        
          default:
            break;
        }
      }
    },
    {
      header: "Status",
      cell({ row }) {
        const list = row.original as Memory
        switch (list.status) {
          case MEMORY_STATUS_TYPES.CREATED:
            return <Badge variant='default' className='py-1'>
              <i className="i-tabler-point-filled w-4 h-4 -ml-1 mr-1"></i>
              Created
            </Badge>

          case MEMORY_STATUS_TYPES.PROCESSING:
            return <Badge variant='outline' className='py-1'>
              <i className='i-tabler-loader animate-spin w-4 h-4 -ml-1 mr-1'></i>
              Processing
            </Badge>

          case MEMORY_STATUS_TYPES.PROCESSED:
            return <Badge variant='secondary' className='py-1'>
              <i className="i-tabler-check w-4 h-4 -ml-1 mr-1"></i>
              Processed
            </Badge>

          case MEMORY_STATUS_TYPES.ERROR:
            return <Badge variant='destructive' className='py-1'>
              <i className="i-tabler-x w-4 h-4 -ml-1 mr-1"></i>
              Error
            </Badge>
        
          default:
            break;
        }
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
          data={memories}
          tableTitle={{
            title: "Memories Lists",
          }}
          tableHeader={() =>
            <KeywordsListCreation
              trigger={<Button onClick={() => router.push('/memories/create')}>Create Memory</Button>}
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
    title="Memories"
    description="Extend the AI's memory with your information"
  >
    {page}
  </LayoutMain>
}
