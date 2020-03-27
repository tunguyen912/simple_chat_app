import React from 'react'
import { UseStyles } from './UseStyles'
import Typography from '@material-ui/core/Typography'
import Toolbar from './admin-toolbar'

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//   },
// })); 
export default function EventsReport() {
  
  const classes = UseStyles();

  return (
    
        <div className={classes.root}>
                <Toolbar title="Event History" />
                <Typography paragraph>
                  This is Event History
                </Typography>
        </div>
        
    )
}