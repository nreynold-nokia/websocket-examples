const express = require('express')
const ws = require('ws');
const http = require('http')

const port = 3001

const app = express();

app.get('/api', (req, res) => {
  res.json({ message: "Hello from server!" });
})
//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new ws.Server({ server });

wss.on('connection', (ws) => {
console.log(wss.clients.size);
    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

console.log(wss.clients.size);
        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });
    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
