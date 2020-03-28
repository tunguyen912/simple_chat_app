import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


const useStyles = makeStyles(theme => ({
    marginTop: {
      "marginTop":"100px"
    },
    appBarSpacer: theme.mixins.toolbar,
    head: {
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.common.white,
    },
    table: {
      minWidth: 700,
      marginTop: '100px'
    },
  }));
  
export const CustomTable=(props)  => {
    const { objectArray } = props
    const classes = useStyles();

    const renderTableData  = () => {
      return objectArray.map((obj, index) => {
        let col = Object.keys(obj)
        return (
           <StyledTableRow key={obj._id}>
              {col.map((val, index) => {
                 return <TableCell key={index}>
                        { obj[col[index]]}
                        </TableCell>
              })}
           </StyledTableRow>
        )
      })
    }

    const renderTableHeader = ()  => {
      let header = Object.keys(objectArray[0])
      return header.map((key, index) => {
         return <StyledTableCell key={index}>{key.toUpperCase()}</StyledTableCell>
      })
   }


    return (
      <React.Fragment>
        <div  />
        <TableContainer>
        <Table className={classes.table} size="small">
          <TableHead className={classes.head}>
          <TableRow>{renderTableHeader()}</TableRow>
          </TableHead>
          <TableBody>
              {renderTableData()}
          </TableBody>
        </Table>
        </TableContainer>
      </React.Fragment>
    );
  }