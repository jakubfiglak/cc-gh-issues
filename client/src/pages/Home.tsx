import React from 'react';

const githubURI =
  'https://github.com/login/oauth/authorize?client_id=560ee4521b0387f7017e';

export const Home = () => {
  return (
    <div>
      <h1>Github Issues Portal</h1>
      <a href={githubURI}>Sign In With Github</a>
    </div>
  );
};
