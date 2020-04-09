import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

class RoomList extends Component {
    state = {  }
    handleChange = (event) => {
        // console.log(event.target.value)
        if(event.target.value !== undefined) {

        }
    }
    render() { 
        return ( 
            <div>
                <Typography>Room List</Typography>
                <FormControl  style={{minWidth: 120}}>
                    <InputLabel id="demo-simple-select-label">Join Room:</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={this.handleChange}
                    >
                        {this.props.roomList.map((val, index) => {
                            return <MenuItem key = {val._id} value = {val.roomName}>{val.roomName}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
        );
    }
}
 
export default RoomList;