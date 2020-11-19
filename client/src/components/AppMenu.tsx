import React, { useState, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import {
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

export const AppMenu = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        aria-controls="app-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="app-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <NavLink
            exact
            to="/"
            className={classes.link}
            activeClassName={classes.isActive}
          >
            Home
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink
            to="/repos"
            className={classes.link}
            activeClassName={classes.isActive}
          >
            Repos
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink
            to="/transfer"
            className={classes.link}
            activeClassName={classes.isActive}
          >
            Transfer Issues
          </NavLink>
        </MenuItem>
      </Menu>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary,
      textTransform: 'uppercase',
      width: '100%',
      padding: theme.spacing(1),
    },
    isActive: {
      fontWeight: 'bold',
    },
  })
);
