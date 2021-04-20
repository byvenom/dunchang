import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "./config";
import actionProvider from "./ActionProviderDocs";
import messageParser from "./MessageParser";
import chatimg from "./bot.png"
import $ from "jquery"
function Test() {
  $(".react-chatbot-kit-chat-input").attr({"placeholder":"질문을 입력해주세요."});
  const [showBot, toggleBot] = useState(false);
  const [inSet, setinSet] = useState("")
  const saveMessages = (messages) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };
  const onInset = (check) => {
      if(!check){
          setinSet("1px 1px 3px 1px #dadce0 inset")
        }
      else{
          setinSet("")
      }
  }
  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
    return messages;
  };


  return (
    <div className="App" style={{position:'fixed',right:'10px',bottom:'0px',zIndex:'1000'}}>
   <div style={{position:'absolute',bottom:'65px', right:'0px' , minHeight:'500px'}}> 
   {showBot && (
        <Chatbot
          config={config}
          actionProvider={actionProvider}
          messageHistory={loadMessages()}
          messageParser={messageParser}
          saveMessages={saveMessages}
        />
      )}
    </div>
    <div style={{position:'absolute',right:'30px',bottom:'30px'}}>
        <button style={{border:0,background:'none'}} onClick={() => {toggleBot((prev) => !prev);onInset(showBot)}}><img src={chatimg} style={{width:'48px',height:'48px',boxShadow:inSet}}/></button>
    </div>
       
    </div>
  );
}
export default Test
