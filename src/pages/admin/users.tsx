import { Inter } from 'next/font/google'
import LayoutMain from '@/components/Layouts/LayoutMain';
import { Button } from '@/components/ui/button';;
import { useEffect, useMemo, useState } from 'react';
import KeywordsListCreation from '@/components/Clustering/KeywordsListCreation';
import { Keywords, PaginationInfo, User } from '@/lib/@types';
import { deleteKeywordsList, getKeywordsLists } from '@/api/keywords';
import { useRouter } from 'next/router';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { DoorOpen, Trash } from 'lucide-react';
import { DataTable } from '@/components/App/AppDataTable/DataTable';
import { getUsers } from '@/api/users';
import { UserRowActions } from '@/components/Admin/UserRowActions';
import UserActions from '@/components/Admin/UserActions';

const inter = Inter({ subsets: ['latin'] })
export default function Users() {

  const router = useRouter()

  const [actionsModalPayload, setModalPayload] = useState<User | null>(null)
  const [actionsModalOpen, setActionModalOpen] = useState<boolean>(false)
  const [actionModalMode, setModalMode] = useState<'create' | 'edit'>('create')

  const [loading, setLoading] = useState<boolean>(false)

  const [users, setUsers] = useState<User[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
    itemCount: 0,
    pageSize: 10,
    page: 1,
    pageCount: 1,
  })

  function onUpdatePage(page: number) {
    setPagination((prev: PaginationInfo) => {
      fetchUsers({
        ...prev,
        page
      })
      return {
        ...prev,
        page,
      } as PaginationInfo
    })
  }
  function onUpdatePageSize(pageSize: number) {
    setPagination((prev) => {
      fetchUsers({
        ...prev,
        pageSize,
      })
      return {
        ...prev,
        pageSize,
      } as PaginationInfo
    })
  }

  async function fetchUsers({
    page,
    pageSize
  }: PaginationInfo) {
    try {
      setLoading(true)
      const users = await getUsers({
        page,
        page_size: pageSize
      })
      if (users) {
        setPagination({
          ...pagination,
          page: users.page,
          pageSize: users.page_size,
          pageCount: users.page_count,
          itemCount: users.items_count,
        })
        setUsers(users.data)
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  async function deleteList(id: string) {
    try {
      await deleteKeywordsList(id)
      setUsers(users.filter((l: User) => l.id !== id))
    } catch (error) {
      
    }
  }

  async function closeActionsModal() {
    setModalPayload(null)
    setActionModalOpen(false)
    await fetchUsers(pagination)
  }

  function openUserActionsModal(mode: 'create' | 'edit', payload: any = null) {
    setModalPayload(payload)
    setModalMode(mode)
    setActionModalOpen(true)
  }

  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      header: "First name",
      accessorKey: 'first_name',
    },
    {
      header: "Last name",
      accessorKey: 'last_name',
    },
    {
      header: "Email",
      accessorKey: 'email',
    },
    {
      header: "Admin",
      accessorKey: 'is_admin',
    },
    {
      header: "Joined",
      accessorKey: 'created_at',
    },
    {
      header: "Actions",
      cell({ row }) {
        return <UserRowActions row={row} onEditTriggered={() => openUserActionsModal('edit', row.original)} />
      }
    },
  ], [deleteList])

  return (
    <div>
      <div>
        <DataTable
          columns={columns}
          data={users}
          loading={loading}
          pagination={pagination}
          onUpdatePage={onUpdatePage}
          onUpdatePageSize={onUpdatePageSize}
          tableTitle={{
            title: "All Users",
          }}
          tableHeader={() =>
            <Button onClick={() => openUserActionsModal("create")}>Create User</Button>
          }
        />
        <UserActions
          open={actionsModalOpen}
          onClose={() => closeActionsModal()}
          mode={actionModalMode}
          payload={actionsModalPayload}
        />
      </div>
    </div>
  )
}

Users.getLayout = (page: any) => {
  return <LayoutMain
    title="Users List"
  >
    {page}
  </LayoutMain>
}
