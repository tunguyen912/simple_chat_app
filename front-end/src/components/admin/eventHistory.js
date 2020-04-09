import React, { useState, useEffect } from "react";
import Toolbar from "./admin-toolbar";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import TableContainer from "@material-ui/core/TableContainer";
import axios from "axios";
import { Redirect } from "react-router-dom"; 


export default function EventsReport() {
  const [columns] = useState([
    { title: "ID", field: "_id" },
    { title: "Username", field: "username" },
    { title: "Event", field: "event" },
    { title: "Source", field: "source" },
    { title: "Timestamp ", field: "time" },
  ]);
  const [data, setData] = useState({ events: [] });
  const [redirect, setRedirect] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token')
    const hasToken = token === null ? false : true
    if(hasToken){
      axios
        .get("http://localhost:3001/api/eventlog")
        .then(({ data }) => {
          setData({ events: data });
    })}
    else{
      console.log('Unauthorized')
      setRedirect(true)
    }
  }, []);

  const useStyles = makeStyles((theme) => ({
    table: {
      marginTop: "5rem",
      margin: "auto",
      width: "90%",
      marginBottom: "5rem",
    },
  }));

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/eventlog/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err.message))
  }
  const classes = useStyles();
  if(redirect){
    return <Redirect to="/login/admin" />
  }
  return (
    <React.Fragment>
      <div>
        <Toolbar title="Event History" />
      </div>
      <TableContainer className={classes.table}>
        <MaterialTable
          columns={columns}
          data={data.events}
          editable={{
            onRowDelete: (selectedData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setData((prevState) => {
                    const data = [...prevState.events];
                    handleDelete(selectedData._id)
                    data.splice(data.indexOf(selectedData), 1);
                    // return{...prevState.events, data}
                    setData({ events: data });
                  });
                }, 600);
              }),
          }}
        />
      </TableContainer>
    </React.Fragment>
  );
}
