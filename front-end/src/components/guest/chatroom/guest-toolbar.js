import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

export default function PersistentDrawerLeft(props) {
    
  const { username } = props
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          
          <Typography variant="h6" noWrap style={{ flex: 1 }}>
            Hello, {username}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            href='/'
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
