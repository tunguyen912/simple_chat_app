import React, {Fragment, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import MessageList from './Message'
import RoomList from './RoomList'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import Toolbar from './guest-toolbar'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.primary,
      backgroundColor: "#f5dfd5",
      height: "100%",
      overflow: 'auto'
    },
    middle: {
        marginTop: "5rem",
        margin: "auto",
        width: "95%",
        marginBottom: "5rem"
    },
    height: {
        height: '37vw'
    },
    input: {
        width: "95%",
        margin: "auto",
        marginTop: "1rem"
    }
    
}));
function ChatRoom(){
    const [data, setData] = useState({rooms: []})
    useEffect(() => {
        axios
            .get("http://localhost:3001/api/rooms")
            .then(({data}) => {
                setData({rooms: data})
                console.log(data.rooms)
            })
    }, [])
    const classes = useStyles();
    return ( 
        <Fragment>
            <Toolbar username="Tu nGuyen" />
            <div className={classes.middle} >
                <Grid container spacing={3}>
                    <Grid item xs={9} className={classes.height} >
                        <Paper className={classes.paper}>
                            <MessageList />    
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper} style={{textAlign: 'center'}}>
                            <RoomList roomList={data.rooms}/>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Paper className={classes.input}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField fullWidth label="Message" variant="outlined" />
                    </form>
                    </Paper>
                </Grid>
            </div>
            
        </Fragment>
    );
}
 
export default ChatRoom;