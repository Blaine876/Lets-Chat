import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import axios from "./utils/messages";
import "./App.css";
const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("835ec4ab25e31535c4a2", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default App;
