import React, { useState } from "react";
import Image from 'next/image'

const AssistantMessage = (props: any) => {
  const [copied, setCopied] = useState(false)

  const copy = async() => {
    await navigator.clipboard.writeText(props.children.props.children)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500);
  }
  return (
    <div className="group rounded-lg mb-2">
      <div className="flex items-start gap-3 scroll-mt-32 rounded-md pb-2 pt-2 pr-2 group min-h-[52px]">
        <div className="flex flex-col gap-2">
          <Image
            width={36}
            height={36}
            alt="Asistant icon"
            src="/favicon-192x192.png"
            className="rounded-md flex-none w-9 h-9"
          />
          <div className='group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 pointer-events w-9 h-9 bg-gray-200 rounded-md cursor-pointer flex items-center justify-center' onClick={(e) => copy()}>
            <i className={`text-xl ${copied ? 'i-tabler-check' : 'i-tabler-copy'}`}></i>
          </div>
        </div>
        <div className="w-full relative">
          <p className="text-sm text-gray-700 mb-1.5">Assistant</p>
          <div className="prose prose-sm  dark:prose-invert prose-p:my-0 text-sm w-fit bg-gray-100 text-white px-3.5 py-2.5 rounded-lg rounded-tl-none max-w-full overflow-auto highlight-darkblue focus:outline">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantMessage;
