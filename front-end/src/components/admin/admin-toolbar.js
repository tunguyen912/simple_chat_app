import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import { UseStyles } from './UseStyles'

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button'


import { NavLink } from 'react-router-dom';


export default function PersistentDrawerLeft(props) {
    
  const { title } = props
  const theme = useTheme();
  const classes = UseStyles(theme);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log('Testing open')
  };

  const handleDrawerClose = () => {
    setOpen(false);
    console.log('Testing close')
  };

  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flex: 1 }}>
            {title}
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
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['EventHistory', 'ChatHistory', 'Rooms'].map((text, index) => (
            <ListItem button key={text} component={NavLink} to={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider /> 
      </Drawer>
      {/* {drawerContent}       */}
    </div>
  );
}
