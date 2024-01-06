import { User } from "@/lib/@types";
import axiosInstance from "@/lib/axios";

interface RefreshToken {
  access: string;
  refresh: string;
}

interface AuthResponse {
  token: string;
  refresh: string;
  user: User
}

export interface SignupPayload extends Omit<User, '_id' | 'is_active' | 'created_at' | 'updated_at' | 'username'> {}
export interface LoginPayload {
  email: string;
  password: string
}

export const login = async (payload: LoginPayload): Promise<AuthResponse | undefined> => {
  try {
    const data = await axiosInstance.post(`/login/`, payload);
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export const verifyToken = async (payload: { token: string }): Promise<any> => {
  try {
    const data = await axiosInstance.post(`/token/verify/`, payload);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const refreshToken = async (payload: { refresh: string }): Promise<RefreshToken | undefined> => {
  try {
    const data = await axiosInstance.post(`/token/refresh/`, payload);
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export const signup = async (payload: SignupPayload): Promise<AuthResponse | undefined> => {
  try {
    const data = await axiosInstance.post(`/signup/`, payload);
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export const getUsers = async (): Promise<User[] | undefined> => {
  try {
    const data = await axiosInstance.get(`/users/`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export const getUserById = async (id: string): Promise<User | undefined> => {
  try {
    const data = await axiosInstance.get(`/users/${id}/`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (payload: any) => {
  try {
    const res = await axiosInstance.post('/users/', payload)
    if (res.status !== 200) {
      // Handle non-2xx responses, e.g., by throwing an error or returning a default value.
      throw new Error(`Request failed with status ${res.status}`);
    }
  } catch (error: any) {
      throw new Error(`Request failed with status ${error.message}`);
  }
};

export const updateUser = async (id: string, payload: any) => {
  try {
    const res = await axiosInstance.post(`/users/${id}/`, payload);
    if (res.status !== 200) {
      // Handle non-2xx responses, e.g., by throwing an error or returning a default value.
      throw new Error(`Request failed with status ${res.status}`);
    }
  } catch (error: any) {
      throw new Error(`Request failed with status ${error.message}`);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/users/${id}/`);
    if (res.status !== 200) {
      // Handle non-2xx responses, e.g., by throwing an error or returning a default value.
      throw new Error(`Request failed with status ${res.status}`);
    }
  } catch (error: any) {
    throw new Error(`Request failed with status ${error.message}`);
  }
};
