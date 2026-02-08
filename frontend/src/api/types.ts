export interface Entity {
  text: string;
  label: string;
}

export interface PageItem {
  page_number: number;
  text: string;
  entities?: Entity[];
}

export interface DocumentListItem {
  id: string;
  filename: string;
  pages_count: number;
  uploaded_at: string;
}

export interface DocumentDetailResponse {
  id: string;
  filename: string;
  pages: PageItem[];
}

export interface UploadResponse {
  message: string;
  document_id: string;
  filename: string;
  pages_count: number;
}

export interface SearchResultItem {
  document_id: string;
  filename: string;
  page_number: number;
  chunk_index: number;
  snippet: string;
  score: number;
}

export interface SearchResponse {
  results: SearchResultItem[];
  total: number;
}
