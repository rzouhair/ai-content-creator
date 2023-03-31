import { ChatCompletionResponseMessage, CreateChatCompletionResponse, CreateCompletionResponseUsage } from 'openai'
import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
// @ts-ignore
import { SSE } from 'sse.js'

import { Button, TextInput } from '@tremor/react'

import { Chat, createChat, currentChat as currentChatAtom, newChatAtom, setCurrentChat as setCurrentChatAtom, setNewChatAtom, updateChat as updateChatAtom } from '@/stores/messages'

import openai from '@/lib/openai'
import UserMessage from '@/components/UserMessage'
import AssistantMessage from '@/components/AssistantMessage'
import GrowingTextArea from '@/components/GrowingTextArea'
import MarkdownLi from '@/components/Markdown/MarkdownLi'
import SystemPromptModal from '@/components/Modals/SystemPromptModal'
import ChatSidebar from '@/components/Chat/ChatSidebar'
import { useAtom } from 'jotai'
import ChatAssistantLoading from '@/components/Chat/ChatAssistantLoading'
import LayoutMain from '@/components/Layouts/LayoutMain'
import AppButton from '@/components/App/AppButton'
import AppTextArea from '@/components/App/AppTextArea'
import ChatHeader from '@/components/Chat/ChatHeader'

function ChatPage() {

  const [currentChat] = useAtom(currentChatAtom)
  const [, setCurrentChat] = useAtom(setCurrentChatAtom)
  const [, addNewChat] = useAtom(createChat)
  const [, updateChat] = useAtom(updateChatAtom)
  const [newChat, setNewChat] = useAtom(newChatAtom)
  const [, resetChat] = useAtom(setNewChatAtom)

  const [loadingAnswer, setLoadingAnswer] = useState(false)

  const [defaultSystemPrompt, setSystemPrompt] = useState("You are a standup comedian, you make people laugh with your satire, jokes and humor. You answer everything in a humorous way to cheer the user up. Use satire and make fun of everything the user says in a positive way.")
  const [tokensUsed, setTokens] = useState(0)

  const [systemPromptsOpen, setSystemPromptsOpen] = useState(false)

  const [prompt, setPrompt] = useState<string>('')

  const [messages, setMessages] = useState<ChatCompletionResponseMessage[]>([
    { role: 'system', content: defaultSystemPrompt },
  ])

  const [dummyMessage, setDummyMessage] = useState<HTMLDivElement | null>()

  const scrollDown = () => {
    setTimeout(() => {
      dummyMessage?.scrollIntoView({ behavior: 'smooth' })
    }, 200)
  }

  useEffect(() => {
    setTimeout(() => {
      dummyMessage?.scrollIntoView({ behavior: 'smooth' })
    }, 200)
  }, [dummyMessage, currentChat])
  

  const manageChatCreate = (messages: ChatCompletionResponseMessage[], usage?: CreateCompletionResponseUsage) => {
    console.log({ currentUsage: currentChat?.usage, totalTokens: currentChat?.totalTokens, id: currentChat?.id })
    if (currentChat?.id) {
      updateChat(currentChat?.id, {
        ...currentChat,
        totalTokens: usage?.total_tokens || currentChat.totalTokens,
        usage: currentChat.usage?.concat([usage?.prompt_tokens, usage?.completion_tokens]) || [],
        messages,
      })
      console.log(currentChat.messages[currentChat.messages.length - 1])
    } else {
      setNewChat({
        id: newChat.id,
        title: messages?.[1].content?.substring(0, 50),
        totalTokens: usage?.total_tokens || 0,
        usage: [usage?.prompt_tokens, usage?.completion_tokens] || [],
        messages: messages
      })

      addNewChat()
      resetChat()
    }
  }

  const appendMessages = async (lengthErrorOccurred?: boolean) => {
    const currentUserPrompt: ChatCompletionResponseMessage = {
      role: 'user',
      content: prompt
    }
    const mAppended: ChatCompletionResponseMessage[] = [
      ...(currentChat?.messages || []),
      currentUserPrompt,
    ]
    if (!currentChat?.messages?.find((c) => c.role === 'system')) {
      mAppended.unshift({ role: 'system', content: defaultSystemPrompt })
    }
    const systemPrompt: any = currentChat?.messages?.find((c) => c.role === 'system')
    setMessages(mAppended)

    if (currentChat?.id) {
      updateChat(currentChat?.id, {
        ...currentChat,
        messages: mAppended,
      })
    } else {
      manageChatCreate([
        ...mAppended,
      ])
    }
    scrollDown()

    const url = "https://api.openai.com/v1/chat/completions"
    const data = {
      model: 'gpt-3.5-turbo-0301',
      messages: ((currentChat?.totalTokens && currentChat?.totalTokens >= 4096) || lengthErrorOccurred) ? mAppended.slice(-10).unshift(systemPrompt) : mAppended as any,
      stream: true,
    }
    let source = new SSE(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_API_KEY}`
      },
      method: 'POST',
      payload: JSON.stringify(data)
    })


    let currentIndex: number | null = null
    if (currentIndex === null) {
      currentIndex = currentChat?.messages.length
      const newMessage: ChatCompletionResponseMessage = { role: "assistant", content: "" }
      manageChatCreate([
        ...mAppended,
        newMessage,
      ])
      scrollDown()
      setTimeout(() => {
        console.log({ length: currentChat?.messages.length })
        source.stream()
      }, 1000);
    }
    source.addEventListener("message", (e) => {
      if (e.data === '[DONE]') {
        console.log({ done: e })
        currentIndex = null
        return
      } else {
        if (currentIndex === null) {
          console.log('NULL RETURN')
          return
        }
        const payload = JSON.parse(e.data)
        const text = payload.choices[0].delta?.content
        if (text) {
          // console.log(txt)
          const lastMessage: any = currentChat?.messages[currentChat.messages.length]
          console.log({ lastMessage })
          if (lastMessage) {
            try {
              lastMessage.content += text
            } catch {
              console.log({ text, last: lastMessage?.content })
            }
            /* updateChat(currentChat?.id || '', {
              ...currentChat,
              messages: currentChat?.messages.slice(-1).push(lastMessage) as any,
            }) */

          }
        }
      }
    })
    /* const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0301',
      messages: ((currentChat?.totalTokens && currentChat?.totalTokens >= 4096) || lengthErrorOccurred) ? mAppended.slice(-10).unshift(systemPrompt) : mAppended as any,
      stream: true,
    }, { responseType: 'stream' }) */


    /* const newMessage = response.data.choices[0].message 
    if (newMessage) {
      manageChatCreate([
        ...mAppended,
        newMessage,
      ], response.data.usage)
      scrollDown()
    } */
  }

  const onGenerateTitleClicked = async() => {
    try {
      setLoadingAnswer(true)
      setPrompt('')
      await appendMessages()
    } catch (error: any) {
      const errorCode = error?.response?.data?.error?.code
      if (errorCode === "context_length_exceeded") {
        await appendMessages(true)
      } else {
        console.error(error)
      }
    } finally {
      setLoadingAnswer(false)
    }
  }

  const regeneateResponse = async() => {
    try {
      setLoadingAnswer(true)
      scrollDown()
      if (currentChat?.messages) {
        const response = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo-0301',
          messages: currentChat?.messages,
        })
        const newMessage = response.data.choices[0].message 

        if (newMessage)
          manageChatCreate([
            ...currentChat.messages,
            newMessage,
          ], response.data.usage)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingAnswer(false)
    }

  }

  const renderMessages = () => {
    return currentChat?.messages?.filter(message => message.role !== 'system').map((message, key) => message.role === 'user' ? (
      <UserMessage key={key}>
        <ReactMarkdown className='prose prose-sm text-white'>
            {message.content + ' ' + key}
        </ReactMarkdown>
      </UserMessage>
    ) : (
      <AssistantMessage key={key}>
        <ReactMarkdown
          className='prose prose-sm'
          components={{
            li({ node, className, children }) {
              return <MarkdownLi>
                {children}
              </MarkdownLi>
            },
          }}
          remarkPlugins={[remarkGfm]}
        >
          {message.content}
        </ReactMarkdown>
      </AssistantMessage>
    )) || null
  }

  return (
    <main className='flex items-stretch h-screen max-h-screen'>
      <ChatSidebar />
      <div className='h-screen overflow-auto flex-1'>
        <ChatHeader />
        <div className="max-w-2xl mx-auto px-4 w-full h-screen flex flex-col">
          <div className="flex-1 flex flex-col justify-end">
            <p className="mb-6 text-sm text-gray-400 text-center">
              System:{" "}
              {currentChat?.messages?.find(
                (c: ChatCompletionResponseMessage) => c.role === "system"
              )?.content || defaultSystemPrompt}
            </p>

            <div className="flex flex-col gap-4 mt-4">
              {renderMessages()}
              { loadingAnswer ? <ChatAssistantLoading /> : null }
              <div
                style={{ float: "left", clear: "both" }}
                ref={(el) => {
                  setDummyMessage(el);
                }}
              ></div>
            </div>
          </div>
          <div className="sticky bottom-0 left-0 right-0 py-4 bg-white">
            {!currentChat?.messages?.length || currentChat?.messages?.length <= 0 ? (
              <div className="mb-3 flex items-center justify-center flex-wrap">
                <AppButton onClick={() => setSystemPromptsOpen(true)}>
                  Change system prompt
                </AppButton>
              </div>
            ) : null}

            {currentChat?.messages?.length && currentChat?.messages?.length > 0 ? (
              <div className="mb-3 flex items-center justify-center flex-wrap">
                <AppButton background='pink' prefixIcon='i-tabler-reload' disabled={loadingAnswer} onClick={regeneateResponse}>
                  Regenerate response
                </AppButton>
              </div>
            ) : null}
            <div className="flex items-end gap-4 bg-white">
              <AppTextArea
                id="chat-input-textbox"
                placeholder="Your message here..."
                className='flex-1'
                rows={1}
                value={prompt}
                onSubmit={onGenerateTitleClicked}
                onChange={(e: any) =>
                  e.key !== "Enter" && setPrompt(e.target.value)
                }
              ></AppTextArea>
              <span className="">
                <AppButton
                  disabled={!prompt || prompt === "" || prompt === "\n"}
                  onClick={onGenerateTitleClicked}
                >
                  Submit
                </AppButton>
              </span>
            </div>
          </div>
          <SystemPromptModal
            open={systemPromptsOpen}
            onClose={(closed: boolean, character: any) => {
              if (character?.prompt) {
                setSystemPrompt(character.prompt);
                setMessages([
                  { role: "system", content: character.prompt },
                  ...messages.filter((message) => message.role !== "system"),
                ]);
              }
              setSystemPromptsOpen(false);
            }}
          />
        </div>
      </div>
    </main>
  );
}

ChatPage.getLayout = (page: any) => {
  return <LayoutMain navCollapsed={true}>
    {page}
  </LayoutMain>
}

export default ChatPage