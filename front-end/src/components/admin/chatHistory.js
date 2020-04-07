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
  const [data, setData] = useState([])
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/history')
      .then(({data}) => {
        setData(data)
      })
  })

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
          data={data}
          //Delete
          editable={{
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
