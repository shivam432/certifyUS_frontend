import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import Logo from 'src/components/Logo';
import Name from 'src/components/Name';
const useStyles = makeStyles(({
  root: {},
  toolbar: {
    height: 64
  },
  name: {
    fontSize: 50,
  }
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
        </RouterLink>
        <Name className={classes.name} />
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;

