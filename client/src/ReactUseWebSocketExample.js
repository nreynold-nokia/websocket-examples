import React from "react";
import useWebSocket from 'react-use-websocket';

export const ReactUseWebSocketExample = () => {
  const [showSubscribers, setShowSubscribers] = React.useState(true);
  return (
    <div>
      <h3>React Use WebSocket</h3>
      {showSubscribers && 
        <div>
          <Sender/> 
          <Receiver/>
        </div>
      }
      <p>Click to unmount</p>
      <button onClick={ ()=> setShowSubscribers(!showSubscribers) }>Toggle subscribed components</button>
    </div>
  )
}

const Sender = () => {
  const [messageText, setMessageText] = React.useState('')
  const { sendMessage } = useWebSocket('ws://localhost:3001', {
    share:true,
    onOpen: ()=> {console.log('opened RUS sender')},
    onClose: () => {console.log('closing RUS sender')} // NOTE: since this is a shared socket, these methods are also shared, only one will execute for the socket
  });
  return (
    <div>
      <input type='text' value={messageText}onChange={(e) => setMessageText(e.target.value)} />
      <button onClick={ ()=> sendMessage(`${messageText} from react-use-websocket`) }>Send</button>
    </div>
  )
}

export const Receiver = () => {
  const { lastMessage  } = useWebSocket('ws://localhost:3001', {
    share:true,
    onOpen: ()=> {console.log('opened RUS receiver')},
    onMessage: (msg)=> {console.log('message', msg)},
    onClose: () => {console.log('closing RUS receiver')}
  });
  return (<div>{lastMessage && lastMessage.data}</div>)
}
