import { Button } from '@/components/ui/button'
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import "react-quill/dist/quill.snow.css";
import { Keywords } from "@/lib/@types";
import { clusterKeywordsList, getKeywordsListById } from "@/api/keywords";
import AppNumberInput from "@/components/App/AppInput";
import AppAccordion from "@/components/App/AppAccordion";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import KeywordCard from './KeywordCard';
import KeywordsClusteringModal from '../Modals/KeywordsClusteringModal';

function KeywordClustering() {
  const router = useRouter()

  const [keywordsList, setKeywordsList] = useState<Keywords | null>(null)

  async function getKeywordsList() {
    try {
      const res = await getKeywordsListById(router.query.listId as string)
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

  return (
    <div>
      <div className=''>
        <div className="my-8">
          {
            (keywordsList?.saved_cluster && Object.values(keywordsList.saved_cluster)?.length)
            ? <div className="grid grid-cols-3 gap-4">
              {
                keywordsList?.saved_cluster?.map?.((cluster, i) => <KeywordCard key={i} cluster={cluster} />)
              }
            </div>
            : <div className='flex items-center justify-center flex-col gap-2 bg-muted rounded-md pb-4 pt-8'>
              <p>
                This keywords list has not been clustered yet
              </p>

              <KeywordsClusteringModal
                trigger={
                  <Button size="sm" variant='secondary'>Cluster the KWs list</Button>
                }
                onClose={getKeywordsList}
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
}
export default KeywordClustering