import { Button } from '@/components/ui/button'
import { PaginationInfo } from "@/lib/@types"
import AppTabs from "@/components/App/AppTabs";
import AppTag from "@/components/App/AppTag";
import LayoutMain from "@/components/Layouts/LayoutMain";
import { Search } from "@/lib/@types";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/App/AppDataTable/DataTable';

function SuggestionById() {
  const router = useRouter();
  const { id } = router.query;

  const [search, setSearch] = useState<Search>();

  const [pagination, setPagination] = React.useState<PaginationInfo>({
    itemCount: search?.questions?.length || 0,
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
      pageCount: Math.ceil(search?.questions.length / pageSize)
    } as PaginationInfo)
    console.log("Page size changed here: " + pageSize)
  }

  const getSearch = async (suggestion_id: string) => {
    try {
      const res = await axios.get(
        `/keyword-research/suggestions/${suggestion_id}/search`
      );
      setSearch(res.data);
      setPagination({
        ...pagination,
        itemCount: res.data.questions?.length || 0,
        pageCount: Math.ceil(res.data.questions.length / pagination.pageSize),
      } as PaginationInfo)

      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSearch(id as string);
  }, []);

  const columns = React.useMemo<ColumnDef<any>[]>(() => [
    {
      header: "Question",
      accessorKey: 'question',
      cell: ({row}) => {
        return <div className="text-sm text-gray-800 dark:text-white flex items-center flex-wrap items-center gap-2">
          <p>{ row.getValue('question') }</p>
          <i className='text-indigo-800 i-tabler-arrow-up-right font-semibold text-xl cursor-pointer' onClick={(e) => window.open(`https://www.google.com/search?q=${(row.getValue('question') as string)?.replaceAll(/<\/?b>/g, "")}&gl=us`, '_blank')} />
        </div>
      }
    },
    {
      header: "Visible in SERPs",
      accessorKey: 'visible_in_serps',
    },
    {
      header: "Type",
      accessorKey: 'type',
      cell: ({ row }) => {
        return <AppTag color={row.getValue('type') === 'PPA' ? 'yellow' : 'blue'}>{row.getValue('type')}</AppTag>
      }
    },
  ], [])

  const renderSerps = () => {
    return search?.serps.map((serp: any, i: number) => (
      <div
        key={i}
        className="py-4 w-full box-content max-w-[600px]"
      >
        {serp.snippet?.html && (
          <p
            className="mb-2 text-2xl snippet"
            dangerouslySetInnerHTML={{ __html: serp.snippet?.html }}
          ></p>
        )}
        <div className="text-sm">
          <span className="capitalize text-green-700 text-base">{serp.serp_header.displayed_name}</span>
          <div className="byrV5b">
            <cite className="qLRx3b tjvcx GvPZzd cHaqb text-green-700" role="text">
              {serp.serp_header.displayed_link}
            </cite>
          </div>
        </div>

        <a href={serp.link} target="_blank">
          <h3 className="text-[1.35rem] my-1 dark:text-[#8ab4f8] text-[#1a0dab] hover:underline">
            {serp.title}
          </h3>
        </a>
        {serp.meta_description && (
          <div className="text-[#4d5156]">
            <div
              className=" VwiC3b yXK7lf MUxGbd yDYNvb lyLwlc lEBKkf text-sm"
              style={{ WebkitLineClamp: 2, lineClamp: 2 }}
            >
              <span className="MUxGbd wuQ4Ob WZ8Tjf">
                <span>{ `${serp.meta_description?.date ? serp.meta_description?.date + ' — ' : ''}` }</span>
              </span>
              <span className="leading-6" dangerouslySetInnerHTML={{ __html: serp.meta_description?.html || 'span' }}>
              </span>
            </div>
          </div>
        )}

        {serp?.serp?.footer && (
          <div className="leading-6 mt-2 dark:text-[#8ab4f8] text-[#1a0dab]" dangerouslySetInnerHTML={{ __html: serp.serp?.footer || '<span></span>' }}>
          </div>
        )}
      </div>
    ));
  };

  const startIndex = (pagination.page - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;

  const renderRelated = () => {
    return <DataTable
      data={search?.questions.slice(startIndex, endIndex)}
      columns={columns as ColumnDef<unknown, unknown>[]}
      tableTitle={{
        title: 'Questions',
        subtitle: 'Related and PPA questions extracted from Google SERP'
      }}
      pagination={pagination}
      onUpdatePage={onUpdatePage}
      onUpdatePageSize={onUpdatePageSize}
    />
    /* return <AppTable
      columns={columns}
      data={data.slice((pagination.page - 1) * pagination.pageSize, (pagination.page - 1) * pagination.pageSize + pagination.pageSize)}
      pagination={pagination}
      tableTitle={{
        title: 'Questions',
        subtitle: 'Related and PPA questions extracted from Google SERP'
      }}
    /> */
  }


  const tabs = {
    SERPs: () => (
      <div className=''>
        {renderSerps()}
      </div>
    ),
    "Related and PPA Questions": () => (
      <div> 
        {renderRelated()}
      </div>
    )
  }

  return <div className="px-6 bg-background min-h-screen">
    <div className="mb-6">
      <h1 className="capitalize font-semibold mb-2 dark:text-white">{ search?.related_suggestion_id?.search_query || '💀 Searrch query not available 💀' }</h1>
      <h2 className="capitalize text-gray-500">{ search?.related_suggestion_id?.parent_keyword || '💀 Parent Keyword not available 💀' }</h2>
    </div>
    <AppTabs tabs={tabs} />
  </div>;
}

SuggestionById.getLayout = (page: any) => {
  return <LayoutMain>{page}</LayoutMain>;
};

export default SuggestionById;
