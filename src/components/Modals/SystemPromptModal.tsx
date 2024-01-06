import React, { useState } from 'react'
import ModalBase from './ModalBase'
import characters from '@/lib/characters'
import AppTabs from '@/components/App/AppTabs'
import { Button } from '@/components/ui/button'
import AppInput from '../App/AppInput'
import AppTextarea from '../App/AppTextArea'

function SystemPromptModal(props: any) {

  const [customPrompt, setCustomPrompt] = useState('')

  const selectedCharacter = (index: number) => {
    props.onClose(false, characters[index])
  }

  const renderCharacters = () => {
    return characters.map((character, index) => (
      <div key={index} className="flex flex-col">
        <p className="font-bold text-lg">{ character.title }</p>
        <p className='text-gray-500 text-sm flex-1'>{ character.description }</p>
        <Button className='mt-4' onClick={() => selectedCharacter(index)}>Select</Button>
      </div>
    ))
  }

  const tabs = {
    Characters: () => (
      <div className='grid grid-cols-2 gap-4 py-8'>
        {renderCharacters()}
      </div>
    ),
    "Custom prompts": () => (
      <div>
        <AppTextarea
          id="chat-input-textbox"
          placeholder="Your message here..."
          className='flex-1 mb-4'
          rows={5}
          value={customPrompt}
          onChange={(e: any) => {
              console.log({ e: e.target.value })
              setCustomPrompt(e.target.value)
            }
          }
        ></AppTextarea>
        <Button
          block={true}
          onClick={() => {
            props.onClose(false, {
              prompt: customPrompt
            })
          }}
        >Set custom prompts</Button>
      </div>
    )
  }

  return (
    <ModalBase
      title="System/character prompts"
      trigger={props.trigger}
      open={props.open}
      onClose={() => props.onClose(false)}
      className="max-w-[750px]"
    >
      <AppTabs tabs={tabs} />
    </ModalBase>
  )
}

export default SystemPromptModal