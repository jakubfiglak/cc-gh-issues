export interface User {
  id: string;
  login: string;
  name: string;
  email: string;
  bio: string;
  avatar_url: string;
  location: string;
  url: string;
  html_url: string;
  repos_url: string;
  public_repos: number;
  total_private_repos: number;
  owned_private_repos: number;
}

export interface State {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  authenticate: (code: string) => void;
  setLoading: () => void;
  clearErrors: () => void;
  logout: () => void;
}

export type Action =
  | { type: 'AUTH_SUCCESS'; payload: { token: string; user: User } }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SET_LOADING' }
  | { type: 'LOGOUT' };
