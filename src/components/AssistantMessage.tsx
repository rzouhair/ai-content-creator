import React from "react";
import Image from 'next/image'

const AssistantMessage = (props: any) => {
  return (
    <div className="rounded-lg mb-2">
      <div className="relative response-block flex items-start gap-3 scroll-mt-32 rounded-md pb-2 pt-2 pr-2 group min-h-[52px]">
        <div className="w-9 h-9">
          <Image
            width={36}
            height={36}
            alt="Asistant icon"
            src="/favicon-192x192.png"
            className="rounded-md flex-none"
          />
        </div>
        <div className="w-full">
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
