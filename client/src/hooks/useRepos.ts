import { useQuery } from 'react-query';
import { axiosJson } from '../config/axios';
import { Repo } from '../types/repos';

export const useRepos = (url: string) => {
  console.log(url);
  return useQuery<Repo[]>('repos', async () => {
    const res = await axiosJson.get(url);
    return res.data;
  });
};
