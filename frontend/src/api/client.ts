import type {
  UploadResponse,
  DocumentListItem,
  DocumentDetailResponse,
  SearchResponse,
} from "./types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API Error: ${response.statusText}`);
  }
  return response.json();
}

export const api = {
  uploadDocument: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/api/ingest/upload`, {
      method: "POST",
      body: formData,
    });
    return handleResponse<UploadResponse>(response);
  },

  getDocuments: async (): Promise<DocumentListItem[]> => {
    const response = await fetch(`${API_BASE_URL}/api/docs`);
    return handleResponse<DocumentListItem[]>(response);
  },

  getDocumentDetail: async (id: string): Promise<DocumentDetailResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/docs/${id}`);
    return handleResponse<DocumentDetailResponse>(response);
  },

  search: async (
    query: string,
    mode: "keyword" | "semantic" | "hybrid" = "hybrid",
    k: number = 5,
  ): Promise<SearchResponse> => {
    const params = new URLSearchParams({
      q: query,
      mode,
      k: k.toString(),
    });
    const response = await fetch(
      `${API_BASE_URL}/api/search?${params.toString()}`,
    );
    return handleResponse<SearchResponse>(response);
  },
};
