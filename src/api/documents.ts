import { Document } from "@/lib/@types";
import axiosInstance from "@/lib/axios";

const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/content-gen/documents/`;

export const getDocuments = async (project?: string): Promise<Document[] | undefined> => {
  try {
    const params = new URLSearchParams(project ? { project } : {});
    const res = await axiosInstance.get(`${apiUrl}?${params.toString()}`);
    return res.data || [];
  } catch (error) {
    console.error(error);
  }
};

export const getDocumentById = async (id: string): Promise<Document | undefined> => {
  try {
    const res = await axiosInstance.get(`${apiUrl}${id}/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createDocument = async (payload: {
  content: string;
  delta?: object;
  name: string;
  status: string;
  project: string;
}) => {
  try {
    const res = await axiosInstance.post(apiUrl, payload);
    return res.data
  } catch (error) {
    console.error(error);
  }
};

export const updateDocument = async (id: string, payload: any) => {
  try {
    const res = await axiosInstance.put(`${apiUrl}${id}/`, payload);
    return res.data
  } catch (error) {
    console.error(error);
  }
};

export const deleteDocument = async (id: string) => {
  try {
    await axiosInstance.delete(`${apiUrl}${id}/`);
  } catch (error) {
    console.error(error);
  }
};
