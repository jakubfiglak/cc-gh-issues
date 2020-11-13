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

type Props = {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  url: string;
};

export const ProfileCard = ({ name, login, avatar_url, bio, url }: Props) => {
  const classes = useStyles();

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
        <Typography variant="body2">
          <Link href={url}>Github Profile</Link>
        </Typography>
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
  })
);
