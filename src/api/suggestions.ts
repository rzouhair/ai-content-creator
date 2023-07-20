import { Document, Project, Search, Suggestion } from "@/lib/@types";

const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/keyword-research/suggestions/`;

export const getSuggestions = async (): Promise<Suggestion[] | undefined> => {
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

export const getSuggestionById = async (id: string): Promise<Suggestion | undefined> => {
  try {
    const res = await fetch(`${apiUrl}/${id}/`);
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

export const getSuggestionSearch = async (id: string): Promise<Search | undefined> => {
  try {
    const res = await fetch(`${apiUrl}/${id}/search`);
    if (!res.ok) {
      // Handle non-2xx responses, e.g., by throwing an error or returning a default value.
      throw new Error(`Request failed with status ${res.status}`);
    }
    const data = await res.json();
    return data as Search;
  } catch (error) {
    console.error(error);
  }
};

export const createSuggestion = async (payload: any) => {
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

export const updateSuggestion = async (id: string, payload: any) => {
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

export const deleteSuggestion = async (id: string) => {
  try {
    const res = await fetch(`${apiUrl}/${id}/`, {
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
