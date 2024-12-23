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

export const humanizeText = async (payload: {
  content: string,
}) => {
  try {
    const res = await axios.post(`${rawApiUrl}/humanize/`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data.output;
  } catch (error) {
    console.error(error);
  }
};

export const generateImages = async (payload: {
  prompt: string,
  options: {
    model: 'V_1' | 'V_2',
    aspect_ratio: 'ASPECT_1_1' | 'ASPECT_4_3' | 'ASPECT_16_9' | 'ASPECT_9_16',
    magic_prompt_option: 'ON' | 'OFF' | 'AUTO'
  },
  number_of_images: number
}) => {
  try {
    const res = await axios.post(`${rawApiUrl}/generate_image/`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data.images;
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
