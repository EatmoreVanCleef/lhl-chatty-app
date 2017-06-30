const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

let clientCounter = 0;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws, req) => {
  console.log('Client connected');
  clientCounter++;

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(bundleStateUpdate()));
    }
  });

  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(JSON.stringify(data));
      }
    });
  };

  ws.on('message', (data) => {
    data = JSON.parse(data);
    console.log('BROADCASTING: ', `${data.type.toUpperCase()}: ${data.username} says '${data.content}'`);
    wss.broadcast(bundleMessageData(data));
  });



  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    clientCounter--;
    console.log('Client disconnected');
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(bundleStateUpdate()));
      }
    });
  });
});


function bundleMessageData(data) {
  const type = data.type === 'postNotification' ? 'incomingNotification' : 'incomingMessage';
  const uuid = uuidv1();
  const newMessage = {
    type: type,
    id: uuid,
    username: data.username,
    content: data.content,
    connectedUsers: clientCounter
  }
  console.log(newMessage);
  return newMessage;
}

function bundleStateUpdate() {
  const onlineUsers = {
    type: "updateStateMessage",
    property: "connectedUsers",
    value: clientCounter
  };
  return onlineUsers;
}