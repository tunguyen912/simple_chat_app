import React, {Component} from 'react'
import Chip from "@material-ui/core/Chip";
import Typography from '@material-ui/core/Typography'

class MessageList extends Component {
    
    messages = [{id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},
                {id: '1', sender: "test", text: 'test message', time: "Mon Mar 09 2020 12:34:56"},]
    render() {
      return (
        <ul className="message-list">                 
          {this.messages.map(message => {
              let mess = message.sender+ ': '+ message.text
            return (
                <div key={message.id} className="message-list-container">
                    <Typography
                      className="subtitle1"
                      key="message"
                      variant="body4"
                    >
                      {message.time}: { }
                    </Typography>
                    <Chip
                        key={message.id}
                        label={mess}
                        variant="outlined" />
                </div>
           )
         })}
       </ul>
      )
    }
  }
  export default MessageList