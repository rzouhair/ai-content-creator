import { Keywords } from "@/lib/@types";
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

export const clusterKeywordsList = async (id: string, payload: { cluster_count: number }) => {
  try {
    const res = await axios.post(`${apiUrl}${id}/cluster`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
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
