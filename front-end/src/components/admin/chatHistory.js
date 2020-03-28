import React from 'react'
import { UseStyles } from './UseStyles'
// import Typography from '@material-ui/core/Typography'
import Toolbar from './admin-toolbar'
import clsx from 'clsx';
import {CustomTable} from './table'

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
                 

  const classes = UseStyles();
  const [open] = React.useState(false);
  return (
    
        <div className={classes.root}>
          <Toolbar title="Chat History" />
          <main
            className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}
          >
          </main>
          {/* <Typography> Testing </Typography> */}
          <CustomTable objectArray={array} />
        </div>
    )
}