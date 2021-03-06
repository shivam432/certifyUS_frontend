import React, { useEffect , useState} from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  Award,
  User as UserIcon,
  LogOut as LogOutIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import jwt_decode from "jwt-decode";

var decoded;

const items = [
  {
    href: '/customer/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/customer/certificatesEarned',
    icon: Award,
    title: 'Cerificates Earned'
  },
  {
    href: '/customer/account',
    icon: UserIcon,
    title: 'Manage Account'
  },
  // {
  //   href: '/customer/settings',
  //   icon: LogOutIcon,
  //   title: 'Logout'
  // },
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  // {
  //   href: '',
  //   icon: UserIcon,
  //   title: 'User Accounts'
  // }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [ user, setuser] = useState(0);

  useEffect(() => {
    if(localStorage.getItem('token')!=null)
    {
    decoded = jwt_decode(localStorage.getItem('token'));
    }
    fetch('http://localhost:5000/customer/'+decoded.email)
    .then(resp => resp.json())
    .then(data => data.map((info)=>{
      console.log(info.name);
        setuser( {
        avatar: 'http://localhost:5000/'+info.image,
        jobTitle: 'Customer',
        name: info.name
      });
    }))
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1}/>
      <Box
        p={2}
        m={2}
        bgcolor="background.dark"
      >
        {/* <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Need more?
        </Typography> */}
        {/* <Typography
          align="center"
          variant="body2"
        >
          Upgrade to PRO version and access 20 more screens
        </Typography> */}
        {/* <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          <Button
            color="primary"
            component="a"
            href="https://react-material-kit.devias.io"
            variant="contained"
          >
            See PRO version
          </Button>
        </Box> */}
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
