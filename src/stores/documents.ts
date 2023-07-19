import { Document, Project, Skill } from "@/lib/@types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const documentsAtom = atom<Document[]>([])
export const activeDocumentAtom = atom<Document | null>(null)

export const setDocumentsAtom = atom(null, (get, set, _documents: Document[]) => {
  set(documentsAtom, _documents)
})

export const setActiveDocumentAtom = atom(null, (get, set, _documents: Document) => {
  set(activeDocumentAtom, _documents)
})
