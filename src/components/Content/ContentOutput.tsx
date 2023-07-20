import { Output } from '@/lib/@types'
import React, { useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { deleteOutput as delOutput } from '@/api/outputs';

dayjs.extend(relativeTime)

function ContentOutput({ output, className, onOutputDeleted }: { output: Output; className?: string; onOutputDeleted?: () => void }) {
  const [copied, setCopied] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const copy = async() => {
    await navigator.clipboard.writeText(output.text)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500);
  }

  const deleteOutput = async () => {
    try {
      if (deleting) {
        if (!output?._id)
          return
        await delOutput(output._id)
        onOutputDeleted?.()
        setDeleting(false)
      }
      setDeleting(true)
      setTimeout(() => {
        setDeleting(false)
      }, 2000);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={`px-4 py-4 border-b border-gray-200 group cursor-pointer bg-green-50 hover:bg-green-300/5 ${className}`}>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <p className='text-gray-400/75 text-sm'>{ dayjs(output.created_at).fromNow() }</p>
        </div>
        <div className='flex items-center gap-2'>
          <button onClick={() => copy()} >
            <i className={`text-xl text-gray-400/75 ${copied ? 'i-tabler-check' : 'i-tabler-copy'}`}></i>
          </button>
          <button onClick={() => deleteOutput()} >
            {
              !deleting ? <i className={`text-xl hover:text-red-400/75 text-gray-400/75 transition-colors i-tabler-trash`}></i> : <p className='text-sm text-red-400 underline'>Sure ?</p>
            }
          </button>
        </div>
      </div>
      <ReactMarkdown
        className='prose prose-sm'
      >
        {output.text}
      </ReactMarkdown>
    </div>
  )
}

export default ContentOutput