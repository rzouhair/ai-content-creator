import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { ChatCompletionResponseMessage } from 'openai';
// @ts-ignore
import * as uuid from 'uuid'

export interface Chat {
  id: string;
  title: string;
  description?: string;
  totalTokens?: number;
  usage?: any,
  messages: ChatCompletionResponseMessage[]
}

const removeChat = (chats: Chat[], id: string): Chat[] => chats.filter((c: Chat) => c.id !== id)

const addChat = (chats: Chat[], newChat: Chat): Chat[] => [
  ...chats,
  newChat,
]

export const newChatAtom = atom<Chat>({
  id: uuid.v4(),
  title: '',
  description: '',
  usage: [],
  totalTokens: 0,
  messages: []
})

export const setNewChatAtom = atom(
  null,
  (get, set) => {
    set(newChatAtom, {
      id: uuid.v4(),
      title: '',
      description: '',
      usage: [],
      totalTokens: 0,
      messages: []
    })
  }
)

export const chatsAtom = atomWithStorage<Chat[]>('GPT_Chats', [])
export const createChat = atom(
  null,
  (get, set) => {
    if (get(currentChat)?.id !== get(newChatAtom).id) {
      set(chatsAtom, addChat(get(chatsAtom), get(newChatAtom)))
    }
    else {
      set(chatsAtom, get(chatsAtom).map((c: Chat) => {
        if (c.id === get(currentChat)?.id) {
          return get(currentChat) || c
        } else {
          return c
        }
      }))

      set(currentChat, get(currentChat))
    }

    if (get(newChatAtom)?.id)
      set(currentChat, get(newChatAtom))
  }
)
export const updateChat = atom(
  null,
  (get, set, id: string, chat: Chat) => {
    set(chatsAtom, get(chatsAtom).map((c: Chat) => {
      if (c.id === id) {
        return chat
      } else {
        return c
      }
    }))

    set(currentChat, () => {
      if (!id)
        return null
      
      return get(chatsAtom).find((chat) => chat.id === id) || null
    })
  }
)
export const deleteChatAtom = atom(
  null,
  (get, set, id: string) => {
    if (id === get(currentChat)?.id)
      set(currentChat, null)
    set(chatsAtom, removeChat(get(chatsAtom), id))
  }
)

export const currentChat = atomWithStorage<Chat | null>('GPT_Active_Chat', null)
export const setCurrentChat = atom(
  null,
  (get, set, id?: string) => {
    set(currentChat, () => {
      if (!id)
        return null
      
      return get(chatsAtom).find((chat) => chat.id === id) || null
    })
  }
)