import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.messages = this.props.messages;
  }
  render() {
   //  console.log("Rendering <MessageList/>");
    return (
      <main className="messages">
        { this.messages.map((message) => {
          return (
            <Message key={message.id} username={message.username} content={message.content} />
          );
        })}
      </main>
    );
  }
}
export default MessageList;
