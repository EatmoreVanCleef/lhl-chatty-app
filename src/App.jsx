import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket;
    this.state = {
      connectedUsers: 0,
      currentUser: {name: "Bob"},
      messages: [],
    };
  } // end constructor

  createNewMessage(type, username, content, id) {
    const newid = id || this.state.messages.length + 1;
    const newMessage = {type, id, username, content};
    return newMessage;
  }

  sendMessage(type, username, content) {
    const newMessage = this.createNewMessage(type, username, content);
      console.log("SENDING:", newMessage);
    this.socket.send(JSON.stringify(newMessage));
  }
 
  onNameChanged(name) {
    const oldName = this.state.currentUser.name;
    const newCurrentUser = this.state.currentUser;
    newCurrentUser.name = name;
    this.setState({currentUser: newCurrentUser});

    console.log('CurrentUser: ' + this.state.currentUser.name);
    
    this.sendMessage('postNotification', 'ChattyApp', `**${oldName}** changed their name to **${this.state.currentUser.name}**`);
  }

  receiveData(data) {
    switch(data.type) {
      case 'updateStateMessage':
        this.receiveStateUpdate(data);
        break;
      default:
        console.log("Incoming Message:  ", data.type);
        this.receiveMessage(data);
        break; 
    }
  } 

  receiveStateUpdate(data) {
    switch(data.property) {
      case "connectedUsers":
        let connectedUsers = this.state.connectedUsers;
        connectedUsers = data.value;
        this.setState({connectedUsers: connectedUsers});
        break;
    }
  }

  receiveMessage(data) {
    const newMessage = this.createNewMessage(data.type,data.username, data.content, data.id);
        console.log('RECEIVING:',newMessage);
    const messages = this.state.messages;
    messages.push(newMessage);
    this.setState({messages: messages}); 
  }

  render() {
    // console.log("Rendering <App/>");
    return (
      <div>
        <Navbar userNumber={this.state.connectedUsers}/>
        <MessageList messages={this.state.messages} />
        <Chatbar
          currentUser={this.state.currentUser.name}
          sendMessage={this.sendMessage.bind(this)}
          onNameChanged={this.onNameChanged.bind(this)} />
      </div>
    );
  }

  componentDidMount() {
    var url = 'http://localhost:3001';
    var HOST = url.replace(/^http/, 'ws');
    this.socket = new WebSocket(HOST);

    this.socket.onmessage = (event) => {
      this.receiveData(JSON.parse(event.data));
    }

  } // end componentDidMount 

} // end class



export default App;
