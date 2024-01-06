import React, { useState } from 'react'
import ModalBase from './ModalBase'
import characters from '@/lib/characters'
import { Button } from '@/components/ui/button'
import AppInput from '../App/AppInput'
import AppTextarea from '../App/AppTextArea'
import { createProject, getProjects } from '@/api/projects'
import { setProjects as _setProjects, activeProject } from '@/stores/projects'
import { useAtom } from 'jotai'
import { createDocument, getDocuments } from '@/api/documents'
import { setDocumentsAtom } from '@/stores/documents'

function CreateDocument(props: any) {

  const [name, setName] = useState('')

  const [project] = useAtom(activeProject)
  const [, setDocuments] = useAtom(setDocumentsAtom)

  const saveDocument = async() => {
    try {
      if (!name?.length || !project?._id) {
        return
      }

      await createDocument({
        content: `<p>${name} initial content</p>`,
        delta : {},
        name,
        status: "CREATED",
        project: project?._id,
      })

      const res = await getDocuments()

      if (res) {
        setDocuments(res)
        props.onClose()
      }


    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ModalBase
      title="New Document"
      description="Write content using templates and out editor"
      open={props.open}
      trigger={props.trigger}
      onClose={props.onClose}
      className="max-w-[450px]"
    >
      <div className='flex flex-col gap-4'>
        <AppInput
          label='Document name'
          placeholder='Blog post...'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className='flex items-center justify-end gap-4 mt-4'>
        <Button onClick={props.onClose} variant="outline">Cancel</Button>
        <Button onClick={(e) => saveDocument()}>Save Document</Button>
      </div>
    </ModalBase>
  )
}

export default CreateDocument
