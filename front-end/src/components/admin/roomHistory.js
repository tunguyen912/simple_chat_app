import React, { useState, useEffect } from "react";
import Toolbar from "./admin-toolbar";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import TableContainer from "@material-ui/core/TableContainer";
import axios from "axios";

export default function RoomReport() {
  const [columns] = useState([
    { title: "Room ID", field: "_id" },
    { title: "Room Name", field: "roomName" },
    { title: "Created", field: "timeCreated" },
  ]);
  const [data, setData] = useState([{rooms: []}])
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/rooms')
      .then(({data}) => {
        setData({rooms: data})
      })
  }, [])
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/rooms/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err.message))
  }
  const handleUpdate = (id, name) => {
    axios
      .put(`http://localhost:3001/api/rooms/${id}`, {name}, { headers: {'Content-Type': 'multipart/form-data' }})
      .then(res => console.log(res))
      .catch(err => console.log(err.message))
    }

  const useStyles = makeStyles(theme => ({

    table: {
      marginTop: "5rem",
      margin: "auto",
      width: "90%",
      marginBottom: "5rem",
    },
  }));
  const classes = useStyles();
  return (
    <React.Fragment>
      <div>
        <Toolbar title="Room History" />
      </div>
      <TableContainer className={classes.table}>
        <MaterialTable
          columns={columns}
          data={data.rooms}
          //Delete and edit is not working
          editable={{
            onRowUpdate: (newData, selectedData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (selectedData) {
                    setData((prevState) => {
                      const data = [...prevState.rooms];
                      handleUpdate(selectedData._id, newData.name)
                      data[data.indexOf(selectedData)] = newData;
                      //update tren mongodb trc
                      setData({rooms : data })
                    });
                  }
                }, 600);
              }),
            onRowDelete: (selectedData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setData((prevState) => {
                    const data = [...prevState.rooms];
                    handleDelete(selectedData._id)
                    data.splice(data.indexOf(selectedData), 1);
                    setData({rooms : data })
                  });
                }, 600);
              }),
          }}
        />
      </TableContainer>
    </React.Fragment>
  );
}
