import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    if (this.props.userNumber == 1) {
      return (
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="onlineUsers">{this.props.userNumber} user online</span>
        </nav>
      );    
    } else {
      return (
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="onlineUsers">{this.props.userNumber} users online</span>
        </nav>
      );    
    }
  }
}
export default Navbar;
