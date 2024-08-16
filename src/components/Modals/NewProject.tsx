import React, { useState } from 'react'
import ModalBase from './ModalBase'
import characters from '@/lib/characters'
import { Button } from '@/components/ui/button'
import AppInput from '../App/AppInput'
import AppTextarea from '../App/AppTextArea'
import { createProject, getProjects } from '@/api/projects'
import { setProjects as _setProjects } from '@/stores/app'
import { useAtom } from 'jotai'

function SystemPromptModal(props: any) {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [, setProjects] = useAtom(_setProjects)

  const selectedCharacter = (index: number) => {
    props.onClose(false, characters[index])
  }

  const saveProject = async() => {
    try {
      if (!name?.length) {
        return
      }

      await createProject({
        name,
        description,
      })

      const res = await getProjects()

      console.log(res)
      if (res)
        setProjects(res)

      props.onClose(false)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ModalBase
      title="New project"
      description='Projects help you organize your work'
      open={props.open}
      trigger={props.trigger}
      onClose={props.onClose}
      className="max-w-[450px]"
    >
      <div className='flex flex-col gap-4'>
        <AppInput
          label='Project name'
          placeholder='Client project...'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <AppTextarea
          value={description}
          label='Description (optional)'
          placeholder='Explain what the project is about ?'
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className='flex items-center justify-end gap-4 mt-4'>
        <Button onClick={props.onClose} variant="outline">Cancel</Button>
        <Button onClick={(e) => saveProject()}>Save Project</Button>
      </div>
    </ModalBase>
  )
}

export default SystemPromptModal
