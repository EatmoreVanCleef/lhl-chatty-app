import React, {Component} from 'react';

class Chatbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      message: ''
    }
  }

  handleMessageChange = (event) => {
    this.setState({message: event.target.value});
  }

  handleUsernameChange = (event) => {
    this.setState({currentUser: event.target.value});
  }

  handleUsernameSubmit = (event) => {
    if (event.key == 'Enter') {
      const username = event.target.value || 'Anonymous';
      const newCurrentUser = this.state.currentUser;
      this.setState({currentUser: newCurrentUser});
      this.props.onNameChanged(this.state.currentUser);    
    }
  }

  submitMessage = (event) => {
    // event.preventDefault();
    if (event.key == 'Enter') {
      this.props.sendMessage('postMessage',this.state.currentUser, this.state.message);
    }
  }


  render() {
    // console.log("Rendering <Chatbar/>");
    return (
      <footer className="chatbar">
          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            defaultValue={this.props.currentUser}
            onChange={this.handleUsernameChange}
            onKeyPress={this.handleUsernameSubmit} />
          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            onChange={this.handleMessageChange}
            onKeyPress={this.submitMessage}/>
      </footer>
    );
  }
} // end class
export default Chatbar;
