import { getDocuments } from '@/api/documents';
import LayoutMain from '@/components/Layouts/LayoutMain';
import React, { useCallback, useEffect, useState } from 'react'
import { Document } from '@/lib/@types';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import AppTable, { AvatarCell, PaginationInfo, SelectColumnFilter, StatusPill } from '@/components/App/AppTable';
import NewDocument from '@/components/Modals/NewDocument';
import { useAtom } from 'jotai';
import { activeProject } from '@/stores/app';
import { setActiveDocumentAtom } from '@/stores/documents';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/App/AppDataTable/DataTable';

function Content() {

  const [documentCreateModalOpen, setDocumentCreateModal] = useState(false)
  const [documents, setDocuments] = useState<Document[] | undefined>([])
  const [project] = useAtom(activeProject)
  const [, setActiveDocument] = useAtom(setActiveDocumentAtom)

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    try {
      setLoading(true)
      const docs = await getDocuments(project?._id)

      setDocuments(docs)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
    return documents
  }

  useEffect(() => {
    getData()
  }, [documentCreateModalOpen])

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

  const columns = React.useMemo<ColumnDef<unknown, unknown>[]>(() => [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created at
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{ dayjs(row.getValue("created_at"))?.format('DD/MM/YYYY HH:mm:ss')}</div>,
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Updated at
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{ dayjs(row.getValue("updated_at"))?.format('DD/MM/YYYY HH:mm:ss')}</div>,
    },
  ], [])

  const onDocumentClick = (row: any) => {
    setActiveDocument(row.original as Document)
    console.log(row.original)
    router.push(`/content/${row.original._id}`)
  }

  return (
    <div className='bg-white dark:bg-background h-screen'>
      {!loading && <DataTable
        columns={columns}
        data={documents || []}
        pagination={pagination}
        onUpdatePage={onUpdatePage}
        onUpdatePageSize={onUpdatePageSize}
        onRowClick={(row: any) => onDocumentClick(row)}
        tableTitle={{
          title: 'Documents'
        }}
        tableHeader={(table) => {
          return <NewDocument
            open={documentCreateModalOpen}
            trigger={<Button onClick={(e) => setDocumentCreateModal(true)}>Create document</Button>}
            onClose={(e) => setDocumentCreateModal(false)}
          />
        }}
      />}
    </div>
  )
}

Content.getLayout = function getLayout(page: any) {
  return <LayoutMain
    title="Content Editor"
    description="Create documents to hold you well crafted blog posts"
  >
    {page}
  </LayoutMain>;
}

export default Content