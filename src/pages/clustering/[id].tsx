import { Button } from '@/components/ui/button'
import LayoutMain from "@/components/Layouts/LayoutMain";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import "react-quill/dist/quill.snow.css";
import { Keywords } from "@/lib/@types";
import { clusterKeywordsList, getKeywordsListById } from "@/api/keywords";
import AppCard from "@/components/App/AppCard";
import AppNumberInput from "@/components/App/AppInput";
import AppAccordion from "@/components/App/AppAccordion";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function KeywordListPage() {
  const router = useRouter()

  const [keywordsList, setKeywordsList] = useState<Keywords | null>(null)
  const [clustersCount, setClustersCount] = useState<number>(5)
  const [loading, setLoading] = useState<boolean>(false)

  const keywords = keywordsList?.embeddings.map((item) => item.keyword)

  async function getKeywordsList() {
    try {
      const res = await getKeywordsListById(router.query.id as string)
      if (res) {
        setKeywordsList(res)
      }
    } catch (error) {
      router.push('/clustering')
    }
  }

  useEffect(() => {
    getKeywordsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function clusterList() {
    try {
      setLoading(true)
      const clustered = await clusterKeywordsList(router.query.id as string, {
        cluster_count: clustersCount
      })
      await getKeywordsList()
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='flex items-center justify-between gap-4 px-4'>
        <h1 className='font-bold'>{ keywordsList?.title || 'Keyword List' }</h1>
      </div>

      <div className=''>
        <div className="flex items-center justify-between px-6">
          <h2 className="font-semibold text-xl mt-0 mb-2">List Clustering</h2>

          <div className="flex items-end justify-between px-6 gap-4 pb-4">
            <AppNumberInput value={clustersCount.toString()} onChange={(e) => setClustersCount(Number(e.target.value))} label="Number of clusters" />
            <Button loading={loading} className="mb-1" onClick={() => clusterList()}>Cluster</Button>
          </div>
        </div>
        <div className="px-6 mb-8">
          {
            (keywordsList?.saved_cluster && Object.values(keywordsList.saved_cluster)?.length)
            ? <div className="grid grid-cols-3 gap-4">
              {
                keywordsList?.saved_cluster.map((cluster, i) => <AppAccordion
                    key={i}
                    items={[
                      {
                        title: <div className="flex items-center justify-between flex-1 w-full">
                          <p>{`${cluster.parent_keyword} (${cluster.keywords.length})`}</p>
                          <div>
                            <Button square={true} background="transparent" text="black">
                              <i className="i-tabler-copy"></i>
                            </Button>
                          </div>
                        </div>,
                        content: () => {
                          return <div className='flex gap-4 flex-col'>
                            {cluster.keywords?.map((keyword, j) => <div className="flex items-center justify-between" key={j}>
                              <p className="p-2">{ keyword }</p>
                              <div className="w-fit">
                                <Button square={true} background="transparent" text="black">
                                  <i className="i-tabler-copy"></i>
                                </Button>
                              </div>
                            </div>)}
                          </div>
                        }
                      }
                    ]}
                  />)
              }
            </div>
            : <div>No Clusters Available</div>
          }
        </div>

        <Card className="w-full pt-2">
          <CardHeader>
            <CardTitle className="mt-0 mb-2">Keywords List ({keywordsList?.embeddings.length})</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] overflow-auto border border-1">
            {keywords?.map((keyword, i) => <div className="flex items-center justify-between" key={i}>
              <p className="p-2">{ keyword }</p>
              <div className="w-fit">
                <Button square={true} background="transparent" text="black">
                  <i className="i-tabler-copy"></i>
                </Button>
              </div>
            </div>)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

KeywordListPage.getLayout = function getLayout(page: any) {
  return <LayoutMain navCollapsed={false}>{page}</LayoutMain>;
};

export default KeywordListPage;
