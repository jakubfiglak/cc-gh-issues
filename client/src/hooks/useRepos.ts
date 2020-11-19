import { useQuery } from 'react-query';
import { axiosJson } from '../config/axios';
import { Repo } from '../types/repos';

interface Response {
  success: boolean;
  message: string;
  data: Repo[];
  count: number;
}

export const useRepos = (url: string, count: number) => {
  return useQuery<Repo[]>('repos', async () => {
    const res = await axiosJson.get<Response>(
      `/github/repos?reposURL=${url}&reposCount=${count}`
    );
    return res.data.data;
  });
};
