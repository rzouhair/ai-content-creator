import React, { Component, Suspense, useEffect, useState } from 'react';
import { EditorProps } from 'react-draft-wysiwyg'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic'

const DynamicEditor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)

function Editor() {

  const [editor, setEditor] = useState(<p>Loading...</p>)

  useEffect(() => {
    setEditor(<DynamicEditor
      toolbar={{
        options: ['blockType', 'list', 'inline', 'link'],
        inline: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
        },
        blockType: {
          inDropdown: false,
          options: ['H1', 'H2', 'H3', 'Blockquote', 'Code'],
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
        },
        list: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ['unordered', 'ordered', 'indent', 'outdent'],
        },
        link: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          dropdownClassName: undefined,
          showOpenOptionOnHover: true,
          defaultTargetOption: '_self',
          options: ['link', 'unlink'],
          linkCallback: undefined
        },
      }}
    />)
  }, [])

  return (
    <div className='w-full'>
      { editor }
    </div>
  )
}

export default Editor