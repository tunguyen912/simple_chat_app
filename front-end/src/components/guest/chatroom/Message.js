import React, { Component } from "react";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

class MessageList extends Component {
  state = {
    room : "",
    room_message: [],
  };

  componentDidUpdate(previousProps) {
    if (this.props.room !== previousProps.room) {
      console.log("Data retriveed");
      let currentComponent = this;
      axios
        .post(`/api/chats/${this.props.room}`)
        .then(function (response) {
          let data = response.data;
          console.log(response.data);
          currentComponent.setState({
            room_message: data,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <ul className="message-list">
          {this.state.room_message.map((message) => {
            let mess = message.senderUsername + ": " + message.message;
            return (
              <div
                key={message._id}
                className="message-list-container"
                style={{ marginTop: 10 }}
              >
                <Typography className="subtitle1" key="message" variant="body2">
                  {message.time.substr(0, 10)}: {}
                </Typography>
                <Chip key={message._id} label={mess} variant="outlined" />
              </div>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}
export default MessageList;
