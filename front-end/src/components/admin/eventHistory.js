import React from "react";
import Toolbar from "./admin-toolbar";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import TableContainer from "@material-ui/core/TableContainer";
export default function EventsReport() {
  const [state, setState] = React.useState({
    //EVENT DATA
    columns: [
      { title: "Username", field: "username" },
      { title: "Event", field: "event" },
      { title: "Source", field: "source" },
      { title: "Time Stamp ", field: "timestamp" }
    ],

    data: [
      {
        username: "Mehmet",
        event: "Connected	",
        source: "Game Room	",
        timestamp:
          "Mon Mar 09 2020 12:34:56 GMT+0000 (Coordinated Universal Time)"
      },
      {
        username: "Zerya Betül",
        event: "Disconnected",
        source: "Game Room	",
        timestamp:
          "Mon Mar 09 2020 12:34:56 GMT+0000 (Coordinated Universal Time)"
      }
    ]
  });
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
        <Toolbar title="Event History" />
      </div>
      <TableContainer className={classes.table}>
        <MaterialTable
          columns={state.columns}
          data={state.data}
          editable={{
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  setState(prevState => {
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
