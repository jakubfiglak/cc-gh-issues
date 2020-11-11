export type User = {
  login: string;
  id: string;
  avatar_url: string;
  url: string;
  repos_url: string;
  public_repos: number;
  total_private_repos: number;
  owned_private_repos: number;
};

export type State = {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  loadUser: () => void;
  authenticate: (code: string) => void;
  setLoading: () => void;
  clearErrors: () => void;
  logout: () => void;
};

export type Action =
  | { type: 'USER_LOADED'; payload: User }
  | { type: 'AUTH_SUCCESS'; payload: string }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SET_LOADING' }
  | { type: 'LOGOUT' };
