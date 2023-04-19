import { getDocuments } from '@/api/documents';
import LayoutMain from '@/components/Layouts/LayoutMain';
import React, { useCallback, useEffect, useState } from 'react'
import { Document } from '@/lib/@types';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import AppTable, { AvatarCell, SelectColumnFilter, StatusPill } from '@/components/App/AppTable';
import AppButton from '@/components/App/AppButton';
import NewDocument from '@/components/Modals/NewDocument';
import { useAtom } from 'jotai';
import { activeProject } from '@/stores/projects';
import { setActiveDocumentAtom } from '@/stores/documents';

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

  const columns = React.useMemo(() => [
    {
      Header: "Name",
      accessor: 'name',
    },
    {
      Header: "Created at",
      accessor: 'created_at',
      Cell: ({ value }: { value: string }) => {
        return <p className='text-sm text-gray-800'>{ dayjs(value)?.format('DD/MM/YYYY HH:mm:ss') }</p>
      }
    },
    {
      Header: "Updated at",
      accessor: 'updated_at',
      Cell: ({ value }: { value: string }) => {
        return <p className='text-sm text-gray-800'>{ dayjs(value)?.format('DD/MM/YYYY HH:mm:ss') }</p>
      }
    },
  ], [])

  const onDocumentClick = (row: any) => {
    setActiveDocument(row.original as Document)
    console.log(row.original)
    router.push(`/content/${row.original._id}`)
  }

  return (
    <div className='p-4'>
      <header className='flex items-center flex-wrap justify-end gap-4'>
        <AppButton onClick={(e) => setDocumentCreateModal(true)}>Create document</AppButton>
      </header>
      {!loading && <AppTable
        columns={columns}
        data={documents}
        onRowClick={(row: any) => onDocumentClick(row)}
        tableTitle={{
          title: 'Documents'
        }}
      />}

      <NewDocument open={documentCreateModalOpen} onClose={(e) => setDocumentCreateModal(false)} />
    </div>
  )
}

Content.getLayout = function getLayout(page: any) {
  return <LayoutMain>{page}</LayoutMain>;
}

export default Content