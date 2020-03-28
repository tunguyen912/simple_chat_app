import React from 'react'
import {CustomTable} from './table'
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from './admin-toolbar'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function EventsReport() {
  const array = [{_id: 1, test1: '1111', test2:"bbbb", test3: "cccc", test4: "dddd"},
                 {_id: 2, test1: 'aaaa', test2:"bbbb", test3: "cccc", test4: "dddd"},
                 {_id: 3, test1: 'aaaa', test2:"bbbb", test3: "cccc", test4: "dddd"},
                 {_id: 4, test1: 'aaaa', test2:"bbbb", test3: "cccc", test4: "dddd"},
                 {_id: 5, test1: '1111', test2:"bbbb", test3: "cccc", test4: "dddd"},
                 {_id: 6, test1: 'aaaa', test2:"bbbb", test3: "cccc", test4: "dddd"},
                 {_id: 7, test1: 'aaaa', test2:"bbbb", test3: "cccc", test4: "dddd"},
                 {_id: 8, test1: 'aaaa', test2:"bbbb", test3: "cccc", test4: "dddd"},
                 {_id: 9, test1: '1111', test2:"bbbb", test3: "cccc", test4: "dddd"},
                 {_id: 10, test1: 'aaaa', test2:"bbbb", test3: "cccc", test4: "dddd"}
                ]
                 

  const classes = useStyles();
  return (
        <div className={classes.root}>
          <Toolbar title="Room History" />
          <main className={classes.content}>
            <CustomTable objectArray={array} />
          </main>
        </div>
    )
}