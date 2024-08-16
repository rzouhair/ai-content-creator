export interface Keywords {
  _id: string;
  title?: string;
  suggestions?: Suggestion[] | null
  saved_cluster?: Cluster[] | null
  embeddings: {
    keyword: string
    embedding: number[]
  }[]
  created_at: string;
}

export interface Suggestion {
  _id: string;
  parent_keyword: string;
  search_query: string;
  status: 'CREATED' | 'IN_PROGRESS' | 'ANALYZED';
  metadata: {
    modifier?: string
  }
  created_at: string;
}

export interface Search {
  _id: string;
  related_suggestion_id: string;
  serps: any;
  questions: any;
  created_at: string
}

export interface Article {
  _id: string;
  title: string;
  meta_description: string;
  article_content: any;
  related_search_id: any;
  created_at: string
}

export interface Tag {
  _id: string;
  name: string;
}

export interface InputSchema {
  id: string;
  type: string;
  label: string;
  required: boolean;
  default?: string
  placeholder: string;
}

export interface Skill {
  _id: string;
  name: string;
  description: string;
  hidden: boolean;
  beta: boolean;
  icon: string;
  emoji: string;
  tags: Tag[];
  input_schema: InputSchema[];
  examples?: string;
  created_at: string;
  updated_at: string;
}

export interface Output {
  _id: string;
  text: string;
  usage: {
    total_tokens: number;
  }
  completionId?: string | null
  outputWordCount: number
  skill: Skill
  payload: any
  created_at: string;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  groups: (number | string)[]
  is_admin: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export enum MEMORY_TYPES {
  TEXT= "TEXT",
  YTB= "YTB",
  FILE= "FILE",
}

export enum MEMORY_STATUS_TYPES {
  CREATED = "CREATED",
  PROCESSING = "PROCESSING",
  PROCESSED = "PROCESSED",
  ERROR = "ERROR"
}
export interface Memory {
  _id: string;
  name: string;
  type: MEMORY_TYPES;
  status: MEMORY_STATUS_TYPES;
  metadata: any
  user: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  _id: string;
  name: string;
  content: string;
  delta: any;
  isPublic: boolean;
  status: string;
  suggestion: Suggestion | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationInfo {
  page: number
  pageSize: number
  pageCount: number
  itemCount: number | undefined
}

export interface PaginatedResponse<T> {
  page: number;
  page_size: number;
  page_count: number;
  items_count: number;
  data: T
}

export interface Cluster {
  keywords: string[];
  parent_keyword: string
}
