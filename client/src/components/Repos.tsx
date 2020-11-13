import React from 'react';
import { useQuery } from 'react-query';
import { axiosJson } from '../config/axios';
import { useAuthState } from '../hooks/useAuthState';
import { useRepos } from '../hooks/useRepos';
import { Repo } from '../types/repos';

const getRepos = async (_: string, url: string) => {
  const res = await axiosJson.get(url);
  return res.data;
};

export const Repos = () => {
  const { user } = useAuthState();

  const url = user?.repos_url;

  const { isLoading, error, data } = useRepos(url!);

  if (isLoading) {
    return <div>Repos loading...</div>;
  }

  if (error) {
    return <div>Ups, something went wrong when fetching repos - {error}</div>;
  }

  return (
    <div>
      <ul>{data && data.map((repo) => <ul key={repo.id}>{repo.name}</ul>)}</ul>
    </div>
  );
};
