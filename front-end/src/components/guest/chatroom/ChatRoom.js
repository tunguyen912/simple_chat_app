import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import RoomList from "./RoomList";
import Toolbar from "./guest-toolbar";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.primary,
    backgroundColor: "#f5dfd5",
    height: "100%",
    overflow: "auto",
  },
  middle: {
    marginTop: "5rem",
    margin: "auto",
    width: "95%",
    marginBottom: "5rem",
  },
  height: {
    height: "37vw",
  },
  input: {
    width: "95%",
    margin: "auto",
    marginTop: "1rem",
  },
}));
function ChatRoom() {
  const [data, setData] = useState({ rooms: [] });

  useEffect(() => {
    axios.get("http://localhost:3001/api/rooms").then(({ data }) => {
      setData({ rooms: data });
    });
  }, []);
  const classes = useStyles();
  return (
    <Fragment>
      <Toolbar username="Tu nGuyen" />
      <RoomList
          styleMiddle={classes.middle}
          styleHeight={classes.height}
          stylePaper={classes.paper}
          styleRoot={classes.root}
          styleInput={classes.input}
          roomList={data.rooms}
        />
    </Fragment>
  );
}

export default ChatRoom;
