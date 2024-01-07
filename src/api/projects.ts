import { Project } from "@/lib/@types";
import axios from "@/lib/axios";

const apiUrl = `/content-gen/projects/`;

export const getProjects = async (): Promise<Project[] | undefined> => {
  try {
    const res = await axios.get(apiUrl);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectById = async (id: string): Promise<Project | undefined> => {
  try {
    const res = await axios.get(`${apiUrl}/${id}/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createProject = async (payload: any) => {
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

export const updateProject = async (id: string, payload: any) => {
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

export const deleteProject = async (id: string) => {
  try {
    await axios.delete(`${apiUrl}/${id}/`);
  } catch (error) {
    console.error(error);
  }
};
