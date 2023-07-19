import { Document, Project, Search, Suggestion } from "@/lib/@types";
import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";

export const getSuggestions = async(): Promise<Suggestion[] | undefined> => {
  try {
    const res = await axiosInstance.get('/keyword-research/suggestions/')
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const getSuggestionById = async(id: string): Promise<Suggestion | undefined> => {
  try {
    const res = await axiosInstance.get(`/keyword-research/suggestions/${id}/`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const getSuggestionSearch = async(id: string): Promise<Search | undefined> => {
  try {
    const res = await axiosInstance.get(`/keyword-research/suggestions/${id}/search`)
    return res.data as Search
  } catch (error) {
    console.error(error)
  }
}

export const createSuggestion = async(payload: any) => {
  try {
    await axiosInstance.post(`/keyword-research/suggestions/`, payload)
  } catch (error) {
    console.error(error)
  }
}

export const updateSuggestion = async(id: string, payload: any) => {
  try {
    await axiosInstance.post(`/keyword-research/suggestions/${id}/`, payload)
  } catch (error) {
    console.error(error)
  }
}

export const deleteSuggestion = async(id: string) => {
  try {
    await axiosInstance.delete(`/keyword-research/suggestions/${id}/`)
  } catch (error) {
    console.error(error)
  }
}
