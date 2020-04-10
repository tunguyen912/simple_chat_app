import React, {useState, useEffect} from "react";
import Toolbar from "./admin-toolbar";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import TableContainer from "@material-ui/core/TableContainer";
import axios from 'axios';
import { Redirect } from "react-router-dom"; 


export default function ChatReport() {
  const [columns] = useState([
      { title: "Username", field: "senderUsername" },
      { title: "Message", field: "message" },
      { title: "Room", field: "roomName" },
      { title: "Timestamp ", field: "time" }
  ]);
  const [data, setData] = useState({chats: []})
  const [redirect, setRedirect] = useState(false); 
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    const hasToken = token === null ? false : true
    if(hasToken){
      axios
      .get("/api/chats")
      .then(({ data }) => {
        setData({ chats: data });
    })}
    else{
      console.log('Unauthorized')
      setRedirect(true)
    }
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/api/chats/${id}`)
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

  if(redirect){
    return <Redirect to="/login/admin" />
  }
  return (
    <React.Fragment>
      <div>
        <Toolbar title="Chat History" />
      </div>
      <TableContainer className={classes.table}>
        <MaterialTable
          title="Chat History"
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
