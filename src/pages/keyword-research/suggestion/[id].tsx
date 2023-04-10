import LayoutMain from '@/components/Layouts/LayoutMain'
import { Search } from '@/lib/@types'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function SuggestionById() {

  const router = useRouter()
  const { id } = router.query

  const [search, setSearch] = useState<Search>()

  const getSearch = async(suggestion_id: string) => {
    try {
      const res = await axios.get(`/keyword-research/suggestions/${suggestion_id}/search`)
      setSearch(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getSearch(id as string)
  }, [])

  const renderSerps = () => {
    return search?.serps.map((serp: any, i: number) => (
      <div key={i} className="py-4 px-6">
        {serp.snippet && <p className='font-bold mb-2'>{ serp.snippet }</p>}
        <h3 className='font-bold text-lg'>{ serp.title }</h3>
        <a href={serp.url} target="_blank">{ serp.url }</a>
      </div>
    ))
  }

  return (
    <div>
      {renderSerps()}
    </div>
  )
}


SuggestionById.getLayout = (page: any) => {
  return <LayoutMain>
    {page}
  </LayoutMain>
}

export default SuggestionById