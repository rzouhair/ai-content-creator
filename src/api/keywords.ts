import { Keywords, PaginatedResponse, Suggestion } from "@/lib/@types";
import axios from "@/lib/axios";

const apiUrl = `/keyword-research/keywords/`;

export const getKeywordsLists = async (): Promise<Keywords[] | undefined> => {
  try {
    const res = await axios.get(apiUrl);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getKeywordsListById = async (id: string): Promise<Keywords | undefined> => {
  try {
    const res = await axios.get(`${apiUrl}${id}/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getKeywordsListSuggestions = async (_id: string, params?: Record<string, any>): Promise<PaginatedResponse<Suggestion[]> | undefined> => {
  try {
    const res = await axios.get(`${apiUrl}${_id}/suggestions/`, {
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

export const clusterKeywordsList = async (id: string, payload: { cluster_count?: number }) => {
  const res = await axios.post(`${apiUrl}${id}/cluster/`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const createKeywordsList = async (payload: any) => {
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

export const updateKeywordsList = async (id: string, payload: any) => {
  try {
    const res = await axios.put(`${apiUrl}${id}/`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteKeywordsList = async (id: string) => {
  try {
    await axios.delete(`${apiUrl}${id}/`);
  } catch (error) {
    console.error(error);
  }
};

export const autocomplete = async (payload: any) => {
  try {
    const res = await axios.post(`/keyword-research/ideation/autocomplete/`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const alphabet_soup = async (payload: any) => {
  try {
    const res = await axios.post(`/keyword-research/ideation/alphabet/`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const query_generation = async (payload: any) => {
  try {
    const res = await axios.post(`/keyword-research/ideation/query/`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
