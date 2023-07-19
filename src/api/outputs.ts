import { Output } from "@/lib/@types";
import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";

export const getOutputs = async(): Promise<Output[] | undefined> => {
  try {
    const res = await axiosInstance.get('/content-gen/outputs/')
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const getOutputById = async(id: string): Promise<Output | undefined> => {
  try {
    const res = await axiosInstance.get(`/content-gen/outputs/${id}/`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const createOutput = async(payload: any) => {
  try {
    await axiosInstance.post(`/content-gen/outputs/`, payload)
  } catch (error) {
    console.error(error)
  }
}

export const updateOutput = async(id: string, payload: any) => {
  try {
    await axiosInstance.post(`/content-gen/outputs/${id}/`, payload)
  } catch (error) {
    console.error(error)
  }
}

export const deleteOutput = async(id: string) => {
  try {
    await axiosInstance.delete(`/content-gen/outputs/${id}/`)
  } catch (error) {
    console.error(error)
  }
}
