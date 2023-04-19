import AppTable from "@/components/App/AppTable";
import AppTabs from "@/components/App/AppTabs";
import AppTag from "@/components/App/AppTag";
import LayoutMain from "@/components/Layouts/LayoutMain";
import { Search } from "@/lib/@types";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function SuggestionById() {
  const router = useRouter();
  const { id } = router.query;

  const [search, setSearch] = useState<Search>();

  const getSearch = async (suggestion_id: string) => {
    try {
      const res = await axios.get(
        `/keyword-research/suggestions/${suggestion_id}/search`
      );
      setSearch(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSearch(id as string);
  }, []);

  const columns = React.useMemo(() => [
    {
      Header: "Question",
      accessor: 'question',
    },
    {
      Header: "Visible in SERPs",
      accessor: 'visible_in_serps',
    },
    {
      Header: "Type",
      accessor: 'type',
      Cell: ({ value }: { value: string }) => {
        return <AppTag color={value === 'PPA' ? 'yellow' : 'blue'}>{value}</AppTag>
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

  const renderRelated = () => {
    return <AppTable
      columns={columns}
      data={Array.from(new Set(search?.questions))}
      tableTitle={{
        title: 'Questions',
        subtitle: 'Related and PPA questions extracted from Google SERP'
      }}
    />
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

  return <div className="px-6">
    <div className="mb-6">
      <h1 className="capitalize font-semibold mb-2">{ search?.related_suggestion_id?.search_query || '💀 Searrch query not available 💀' }</h1>
      <h2 className="capitalize text-gray-500">{ search?.related_suggestion_id?.parent_keyword || '💀 Parent Keyword not available 💀' }</h2>
    </div>
    <AppTabs tabs={tabs} />
  </div>;
}

SuggestionById.getLayout = (page: any) => {
  return <LayoutMain>{page}</LayoutMain>;
};

export default SuggestionById;
