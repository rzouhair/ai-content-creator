import React, { useState } from 'react'
import { Editor } from '@tiptap/react';
import AppInput from './AppInput';
import AppCheckbox from './AppCheckbox';
import { Button } from '@/components/ui/button';

function AppEditorMenuBar({ editor }: { editor: Editor | null }) {
  const [showAnchor, setShowAnchor] = useState(false)
  const [link, setLink] = useState<string>('')
  const [blank, setBlank] = useState<boolean>(false)

  const insertLink = () => {
    if (!link)
      return
    editor?.chain().focus().setLink({
      href: link,
      target: blank ? '_blank' : null,
    }).run()
    clearLinkFields()
    setShowAnchor(false)
  }

  const clearLinkFields = () => {
    setBlank(false)
    setLink('')
  }

  if (!editor) {
    return null
  }

  return (
    <div>
      <div className='ProseMirror prose-xl flex items-center flex-wrap gap-3 px-4 py-1 border border-gray-500 border-b-0 rounded-t-md'>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
          className={`${!editor.can().chain().focus().undo().run() && 'opacity-40'}`}
        >
          <i className="i-tabler-arrow-left"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={`${!editor.can().chain().focus().redo().run() && 'opacity-40'}`}
        >
          <i className="i-tabler-arrow-right"></i>
        </button>

          <div>
            <i className='i-tabler-minus-vertical opacity-30'></i>
          </div>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          <i className='i-tabler-h-1'></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          <i className='i-tabler-h-2'></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          <i className='i-tabler-h-3'></i>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <i className='i-tabler-code'></i>
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          <i className='i-tabler-pilcrow'></i>
        </button>
          <div>
            <i className='i-tabler-minus-vertical opacity-30'></i>
          </div>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <i className='i-tabler-bold'></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <i className='i-tabler-italic'></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <i className='i-tabler-strikethrough'></i>
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <i className="i-tabler-clear-formatting"></i>
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          <i className="i-tabler-clear-all"></i>
        </button>

        <i className='i-tabler-minus-vertical opacity-30'></i>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <i className='i-tabler-list'></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <i className='i-tabler-list-numbers'></i>
        </button>
        <i className='i-tabler-minus-vertical opacity-30'></i>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <i className='i-tabler-code-dots'></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <i className='i-tabler-quote'></i>
        </button>
        <button
          onClick={() => {
            setShowAnchor(!showAnchor)
            if (!showAnchor)
              clearLinkFields()
          }}
        >
          <i className="i-tabler-link"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          <i className="i-tabler-unlink"></i>
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <i className="i-tabler-arrow-bar-down"></i>
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          <i className='i-tabler-arrow-back'></i>
        </button>
      </div>
      {
        showAnchor &&
        <div className='flex flex-col gap-2 py-4 px-2 border-x border-gray-900 w-full mx-auto'>
          <AppInput type="text" wrapperClassName='!w-full' value={link} placeholder="Insert you link here" onChange={(e) => setLink(e.target.value)} />
          <AppCheckbox id="target-blank" checked={blank} onChange={(e) => setBlank(e.target.checked)}>
            Target blank
          </AppCheckbox>
          <Button onClick={insertLink}>Insert</Button>
        </div>
      }
    </div>
  )
}

export default AppEditorMenuBar