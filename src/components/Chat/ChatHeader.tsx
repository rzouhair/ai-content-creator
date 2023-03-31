import { useAtom } from "jotai";
import React from "react";
import { currentChat as currentChatAtom } from '@/stores/messages'

function ChatHeader() {
  const [currentChat] = useAtom(currentChatAtom)
  return (
    <div className="hide-when-print sticky top-0 z-30 bg-white backdrop-blur">
      <div className="flex absolute left-1 top-0 bottom-0 items-center justify-center">
        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            ></path>
          </svg>
        </button>
      </div>
      <div className="absolute right-2 top-0 bottom-0 flex items-center justify-center">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 py-2 px-2 space-x-2 text-sm"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            className="h-6 w-6 text-red-500"
            aria-hidden="true"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M160 894c0 17.7 14.3 32 32 32h286V550H160v344zm386 32h286c17.7 0 32-14.3 32-32V550H546v376zm334-616H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v140h366V310h68v172h366V342c0-17.7-14.3-32-32-32zm-402-4h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70 70 31.4 70 70v70zm138 0h-70v-70c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70z"></path>
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-center w-full p-2 border-bottom-2 border-gray-200 shadow-bottom shadow-md shadow-light-100 flex-col min-w-0">
        <div className="font-semibold truncate w-full text-center px-12 text-black">
          {currentChat?.title || 'New chat'}
        </div>
        <div className="text-xs text-gray-400 w-full truncate text-center px-16 space-x-1">
          <span className="shrink-0">GPT-3.5</span>
          <span className="hidden sm:inline-block">- {currentChat?.totalTokens || 0} tokens -</span>
          <span className="hidden sm:inline-block">{currentChat?.messages.length} messages</span>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
