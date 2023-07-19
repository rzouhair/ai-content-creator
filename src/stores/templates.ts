import { Skill } from "@/lib/@types";
import { atom } from "jotai";


export const skills = atom<Skill[]>([])

export const setSkills = atom(null, (get, set, _skills: Skill[]) => {
  set(skills, _skills)
})