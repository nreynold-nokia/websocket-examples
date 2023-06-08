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
  const subResp = useWsSub('ws://localhost:3001')
  console.log('subresp sender');
  console.log(subResp);
  return (
    <div>
      <input type='text' value={messageText}onChange={(e) => setMessageText(e.target.value)} />
      <button onClick={ () => {
        console.log(subResp)
        if(subResp && subResp.data && subResp.data.socket) {
          console.log('sending'); 
          subResp.data.socket.send(`${messageText} from react-use-websocket`)} }
        }>Send</button>
    </div>
  )
}

export const Receiver = () => {
  const subResp = useWsSub('ws://localhost:3001');
  console.log('subresp receiver')
  console.log(subResp)
  return (<div>{subResp.data && subResp.data.message}</div>)
}

const useWsSub = (key) => {
  const subscribe = (key, {next}) => {

    const socket = new WebSocket(key);
    socket.addEventListener('message', (event) => next(null, {message: event.data || '', socket: socket}))
    socket.addEventListener('open', (event) => next(null, {message: event.data || '', socket: socket}))
    socket.addEventListener('error', (event) => next(event.error))
    return () => socket.close()

  }
  const { data, error } = useSWRSubscription(key, subscribe);
  return {
    data,
    error,
  }
}
