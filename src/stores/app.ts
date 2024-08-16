import { User, Project } from "@/lib/@types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const loggedInUser = atom<User | null>(null)

export const setUsersAtom = atom(null, (get, set, _user: User) => {
  set(loggedInUser, _user)
})

export const projects = atom<Project[]>([])

export const activeProject = atomWithStorage<Project | null>('SELECTED_PROJECT', null)

export const setProjects = atom(null, (get, set, _projects: Project[]) => {
  set(projects, _projects)
})

export const setActiveProject = atom(null, (get, set, _project: Project) => {
  set(activeProject, _project)
})
