import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import MessageList from "./Message";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = { room: "", message: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange = (event) => {
    this.setState({ room: event.target.value });
  };
  handleMessageChange=(event)=>{
      this.setState({message : event.target.value })
  }
  handleSubmit = (event) => {
    alert("Send message to:  " + this.state.room + " with message of : " + this.state.message);
    
    event.preventDefault();
  };





  render() {
    return (
      <React.Fragment>
        <div className={this.props.styleMiddle}>
          <Typography>Room List</Typography>

          <FormControl style={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Join Room:</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={this.handleChange}
            >
              {this.props.roomList.map((val, index) => {
                return (
                  <MenuItem key={val._id} value={val.roomName}>
                    {val.roomName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className={this.props.styleMiddle}>
          <div className={this.props.styleHeight}>
            <Paper className={this.props.stylePaper}>
              <MessageList room={this.state.room} />
            </Paper>
          </div>
        </div>
        <div className={this.props.styleMiddle}>
          <Paper className={this.props.styleInput}>
            <form
              onSubmit={this.handleSubmit}
              className={this.props.styleRoot}
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                onChange={this.handleMessageChange}
              />
            </form>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default RoomList;
