import { Project, Skill } from "@/lib/@types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const projects = atom<Project[]>([])

export const activeProject = atomWithStorage<Project | null>('SELECTED_PROJECT', null)

export const setProjects = atom(null, (get, set, _projects: Project[]) => {
  set(projects, _projects)
})

export const setActiveProject = atom(null, (get, set, _project: Project) => {
  set(activeProject, _project)
})
