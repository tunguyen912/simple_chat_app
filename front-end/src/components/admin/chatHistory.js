import React from 'react'
import { UseStyles } from './UseStyles'
// import Typography from '@material-ui/core/Typography'
import Toolbar from './admin-toolbar'
// import clsx from 'clsx';
import {RecordTable} from './table'

export default function EventsReport() {
  const array = [{test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"},
                 {test1: 'aaaa', test2:"bbbb"}, {test1: "cccc", test2: "dddd"}
                ]
                 

  const classes = UseStyles();
  // const [open] = React.useState(false);
  return (
    
        <div className={classes.root}>
          <Toolbar title="Chat History" />
          {/* <main
            className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}
          >
          </main>
          <Typography> Testing </Typography> */}
          <RecordTable objectArray={array} />
        </div>
    )
}