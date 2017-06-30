const WebSocket = require('ws');

var socketUrl = 'ws://localhost:3001';
var ws = new WebSocket(socketUrl);
var el = document.getElementById('server-time');


    
