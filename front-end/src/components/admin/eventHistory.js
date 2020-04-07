import React, { useState, useEffect } from "react";
import Toolbar from "./admin-toolbar";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import TableContainer from "@material-ui/core/TableContainer";
import axios from "axios";

export default function EventsReport() {
  const [columns] = useState([
    { title: "ID", field: "_id" },
    { title: "Username", field: "username" },
    { title: "Event", field: "event" },
    { title: "Source", field: "source" },
    { title: "Timestamp ", field: "time" },
  ]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/eventlog')
      .then(({data}) => {
        setData(data)
      })
  }, [])


  const useStyles = makeStyles((theme) => ({
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
        <Toolbar title="Event History" />
      </div>
      <TableContainer className={classes.table}>
        <MaterialTable
          columns={columns}
          data={data}
          //delete is not working

          //CAI NAY LA MATERIAL TABLE PACKAGE TREN MANG KET NOI VOI MATERIAL UI
          //DOC DOCUMENT GIUP T DUNG CO COPY CAI DAU TIEN M THAY KO THOI
          // https://material-ui.com/components/tables/#table
          editable={{
            onRowDelete: (selectedData) =>
              //promise voi thoi gian load la 600 de chac chan la co data roi
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  //setData binh thuong thoi
                  setData((prevState) => {
                    //lay data cu~ cua MINH` goi no la PRESTATE
                    const data = [...prevState.events];
                    //cat cai index theo cai Olddata tu table gioi han la cai dau tien tim thay
                    data.splice(data.indexOf(selectedData), 1);
                    //SET DATA LAI THANH CAI DATA MOI
                    //LAM CAI DELETE CUA M TRUOC KHI LAM LOCAL DATA
                    //LOCAL DATA CHANGE
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
