import { Search } from '@/lib/@types'
import React, { useState } from 'react'

function SearchStructure({ search }: { search: Search | null }) {
  const [copied, setCopied] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copy = async(link: string, i: number) => {
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setCopiedIndex(i)
    setTimeout(() => {
      setCopied(false)
      setCopiedIndex(null)
    }, 1500);
  }

  return (
    <div className='flex flex-col gap-4'>
      <div>
        <h2 className="font-bold mb-4">Search query</h2>
        <p>{ search?.related_suggestion_id?.search_query }</p>
      </div>
      { search?.related_suggestion_id?.search_query !== search?.related_suggestion_id?.parent_keyword && <div>
        <h2 className="font-bold mb-4">Parent keyword</h2>
        <p>{ search?.related_suggestion_id?.parent_keyword }</p>
      </div>}
      <h2 className="font-bold">Stats</h2>
      <div className='grid grid-cols-3 gap-8 py-8 rounded-lg bg-white'>
        <div className='text-center'>
          <p className='text-gray-600 text-sm'>Words</p>
          <p className='font-bold mb-1'>3,386 <i className='i-tabler-arrow-up text-red-500' /></p>
          <p className='text-xs'>14,738 - 16,949</p>
        </div>
        <div className='text-center'>
          <p className='text-gray-600 text-sm'>Headings</p>
          <p className='font-bold mb-1'>45 <i className='i-tabler-arrow-up text-red-500' /></p>
          <p className='text-xs'>90 - 200</p>
        </div>
        <div className='text-center'>
          <p className='text-gray-600 text-sm'>Paragraphs</p>
          <p className='font-bold mb-1'>53 <i className='i-tabler-arrow-up text-red-500' /></p>
          <p className='text-xs'>67 - 120</p>
        </div>
        <div className='text-center'>
          <p className='text-gray-600 text-sm'>Images</p>
          <p className='font-bold mb-1'>14 <i className='i-tabler-arrow-up text-red-500' /></p>
          <p className='text-xs'>35 - 89</p>
        </div>
        <div className='text-center'>
          <p className='text-gray-600 text-sm'>External links</p>
          <p className='font-bold mb-1'>14 <i className='i-tabler-arrow-up text-red-500' /></p>
          <p className='text-xs'>35 - 89</p>
        </div>
        <div className='text-center'>
          <p className='text-gray-600 text-sm'>Internal links</p>
          <p className='font-bold mb-1'>14 <i className='i-tabler-arrow-up text-red-500' /></p>
          <p className='text-xs'>35 - 89</p>
        </div>
      </div>
      <div>
        <h2 className='font-bold my-3'>Top 5 SERPs</h2>
        <div className='flex flex-col gap-2'>
          {search?.serps?.slice(0, 5).map((serp: any, i: number) => (
            <div key={serp.position}>
              <a href={serp.link} target='_blank' className='w-full truncate'>
                <h3 className="text-sm my-1 dark:text-[#8ab4f8] text-[#1a0dab] hover:underline cursor-pointer">
                  {serp.title} - {serp.serp_header.displayed_name}
                </h3>
                <cite className="link text-green-700 truncate flex items-center gap-2" role="text">
                  <i className={`min-w-[15px] ${copied && copiedIndex === i ? 'i-tabler-check' : 'i-tabler-copy'} cursor-pointer`} onClick={() => copy(serp.link, i)} />
                  <p>{serp.link}</p>
                </cite>
              </a>
              {
                serp.post_content && <div className='flex gap-4 flex-wrap mt-2'>
                  <span className='flex items-center gap-1'>
                    <i className='i-tabler-text-caption text-lg text-gray-500'></i>
                    <p className='text-xs font-semibold text-gray-500'>{serp.post_content.word_count}</p>
                  </span>
                  <span className='flex items-center gap-1'>
                    <i className='i-tabler-link text-lg text-gray-500'></i>
                    <p className='text-xs font-semibold text-gray-500'>{serp.post_content.link.count}</p>
                  </span>
                  <span className='flex items-center gap-1'>
                    <i className='i-tabler-photo text-lg text-gray-500'></i>
                    <p className='text-xs font-semibold text-gray-500'>{serp.post_content.images_count}</p>
                  </span>
                  <span className='flex items-center gap-1'>
                    <i className='i-tabler-heading text-lg text-gray-500'></i>
                    <p className='text-xs font-semibold text-gray-500'>{serp.post_content.headings_count}</p>
                  </span>
                  <span className='flex items-center gap-1'>
                    <i className='i-tabler-file-text text-lg text-gray-500'></i>
                    <p className='text-xs font-semibold text-gray-500'>{serp.post_content.paragraphs_count}</p>
                  </span>
                </div>
              }
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className='font-bold my-3'>Frequent keywords</h2>
        <div className='flex flex-col gap-2'>
          <p>Hey</p>
        </div>
      </div>
    </div>
  )
}

export default SearchStructure