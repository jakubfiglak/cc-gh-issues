import React from 'react';
import { useAuthState } from '../hooks/useAuthState';
import { useRepos } from '../hooks/useRepos';

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
