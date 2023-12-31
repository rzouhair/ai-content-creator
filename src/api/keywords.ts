import { Keywords } from "@/lib/@types";

const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/keyword-research/keywords/`;

export const getKeywordsLists = async (): Promise<Keywords[] | undefined> => {
  try {
    const res = await fetch(apiUrl);
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

export const getKeywordsListById = async (id: string): Promise<Keywords | undefined> => {
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

export const clusterKeywordsList = async (id: string, payload: { cluster_count: number }) => {
  try {
    const res = await fetch(`${apiUrl}${id}/cluster`, {
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

    return await res.json()
  } catch (error) {
    console.error(error);
  }
};

export const createKeywordsList = async (payload: any) => {
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

export const updateKeywordsList = async (id: string, payload: any) => {
  try {
    const res = await fetch(`${apiUrl}/${id}/`, {
      method: 'POST', // Change this to 'PUT' if the API requires a PUT request for updates
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

export const deleteKeywordsList = async (id: string) => {
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
