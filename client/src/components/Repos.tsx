import React from 'react';
import { useQuery } from 'react-query';
import { axiosJson } from '../config/axios';
import { useAuthState } from '../context/auth/useAuthState';
import { Repo } from '../types';

const getRepos = async (_: string, url: string) => {
  const res = await axiosJson.get(url);
  return res.data;
};

export const Repos = () => {
  const { user } = useAuthState();

  const url = user?.repos_url;

  const { isLoading, error, data } = useQuery<Repo[]>(
    ['repoData', url],
    getRepos
  );

  if (isLoading) {
    return <div>Repos loading...</div>;
  }

  if (error) {
    return <div>Ups, something went wrong when fetching repos - {error}</div>;
  }

  return (
    <div>
      <ul>
        {data?.map((repo) => (
          <ul key={repo.id}>{repo.name}</ul>
        ))}
      </ul>
    </div>
  );
};
