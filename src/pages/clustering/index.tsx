import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LayoutMain from '@/components/Layouts/LayoutMain';
import { useAtom } from 'jotai';
import { sideBarTheme } from '@/stores/theme';
import { Button } from '@/components/ui/button';;
import { Key, useEffect, useState } from 'react';
import KeywordsListCreation from '@/components/Clustering/KeywordsListCreation';
import { Keywords } from '@/lib/@types';
import { deleteKeywordsList, getKeywordsLists } from '@/api/keywords';
import AppCard from '@/components/App/AppCard';
import { useRouter } from 'next/router';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const inter = Inter({ subsets: ['latin'] })

export default function Clustering() {

  const router = useRouter()

  const [creationModalOpen, setCreationModalOpen] = useState<boolean>(false)
  const [keywordsLists, setKeywordsLists] = useState<Keywords[]>([])

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

  return (
    <div>
      <div className='flex items-center justify-between gap-4 px-4'>
        <h1 className='font-bold'>Keywords Clustering</h1>
        <Button onClick={() => setCreationModalOpen(true)}>Create Keywords List</Button>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {
          keywordsLists.map((list: Keywords) => <Card key={list._id}>
            <CardHeader>
              <CardTitle>{ list.title }</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='mt-2 mb-4'>Number of Keywords: { list.embeddings.length }</p>
              <p className='mt-2 mb-4'>Clustered ? { list.saved_cluster && Object.values(list.saved_cluster).length ? 'Yes' : 'No' }</p>
              <div className='flex items-center justify-between mt-4'>
                <Button onClick={() => router.push(`/clustering/${list._id}`)}>Access List</Button>
                <Button background='red' onClick={() => deleteList(list._id)}>Delete List</Button>
              </div>
            </CardContent>
          </Card>)
        }
      </div>

      <KeywordsListCreation open={creationModalOpen} onClose={closeKeywordsCreationModal} />
    </div>
  )
}

Clustering.getLayout = function getLayout(page: any) {
  return (
    <LayoutMain>
      {page}
    </LayoutMain>
  )
}
