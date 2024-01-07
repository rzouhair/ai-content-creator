import { Output } from "@/lib/@types";
import axios from "@/lib/axios";

const rawApiUrl = `/content-gen`;
const apiUrl = `/content-gen/outputs`;

export const getOutputs = async (): Promise<Output[] | undefined> => {
  try {
    const res = await axios.get(apiUrl);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOutputById = async (id: string): Promise<Output | undefined> => {
  try {
    const res = await axios.get(`${apiUrl}/${id}/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createOutput = async (payload: any) => {
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

export const updateOutput = async (id: string, payload: any) => {
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

export const deleteOutput = async (id: string) => {
  try {
    await axios.delete(`${apiUrl}/${id}/`);
  } catch (error) {
    console.error(error);
  }
};

export const extractTranscript = async (payload: {
  id: string
  raw_text?: boolean
}) => {
  try {
    const res = await axios.post(`${rawApiUrl}/extract/`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const extractTranscriptInfo = async (payload: {
  transcript: string
}) => {
  try {
    const res = await axios.post(`${rawApiUrl}/extract/analyze/`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
