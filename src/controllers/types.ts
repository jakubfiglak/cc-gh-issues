export interface AuthRequest {
  code: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface Issue {
  id: number;
  url: string;
  title: string;
  body: string;
}

export interface Repo {
  id: number;
  name: string;
  description: string;
  url: string;
  html_url: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  open_issues: number;
  open_issues_count: number;
}

export interface GetReposResponse {
  success: boolean;
  message: string;
  data: Repo[];
  count: number;
}

export interface TransferRequest {
  baseRepoURL: string;
  targetRepoURL: string;
}

export interface TransferResponse {
  success: boolean;
  message: string;
}
