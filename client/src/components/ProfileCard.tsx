import React from 'react';
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  Link,
} from '@material-ui/core';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import { User } from '../types/auth';

type Props = {
  user: User;
};

export const ProfileCard = ({ user }: Props) => {
  const classes = useStyles();

  const { name, login, avatar_url, bio, url } = user;

  const firstName = name.split(' ')[0];
  const lastName = name.split(' ')[1];

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            className={classes.avatar}
          >{`${firstName[0]}${lastName[0]}`}</Avatar>
        }
        title={name}
        subheader={login}
      />
      <CardMedia image={avatar_url} title={name} className={classes.media} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {bio}
        </Typography>
        <div className={classes.link}>
          <GitHubIcon />
          <Typography variant="body2">
            <Link href={url}>Github Profile</Link>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      backgroundPosition: 'center top',
    },
    avatar: {
      background: theme.palette.secondary.light,
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(2),
      gap: `${theme.spacing(1)}px`,
    },
  })
);
