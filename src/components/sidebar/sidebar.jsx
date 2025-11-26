import React, { useContext, useEffect, useState } from "react";
import "./sidebar.css";
import { assets } from "./../../assets/assets";
import { context } from "../../context/context";

function SideBar() {
  const [openDrawer, setopenDrawer] = useState(false);
  const { onSent, previousPrompt, setrecentPrompt, input, ResetData, setloading, setresultData } = useContext(context);

  const recentPrompt = async (message) => {
    console.log(message, "message")
    setrecentPrompt(message);
    await onSent(message);
  };


  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setopenDrawer(!openDrawer)}
          className="menu"
          src={assets.menu_icon}
        />
        <div className="newchat" onClick={() => ResetData()}>
          <img src={assets.plus_icon} />
          {openDrawer ? <p >New Chat</p> : null}
        </div>
        {openDrawer ? (
          <div className="recent">
            <p className="recenttitle">Recent</p>
            {previousPrompt.map((item, index) => {
                return (
                  <div 
                  onClick={() => recentPrompt(item)}
                    key={index} 
                    className="recententry"
                  >
                    <p>{item.slice(0, 18)}...</p>

                    <img src={assets.message_icon} />

                  </div>
                );
              })}
          </div>
        ) : null}
      </div>
      <div className="bottom ">
        <div className="bottom-item recententry">
          <img src={assets.question_icon} />
          {openDrawer ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recententry">
          <img src={assets.history_icon} />
          {openDrawer ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recententry">
          <img src={assets.setting_icon} />
          {openDrawer ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
