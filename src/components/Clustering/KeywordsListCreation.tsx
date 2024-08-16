import React, { useState } from 'react'
import ModalBase from '../Modals/ModalBase'
import characters from '@/lib/characters'
import { Button } from '@/components/ui/button'
import AppInput from '../App/AppInput'
import AppTextarea from '../App/AppTextArea'
import * as appStore from '@/stores/app'
import { useAtom } from 'jotai'
import { createKeywordsList } from '@/api/keywords'

function KeywordsListCreation(props: any) {

  const [activeProject] = useAtom(appStore.activeProject)
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
        project: activeProject?._id
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
      title="Create a new Keywords list"
      description='You can cluster the keywords based on your preferences'
      open={props.open}
      trigger={props.trigger}
      onClose={props.onClose}
      className="max-w-[450px]"
    >
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
        <Button loading={loading} variant='outline' onClick={props.onClose}>Cancel</Button>
        <Button onClick={(e) => saveProject()} loading={loading}>Save</Button>
      </div>
    </ModalBase>
  )
}

export default KeywordsListCreation
