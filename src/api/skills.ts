import { Skill } from '@/lib/@types';
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

export const getSkills = async (): Promise<Skill[] | undefined> => {
  try {
    const res = await axios.get(`/content-gen/skills/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
