import { useAuthState } from './useAuthState';

export const useAuthenticatedUser = () => {
  const { user } = useAuthState();
  return user!;
};
