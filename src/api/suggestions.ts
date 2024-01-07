import { Document, PaginatedResponse, Project, Search, Suggestion } from "@/lib/@types";
import axios from "@/lib/axios";


const apiUrl = `/keyword-research/suggestions/`;

export const getSuggestions = async (params?: Record<string, any>): Promise<PaginatedResponse<Suggestion[]> | undefined> => {
  try {
    const res = await axios.get(apiUrl, {
      params: params || {},
    });
    console.log({
      res
    })
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSuggestionById = async (id: string): Promise<Suggestion | undefined> => {
  try {
    const res = await axios.get(`${apiUrl}/${id}/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSuggestionSearch = async (id: string): Promise<Search | undefined> => {
  try {
    const res = await axios.get(`${apiUrl}/${id}/search`);
    return res.data as Search;
  } catch (error) {
    console.error(error);
  }
};

export const createSuggestion = async (payload: any) => {
  try {
    const res = await axios.post(apiUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSuggestion = async (id: string, payload: any) => {
  try {
    const res = await axios.post(`${apiUrl}/${id}/`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSuggestion = async (id: string) => {
  try {
    await axios.delete(`${apiUrl}${id}/`);
  } catch (error) {
    console.error(error);
  }
};