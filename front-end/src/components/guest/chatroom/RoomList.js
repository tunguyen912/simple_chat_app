import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

class RoomList extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Typography variant="h5"> Room List</Typography>
                <FormControl  style={{minWidth: 120}}>
                    <InputLabel id="demo-simple-select-label" >Join Room:</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                    >
                        <MenuItem value={'Room1'}>Room1asdfsadfsdafasdfasdfasdfasdfas</MenuItem>
                        <MenuItem value={'Room2'}>Room2</MenuItem>
                        <MenuItem value={'Room3'}>Room3</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }
}
 
export default RoomList;