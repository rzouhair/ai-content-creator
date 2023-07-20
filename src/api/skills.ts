import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";

export const executeSkill = async(payload: {
  skill_id: string;
  inputs: any
}) => {
  try {
    const res = await axiosInstance.post('/content-gen/execute/', payload)

    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const getCompletion = async(payload: {
  command: string;
  context: string;
}): Promise<AxiosResponse<any, any> | undefined> => {
  try {
    const data = await axiosInstance.post('/content-gen/completion/', payload)

    return data
  } catch (error) {
    console.error(error)
  }
}