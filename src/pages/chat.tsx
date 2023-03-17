import { ChatCompletionResponseMessage } from 'openai'
import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Button, TextInput } from '@tremor/react'

import { Chat, createChat, currentChat as currentChatAtom, newChatAtom, setCurrentChat as setCurrentChatAtom, setNewChatAtom, updateChat as updateChatAtom } from '@/stores/messages'

import openai from '@/lib/openai'
import UserMessage from '@/components/UserMessage'
import AssistantMessage from '@/components/AssistantMessage'
import GrowingTextArea from '@/components/GrowingTextArea'
import MarkdownLi from '@/components/Markdown/MarkdownLi'
import SystemPromptModal from '@/components/Modals/SystemPromptModal'
import ChatSidebar from '@/components/Layouts/ChatSidebar'
import { useAtom } from 'jotai'
import ChatAssistantLoading from '@/components/Chat/ChatAssistantLoading'

export default function PostRecipePage() {

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
  

  const manageChatCreate = (messages: ChatCompletionResponseMessage[]) => {
    if (currentChat?.id) {
      updateChat(currentChat?.id, {
        ...currentChat,
        messages,
      })
    } else {
      setNewChat({
        id: newChat.id,
        title: messages?.[1].content?.substring(0, 50),
        messages: messages
      })

      addNewChat()
      resetChat()
    }
  }

  const onGenerateTitleClicked = async() => {
    try {
      setLoadingAnswer(true)
      setPrompt('')
      const mAppended: ChatCompletionResponseMessage[] = [
        ...(currentChat?.messages || []),
        {
          role: 'user',
          content: prompt
        }
      ]
      if (!currentChat?.messages?.find((c) => c.role === 'system')) {
        mAppended.unshift({ role: 'system', content: defaultSystemPrompt })
      }
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
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo-0301',
        messages: mAppended,
      })

      const newMessage = response.data.choices[0].message 
      if (newMessage) {
        manageChatCreate([
          ...mAppended,
          newMessage,
        ])
        scrollDown()
        /* if (!currentChat?.id) {
          setNewChat()
        }
        console.log({ newChat })
        setCurrentChat(newChat.id)
        console.log({ currentChat })
        setNewChat()
        console.log({ newChatAfter: newChat }) */
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
          {message.content}
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
    <main>
      <ChatSidebar />
      <div className="pl-80">
        <div className="max-w-2xl mx-auto px-4 w-full h-screen flex flex-col">
          <div className="flex-1 flex flex-col justify-end">
            <p className="mb-6 text-sm text-gray-400 text-center">
              System:{" "}
              {currentChat?.messages.find(
                (c: ChatCompletionResponseMessage) => c.role === "system"
              )?.content || defaultSystemPrompt}
            </p>

            <div>
              <Button
                onClick={() => setSystemPromptsOpen(true)}
                color="fuchsia"
              >
                Change system prompt
              </Button>
            </div>

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
          <div className="sticky bottom-0 left-0 right-0 py-4">
            {messages.length <= 0 ? (
              <div className="mb-3 flex items-center justify-center flex-wrap">
                <Button onClick={() => setSystemPromptsOpen(true)}>
                  Change system prompt
                </Button>
              </div>
            ) : null}
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <div className="relative rounded-md shadow-sm">
                  <GrowingTextArea
                    id="chat-input-textbox"
                    placeholder="Your message here..."
                    spellcheck="false"
                    value={prompt}
                    onChange={(e: any) =>
                      e.key !== "Enter" && setPrompt(e.target.value)
                    }
                    onSubmit={() => {
                      console.log({
                        prompt,
                      });
                      if (!prompt || prompt === "" || prompt === "\n") {
                        return null;
                      } else {
                        onGenerateTitleClicked();
                      }
                    }}
                  ></GrowingTextArea>
                </div>
              </div>
              <span className="">
                <Button
                  disabled={!prompt || prompt === "" || prompt === "\n"}
                  onClick={onGenerateTitleClicked}
                >
                  Submit
                </Button>
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
