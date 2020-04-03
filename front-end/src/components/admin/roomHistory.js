import React from "react";
import Toolbar from "./admin-toolbar";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import TableContainer from "@material-ui/core/TableContainer";
export default function EventsReport() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Room", field: "room" },
      { title: "Status", field: "status" },
      { title: "Created", field: "created_time" },
      { title: "Current chatter", field: "num_chatter" }
    ],

    data: [
      {
        room: "Mehmet",
        status: "Active",
        created_time: "Mar 12 2020",
        num_chatter: 4
      },
      {
        room: "Mehmet",
        status: "Active",
        created_time: "Mar 24 2020",
        num_chatter: 3
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
        <Toolbar title="Room History" />
      </div>
      <TableContainer className={classes.table}>
        <MaterialTable
          columns={state.columns}
          data={state.data}
          editable={{
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
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
