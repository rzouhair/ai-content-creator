import React, { useState } from 'react'
import ModalBase from './ModalBase'
import characters from '@/lib/characters'
import { Button } from '@tremor/react'

function SystemPromptModal(props: any) {

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

  return (
    <ModalBase
      title="System/character prompts"
      open={props.open}
      onClose={() => props.onClose(false)}
      className="w-[600px] max-w-[unset]"
    >
      <div className='grid grid-cols-2 gap-4 py-8'>
        {renderCharacters()}
      </div>
    </ModalBase>
  )
}

export default SystemPromptModal