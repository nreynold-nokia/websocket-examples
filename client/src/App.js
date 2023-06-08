import React from "react";
import './App.css';
import { ReactUseWebSocketExample } from "./ReactUseWebSocketExample";
import {UseSWRSubscriptionWebSocketExample } from "./UseSWRSubscriptionWebSocketExample"

function App() {

  return (
    <div className="App" style={{display: 'flex', flexDirection: 'row', width: '50%', justifyContent:'space-between', margin: 'auto'}}>
      <ReactUseWebSocketExample/>
      <UseSWRSubscriptionWebSocketExample/>
    </div>
  );

}

export default App;
