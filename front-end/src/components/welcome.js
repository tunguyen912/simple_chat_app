import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import WelcomeIcon from '../assets/doormat.svg';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ChatPic from '../assets/chat.png'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  margin: {    
    margin: '10px'  
  },
  full: {
    width: '100%',
    height: '100%',
  }
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={5 } md={7} className={classes.image}>
        <img src={ChatPic} alt='pic' className={classes.full}/>
      </Grid>
      <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <img src={WelcomeIcon} alt='icon'></img>
            </Avatar>
            <Typography component="h1" variant="h5" className={classes.margin}>
                Welcome to the Realtime Chat Application
            </Typography>
            <Button 
                fullWidth 
                className={classes.margin} 
                variant="contained" 
                color="primary" 
                href="/login/guest"
            >
                Sign in as Guest
            </Button>
            <Button 
                fullWidth 
                className={classes.margin} 
                variant="contained" 
                color="secondary" 
                href="/login/admin"
            >
                Sign in as Administrator
            </Button>
        </div>
      </Grid>
    </Grid>
  );
}

