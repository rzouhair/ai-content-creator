import { Memory } from "@/lib/@types";
import ax, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const apiUrl = `/content-gen/memories`;
const axios: AxiosInstance = ax.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('rb_access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const getMemories = async (): Promise<Memory[] | undefined> => {
  try {
    const res = await axios.get(apiUrl + '/');
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMemoryById = async (id: string): Promise<Memory | undefined> => {
  try {
    const res = await axios.get(`${apiUrl}/${id}/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createMemory = async (payload: any) => {
  try {
    const res = await axios.post(apiUrl + '/', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateMemory = async (id: string, payload: any) => {
  try {
    const res = await axios.put(`${apiUrl}/${id}/`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteMemory = async (id: string) => {
  try {
    await axios.delete(`${apiUrl}/${id}/`);
  } catch (error) {
    console.error(error);
  }
};
