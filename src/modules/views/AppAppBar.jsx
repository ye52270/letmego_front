import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import { useEffect } from 'react';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};
 
function AppAppBar() {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const USER_NAME = localStorage.getItem("USER_NAME");
  // console.log("appbar access token : " + accessToken);
  // console.log("USER_NAME : " + USER_NAME);
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {USER_NAME !== "null" ? `${USER_NAME} 님 어서오세요` : "" }
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'당신과 함께하는 letmego.app'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href={ accessToken === "null" ? "/sign-in/" : "/sign-out"} 
              sx={rightLink}
            >
              { accessToken === "null" ? 'Sign In' : 'Sign OUT'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/sign-up/"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              { accessToken === "null" ? 'Sign Up' : ''}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
