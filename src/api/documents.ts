import { Document } from "@/lib/@types";

const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/content-gen/documents/`;

export const getDocuments = async (project?: string): Promise<Document[] | undefined> => {
  try {
    const params = new URLSearchParams(project ? { project } : {});
    const res = await fetch(`${apiUrl}?${params.toString()}`);
    if (!res.ok) {
      // Handle non-2xx responses, e.g., by throwing an error or returning a default value.
      throw new Error(`Request failed with status ${res.status}`);
    }
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error(error);
  }
};

export const getDocumentById = async (id: string): Promise<Document | undefined> => {
  try {
    const res = await fetch(`${apiUrl}${id}/`);
    if (!res.ok) {
      // Handle non-2xx responses, e.g., by throwing an error or returning a default value.
      throw new Error(`Request failed with status ${res.status}`);
    }
    const data = await res.json();
    return data;
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
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      // Handle non-2xx responses, e.g., by throwing an error or returning a default value.
      throw new Error(`Request failed with status ${res.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateDocument = async (id: string, payload: any) => {
  try {
    const res = await fetch(`${apiUrl}${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      // Handle non-2xx responses, e.g., by throwing an error or returning a default value.
      throw new Error(`Request failed with status ${res.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteDocument = async (id: string) => {
  try {
    const res = await fetch(`${apiUrl}${id}/`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      // Handle non-2xx responses, e.g., by throwing an error or returning a default value.
      throw new Error(`Request failed with status ${res.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};
