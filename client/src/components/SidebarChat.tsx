import React from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
interface Props {}

const SidebarChat = (props: Props) => {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>Room Name</h2>
        <p>Most recent message</p>
      </div>
    </div>
  );
};

export default SidebarChat;
