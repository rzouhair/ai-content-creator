import { Inter } from 'next/font/google'
import LayoutMain from '@/components/Layouts/LayoutMain';
import { Button } from '@/components/ui/button';;
import { useMemo, useState } from 'react';
import { Skill, PaginationInfo } from '@/lib/@types';
import { deleteKeywordsList, } from '@/api/keywords';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/App/AppDataTable/DataTable';
import { UserRowActions } from '@/components/Admin/UserRowActions';
import Image from 'next/image'
import { getSkills } from '@/api/skills';
import { toast } from 'sonner';
import SkillsAction from '@/components/Admin/SkillsActions';
import { Badge } from '@/components/ui/badge';
import { SkillRowActions } from '@/components/Admin/SkillRowActions';

const inter = Inter({ subsets: ['latin'] })
export default function Skills() {
  const [actionModal, setActionModal] = useState<{
    open: boolean;
    mode: string;
    payload: null;
  }>({
    open: false,
    mode: 'create',
    payload: null
  })

  const [loading, setLoading] = useState<boolean>(false)

  const [skills, setSkills] = useState<Skill[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
    itemCount: 0,
    pageSize: 10,
    page: 1,
    pageCount: 1,
  })

  function onUpdatePage(page: number) {
    setPagination((prev: PaginationInfo) => {
      fetchData({
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
      fetchData({
        ...prev,
        pageSize,
      })
      return {
        ...prev,
        pageSize,
      } as PaginationInfo
    })
  }

  async function fetchData({
    page,
    pageSize
  }: PaginationInfo) {
    try {
      setLoading(true)
      const skills = await getSkills({
        page,
        page_size: pageSize
      })
      if (skills) {
        setPagination({
          ...pagination,
          page: skills.page,
          pageSize: skills.page_size,
          pageCount: skills.page_count,
          itemCount: skills.items_count,
        })
        console.log(skills)
        setSkills(skills.data || [])
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  async function deleteList(id: string) {
    try {
      await deleteKeywordsList(id)
      setSkills(skills.filter((l: Skill) => l._id !== id))
    } catch (error: any) {
      toast(error.message)
    }
  }

  async function closeActionsModal() {
    setActionModal({
      payload: null,
      mode: 'create',
      open: false,
    })
    await fetchData(pagination)
  }

  function openSkillsActionModal(mode: 'create' | 'edit', payload: any = null) {
    setActionModal({
      payload,
      mode,
      open: true,
    })
  }

  const columns = useMemo<ColumnDef<Skill>[]>(() => [
    {
      header: "Icon",
      cell({row}) {
        const skill = row.original

        return skill.emoji
      }
    },
    {
      header: "Label",
      accessorKey: 'name',
    },
    {
      header: "Tags",
      cell({ row: { original: skill } }) {
        return <div className="flex flex-1 items-end gap-2 pt-4 flex-wrap">
          {skill.tags.slice(0, 2).map((tag) => (
            <Badge key={tag._id}>{tag.name}</Badge>
          ))}
          {skill.tags.length > 2 && <Badge variant={'outline'}>{`+${skill.tags.length - 2}`}</Badge>}
        </div>
      }
    },
    {
      header: "Hidden",
      cell({ row: { original: skill } }) {
        return skill.hidden ? '✅' : '❌'
      }
    },
    {
      header: "Actions",
      cell({ row }) {
        return <SkillRowActions row={row} onEditTriggered={() => openSkillsActionModal('edit', row.original)} />
      }
    },
  ], [deleteList])

  return (
    <div>
      <div>
        <DataTable
          columns={columns}
          data={skills}
          loading={loading}
          pagination={pagination}
          onUpdatePage={onUpdatePage}
          onUpdatePageSize={onUpdatePageSize}
          tableTitle={{
            title: "All Users",
          }}
          tableHeader={() =>
            <Button onClick={() => openSkillsActionModal("create")}>Create Skill</Button>
          }
        />
        {actionModal.open && <SkillsAction
          open={actionModal.open}
          onClose={() => closeActionsModal()}
          mode={actionModal.mode}
          payload={actionModal.payload}
        />}
      </div>
    </div>
  )
}

Skills.getLayout = (page: any) => {
  return <LayoutMain
    title="Skills List"
  >
    {page}
  </LayoutMain>
}
