import React, {useState, useEffect} from "react";
import Toolbar from "./admin-toolbar";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import TableContainer from "@material-ui/core/TableContainer";
import axios from 'axios'

export default function RoomReport() {
  const [columns] = useState([
    { title: "Room ID", field: "_id" },
    { title: "Room Name", field: "roomName" },
    { title: "Created", field: "timeCreated" },
  ]);
  const [data, setData] = useState([])

  useEffect(() => {
  axios
    .get('http://localhost:3001/api/rooms')
    .then(({data}) => {
      setData(data)
    })
  }, [])
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
        <Toolbar title="Room History" />
      </div>
      <TableContainer className={classes.table}>
        <MaterialTable
          columns={columns}
          data={data}
          //Delete and edit is not working
          editable={{
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setData((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  setData(prevState => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              })
          }}
        />
      </TableContainer>
    </React.Fragment>
  );
}
