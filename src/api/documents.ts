import { Document } from "@/lib/@types";
import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";

export const getDocuments = async(project?: string): Promise<Document[] | undefined> => {
  try {
    const res = await axiosInstance.get('/content-gen/documents/', {
      params: {
        ...(project ? { project } : {})
      }
    })
    return res?.data || []
  } catch (error) {
    console.error(error)
  }
}

export const getDocumentById = async(id: string): Promise<Document | undefined> => {
  try {
    const res = await axiosInstance.get(`/content-gen/documents/${id}/`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const createDocument = async(payload: {
  content: string
  delta?: object
  name: string;
  status: string;
  project: string;
}) => {
  try {
    await axiosInstance.post(`/content-gen/documents/`, payload)
  } catch (error) {
    console.error(error)
  }
}

export const updateDocument = async(id: string, payload: any) => {
  try {
    await axiosInstance.put(`/content-gen/documents/${id}/`, payload)
  } catch (error) {
    console.error(error)
  }
}

export const deleteDocument = async(id: string) => {
  try {
    await axiosInstance.delete(`/content-gen/documents/${id}/`)
  } catch (error) {
    console.error(error)
  }
}
