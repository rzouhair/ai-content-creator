export interface Keywords {
  _id: string;
  title?: string;
  suggestion?: string | null
  saved_cluster?: {
    keywords: string[];
    parent_keyword: string
  }[] | null
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
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
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