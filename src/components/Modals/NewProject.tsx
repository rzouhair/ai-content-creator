import React, { useState } from 'react'
import ModalBase from './ModalBase'
import characters from '@/lib/characters'
import AppButton from '../App/AppButton'
import AppInput from '../App/AppInput'
import AppTextarea from '../App/AppTextArea'
import { createProject, getProjects } from '@/api/projects'
import { setProjects as _setProjects } from '@/stores/projects'
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
      title=""
      open={props.open}
      onClose={() => props.onClose(false)}
      className="max-w-[450px]"
    >
      <h1 className="mb-2 mt-0 font-bold">New project</h1>
      <p className='text-gray-500 mb-5'>Projects help you organize your work</p>

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
        <AppButton onClick={(e) => props.onClose(false)} background='light' text='black'>Cancel</AppButton>
        <AppButton onClick={(e) => saveProject()}>Save Project</AppButton>
      </div>
    </ModalBase>
  )
}

export default SystemPromptModal
