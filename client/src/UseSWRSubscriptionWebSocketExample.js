import React from "react";
import useSWRSubscription from 'swr/subscription'

export const UseSWRSubscriptionWebSocketExample = () => {
  const [showSubscribers, setShowSubscribers] = React.useState(true);
  return (
    <div>
      <h3>useSWRSubscription Websocket</h3>
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
  const {send} = useWsSub('ws://localost:3001')
  return (
    <div>
      <input type='text' value={messageText}onChange={(e) => setMessageText(e.target.value)} />
      <button onClick={ ()=> send(`${messageText} from react-use-websocket`) }>Send</button>
    </div>
  )
}

export const Receiver = () => {
  const {data, error, send} = useWsSub('ws://localhost:3001');
  return (<div>{data}</div>)
}

const useWsSub = (key) => {
  const socket = new WebSocket(key);
  const send = socket.send;
  const subscribe = (key, {next}) => {
    socket.addEventListener('message', (event) => next(null, event.data))
    socket.addEventListener('open', (event) => next(null, event.data))
    socket.addEventListener('error', (event) => next(event.error))
    return () => socket.close()
  }
  const { data, error } = useSWRSubscription(key, subscribe);
  return {
    data,
    error,
    send
  }
}
