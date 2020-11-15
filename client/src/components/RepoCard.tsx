import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  Link,
} from '@material-ui/core';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import { Repo } from '../types/repos';

interface Props {
  repo: Repo;
}

export const RepoCard = ({ repo }: Props) => {
  const classes = useStyles();

  const { name, description, html_url } = repo;

  return (
    <Card className={classes.root}>
      <CardHeader title={name} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description ? description : 'No description provided'}
        </Typography>
        <div className={classes.link}>
          <GitHubIcon />
          <Typography variant="body2">
            <Link href={html_url} target="_blank" rel="noopener noreferrer">
              See the repo
            </Link>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 345,
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(2),
      gap: `${theme.spacing(1)}px`,
    },
  })
);
