import React from 'react';
import { useField } from 'formik';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import { Repo } from '../types/repos';

interface Props {
  name: string;
  label: string;
  repos: Repo[];
}

export const RepoSelect = ({ name, label, repos }: Props) => {
  const [field, meta] = useField(name);

  const { error, touched } = meta;

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        {...field}
        labelId={`${name}-label`}
        id={name}
        label={label}
        error={touched && !!error}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {repos.map((repo) => (
          <MenuItem
            key={repo.id}
            value={repo.issues_url.replace('{/number}', '')}
          >
            {repo.name}
          </MenuItem>
        ))}
      </Select>
      {touched && error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
};
