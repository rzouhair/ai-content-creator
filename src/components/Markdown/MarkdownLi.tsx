import React, { useState } from 'react'

const MarkdownLi = (props: any) => {
  const [copied, setCopied] = useState(false)

  const copy = async() => {
    await navigator.clipboard.writeText(props.children[0] || "")
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500);
  }

  return (
    <li
      className={`hover:bg-gray-200 duration-150 transition-colors cursor-pointer rounded-sm ${copied ? 'bg-green-100 hover:bg-green-200' : ''}`}
      onClick={() => copy()}>
      {props.children}
    </li>
  )
}

export default MarkdownLi