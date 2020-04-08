import React, {useState, useEffect} from "react";
import Toolbar from "./admin-toolbar";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import TableContainer from "@material-ui/core/TableContainer";
import axios from 'axios';

export default function ChatReport() {
  const [columns] = useState([
      { title: "Username", field: "senderUsername" },
      { title: "Message", field: "message" },
      { title: "Room", field: "roomName" },
      { title: "Timestamp ", field: "time" }
  ]);
  const [data, setData] = useState({chats: []})
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    const hasToken = token === null ? false : true
    if(hasToken){
      axios
      .get("http://localhost:3001/api/chats")
      .then(({ data }) => {
        setData({ chats: data });
    })}
    else{
      console.log('Unauthorized')
      //Need to redirect to login page
    }
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/chats/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err.message))
  }
  const useStyles = makeStyles(theme => ({
    table: {
      marginTop: "5rem",
      margin: "auto",
      width: "90%",
      marginBottom: "5rem"
    }
  }));
  const classes = useStyles();
  return (
    <React.Fragment>
      <div>
        <Toolbar title="Chat History" />
      </div>
      <TableContainer className={classes.table}>
        <MaterialTable
          columns={columns}
          data={data.chats}
          //Delete
          editable={{
            onRowDelete: selectedData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  setData(prevState => {
                    const data = [...prevState.chats];
                    handleDelete(selectedData._id)
                    data.splice(data.indexOf(selectedData), 1);
                    // return { ...prevState, data };
                    setData({ chats: data });
                  });
                }, 600);
              })
          }}
        />
      </TableContainer>
    </React.Fragment>
  );
}
