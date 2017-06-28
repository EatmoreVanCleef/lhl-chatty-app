import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
   //  console.log("Rendering <Message/>");
    return (
      <div>
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
        <div className="message system">
          {this.props.systemMessage}
        </div>
      </div>
    );
  }

} // end class
export default Message;
