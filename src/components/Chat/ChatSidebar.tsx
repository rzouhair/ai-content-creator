import { Chat, chatsAtom, setCurrentChat as setChat, currentChat as currentChatAtom } from "@/stores/messages";
import { useAtom } from "jotai";
import { ChatCompletionResponseMessage } from "openai";
import React from "react";
import ChatItem from "./ChatItem";

function ChatSidebar() {

  const [chats] = useAtom(chatsAtom)
  const [, setCurrentChat] = useAtom(setChat)
  const [currentChat] = useAtom(currentChatAtom)

  const renderChats = () => chats?.length ? chats?.map((chat: Chat) => (
    <ChatItem
      key={chat.id}
      chat={chat}
      selected={currentChat?.id === chat.id}
      onClick={() => setCurrentChat(chat.id)}
    />
  )) : <p className="prose-sm text-gray-300 w-full text-center">No chats available</p>

  return (
    <div className="hidden lg:flex lg:w-80 lg:flex-col">
      <div className="flex min-h-0 flex-1 flex-col dark:bg-gray-800">
        <div
          id="navbar"
          className="flex flex-1 flex-col overflow-y-auto pb-4"
        >
          <nav className="flex-1 space-y-2 dark:bg-gray-800 bg-gray-50">
            <div className="px-2 space-y-2 sticky top-0 dark:bg-gray-800 py-2 border-b bg-white border-gray-200 dark:border-b-0">
              <div className="flex items-center justify-center space-x-2">
                <button
                  className="dark:bg-gray-600 dark:text-white hover:bg-gray-200 bg-gray-100 group flex items-center justify-center rounded-md px-2 py-2 text-sm font-medium w-full dark:hover:bg-gray-500 transition-all"
                  onClick={() => setCurrentChat(undefined)}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="text-gray-300 mr-2 h-6 w-6 flex-shrink-0"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  New Chat
                </button>
              </div>
              {/* <div className="relative">
                <input
                  type="text"
                  placeholder="Search chats..."
                  className="bg-gray-700 text-white px-2 py-1 rounded-md w-full"
                  value=""
                  defaultValue={""}
                />
              </div> */}
            </div>
            {renderChats()}
          </nav>
        </div>
        <div className="flex flex-col flex-shrink-0 dark:bg-gray-700 p-3 justify-center space-y-1">
          <div className="flex items-center justify-center">
            <div className="mb-2 grid grid-cols-2 gap-2">
              <div className="text-xs text-white font-semibold flex items-center justify-end">
                OpenAI API Key
              </div>
              <div className="flex items-center relative">
                <div className="">
                  <button className="bg-gray-600 text-white group flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium w-full hover:bg-gray-500 transition-all">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      className="text-green-500 mr-2 h-4 w-4 flex-shrink-0"
                      aria-hidden="true"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
                    </svg>
                    <span className="font-mono"> (***38RU)</span>
                  </button>
                </div>
                <button className="flex items-center justify-center absolute left-full ml-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </button>
              </div>
            </div>
          </div>
          <div className="  border-t border-gray-500 py-1"></div>
          <div className=" text-xs text-gray-400 font-semibold text-center">
            <a href="https://typingmind.com" className="">
              ZRouika
            </a>{" "}
            © 2023
          </div>
          {/* <div className=" text-xs text-gray-400 text-center">
            <a
              href="/privacy"
              target="_blank"
              className=" hover:underline"
            >
              Privacy
            </a>{" "}
            |{" "}
            <a
              href="/terms"
              target="_blank"
              className=" hover:underline"
            >
              Terms
            </a>{" "}
            |{" "}
            <a
              href="/faqs"
              target="_blank"
              className=" hover:underline"
            >
              FAQs
            </a>{" "}
            |{" "}
            <a
              target="_blank"
              href="https://twitter.com/tdinh_me"
              className=""
            >
              <u className="">@tdinh_me</u>
            </a>
          </div> */}
          <div className="text-center flex items-center justify-center">
            <button
              type="button"
              className="bg-gray-600 text-white group flex items-center justify-center rounded-md px-2 py-1 text-xs hover:bg-gray-500 transition-all space-x-2 mr-2"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSidebar;
