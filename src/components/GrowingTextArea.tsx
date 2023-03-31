import React, { useState, useEffect } from 'react'

export default function GrowingTextArea(props: any) {

  const [textArea, setTextArea] = useState<HTMLTextAreaElement | null>()

  function auto_grow() {
    if (textArea?.style) {
      textArea.style.height = "5px";
      textArea.style.height = (textArea.scrollHeight)+"px";
    }
  }

  useEffect(() => {
    // auto_grow()
    const startIndex = (props.value as string).indexOf('{{')
    const endIndex = (props.value as string).indexOf('}}')
    textArea?.focus()
    if (startIndex && startIndex >= 0 && endIndex && endIndex >= 0)
      textArea?.setSelectionRange(startIndex, endIndex + 2)
  }, [props.value])
  
  
  return (
    <textarea
      id="chat-prompt-text"
      name="text"
      rows={4}
      style={{ minHeight: '38px' }}
      className={`block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:py-1.5 sm:text-sm sm:leading-6 min-h-[36px] max-h-[500px] resize-none border-light-300 px-2 ${props.loading ? 'pointer-events-none opacity-50' : ''}`}
      ref={(el) => setTextArea(el)}
      value={props.value}
      onInput={(e) => {
        // auto_grow()
        props.onChange(e)
      }}
      onKeyUp={(e) => {
        /* e.preventDefault()
        if (e.key === 'Enter') {
          props.onSubmit()
        } */
      }}
    ></textarea>
  )
}
