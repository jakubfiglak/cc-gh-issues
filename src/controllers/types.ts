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

export interface TransferRequest {
  baseRepoURL: string;
  targetRepoURL: string;
}

export interface TransferResponse {
  success: boolean;
  message: string;
}
