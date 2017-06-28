import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          systemMessage: "Anonymous changed their name to nomnom."
        }
      ],
    };
  } // end constructor

  createNewMessage(username, content) {
    const id = this.state.messages.length + 1;
    const newMessage = {id, username, content};
    const messages = this.state.messages;
    messages.push(newMessage);
    this.setState({messages: messages});
  }

  render() {
    // console.log("Rendering <App/>");
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages} />
        <Chatbar
          currentUser={this.state.currentUser.name}
          createNewMessage={this.createNewMessage.bind(this)} />
      </div>
    );
  }

  // componentDidMount() {
  //   console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //     const messages = this.state.messages.push(newMessage);
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     this.setState({messages: messages})
  //   }, 3000);
  // }

} // end class



export default App;
