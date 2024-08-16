import { PaginatedResponse, Skill } from '@/lib/@types';
import axios from '@/lib/axios';

export const executeSkill = async (payload: {
  skill_id: string;
  inputs: any;
}) => {
  try {
    const res = await axios.post(`/content-gen/execute/`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCompletion = async (payload: {
  command: string;
  context: string;
}): Promise<any | undefined> => {
  try {
    const res = await axios.post(`/content-gen/completion/`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSkillOutputs = async (skillId: string): Promise<any | undefined> => {
  try {
    const res = await axios.get(`/content-gen/skills/${skillId}/outputs/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSkills = async (params: any = {}): Promise<PaginatedResponse<Skill[]> | undefined> => {
  try {
    const res = await axios.get(`/content-gen/skills/`, {
      params,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createSkill = async (payload: Skill): Promise<Skill | undefined> => {
  try {
    const res = await axios.post(`/content-gen/skills/`, payload);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

interface UpdateSkillPayload extends Omit<Skill, 'tags'> {
  tags: string[]
}
export const updateSkill = async (id: string, payload: UpdateSkillPayload): Promise<void | undefined> => {
  try {
    const res = await axios.put(`/content-gen/skills/${id}/`, payload);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSkill = async (id: string): Promise<void | undefined> => {
  try {
    const res = await axios.delete(`/content-gen/skills/${id}/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSkillPrompt = async (skillId: string): Promise<{ prompt: string; skill: string, _id: string } | undefined> => {
  try {
    const res = await axios.get(`/content-gen/skills/${skillId}/prompt/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const generateSkillPrompt = async (skillId: string): Promise<{ content: string; usage: any } | undefined> => {
  try {
    const res = await axios.post(`/content-gen/skills/${skillId}/prompt/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const setSkillPrompt = async (skillId: string, data: { prompt: string }): Promise<{ content: string; usage: any } | undefined> => {
  try {
    const res = await axios.put(`/content-gen/skills/${skillId}/prompt/`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
