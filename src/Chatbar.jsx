import React, {Component} from 'react';

class Chatbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      message: ''
    }
  }

  handleUsernameChange = (event) => {
    const username = event.target.value || 'Anonymous';
    this.setState({currentUser: username});
  }

  handleMessageChange = (event) => {
    this.setState({message: event.target.value});
  }

  submitMessage = (event) => {
    // event.preventDefault();
    if (event.key == 'Enter') {
      this.props.createNewMessage(this.state.currentUser, this.state.message);
    }
  }


  render() {
    // console.log("Rendering <Chatbar/>");
    return (
      <footer className="chatbar"
        onKeyPress={this.submitMessage}>
          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            defaultValue={this.props.currentUser}
            onChange={this.handleUsernameChange} />
          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            onChange={this.handleMessageChange}/>
      </footer>
    );
  }
} // end class
export default Chatbar;
