import { Document, Project } from "@/lib/@types";
import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";

export const getProjects = async (): Promise<Project[] | undefined> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/content-gen/projects/`);
    if (!res.ok) {
      // Handle non-2xx responses, e.g., by throwing an error or returning a default value.
      throw new Error(`Request failed with status ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getProjectById = async(id: string): Promise<Project | undefined> => {
  try {
    const res = await axiosInstance.get(`/content-gen/projects/${id}/`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const createProject = async(payload: any) => {
  try {
    await axiosInstance.post(`/content-gen/projects/`, payload)
  } catch (error) {
    console.error(error)
  }
}

export const updateProject = async(id: string, payload: any) => {
  try {
    await axiosInstance.post(`/content-gen/projects/${id}/`, payload)
  } catch (error) {
    console.error(error)
  }
}

export const deleteProject = async(id: string) => {
  try {
    await axiosInstance.delete(`/content-gen/projects/${id}/`)
  } catch (error) {
    console.error(error)
  }
}
