import React, { useState } from 'react'
import ModalBase from '../Modals/ModalBase'
import characters from '@/lib/characters'
import { Button } from '@/components/ui/button'
import AppInput from '../App/AppInput'
import AppTextarea from '../App/AppTextArea'
import { createProject, getProjects } from '@/api/projects'
import { setProjects as _setProjects } from '@/stores/projects'
import { useAtom } from 'jotai'
import { createKeywordsList } from '@/api/keywords'

function KeywordsListCreation(props: any) {

  const [title, setTitle] = useState('')
  const [keywordsList, setKeywordsList] = useState('')
  
  const [loading, setLoading] = useState<boolean>(false)

  const selectedCharacter = (index: number) => {
    props.onClose(false, characters[index])
  }

  const saveProject = async() => {
    try {
      if (!title?.length) {
        return
      }

      const list = keywordsList.split('\n')
      if (!list.length)
        return

      setLoading(true)
      await createKeywordsList({
        title,
        keywords: list,
      })

      props.onClose(false)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalBase
      title=""
      open={props.open}
      onClose={() => props.onClose(false)}
      className="max-w-[450px]"
    >
      <h1 className="mb-2 mt-0 font-bold">Create a new Keywords list</h1>
      <p className='text-gray-500 mb-5'>You can cluster the keywords based on your preferences</p>

      <div className='flex flex-col gap-4'>
        <AppInput
          label='List title'
          placeholder='Best VPNs...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <AppTextarea
          value={keywordsList}
          label='Keywords List'
          placeholder='One keyword per line, keywords in the same line will be considered as one'
          rows={5}
          onChange={(e) => setKeywordsList(e.target.value)}
        />
      </div>

      <div className='flex items-center justify-between gap-4 mt-4'>
        <Button onClick={(e) => props.onClose(false)} loading={loading} background='light' text='black'>Cancel</Button>
        <Button onClick={(e) => saveProject()} loading={loading}>Save</Button>
      </div>
    </ModalBase>
  )
}

export default KeywordsListCreation
