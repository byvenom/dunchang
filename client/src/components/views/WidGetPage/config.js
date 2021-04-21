import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import botimg from './bot.png'
import MessageParser from "./MessageParser";
import ActionProviderDocs from "./ActionProviderDocs";
import LearningOptions from "./LearningOptions"
import LinkList from './LinkList'
import PhotoList from './PhotoList'

const botName = "Yeot";

const config = {
  botName: botName,
  lang: "ko",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  initialMessages: [
    createChatBotMessage(
      `안녕하세요. 제이름은 ${botName}봇입니다. 어떤일을 도와드릴까요?`
    ),
    createChatBotMessage(
      "궁금하신내용을 선택해 주세요",
      {withAvatar: true,
        delay: 500,
        widget:"learningOptions"
      }
    ),
 
  ],
  state: {
    gist: "",
  },
  customComponents: {
    botAvatar: (props) => <div style={{display:'block'}}><div style={{width:'40px',height:'40px',borderRadius:'50%',marginRight:'1.2rem',backgroundColor:'#d8d8d8',display:'flex',justifyContent:'center',alignItems:'center'}}><img src={botimg} style={{width:'15px',height:'15px'}}/></div></div>
  },
  widgets: [
    {
      widgetName: "messageParser",
      widgetFunc: (props) => <MessageParser {...props} />,
      props:{}
    },
    {
      widgetName: "actionProviderDocs",
      widgetFunc: (props) => <ActionProviderDocs {...props} />,
      props:{}
    },
    {
      widgetName: "learningOptions",
      widgetFunc: (props) => <LearningOptions {...props} />,
      props:{}
    },
    {
      widgetName: "javascriptLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "100인 어몽어스",
            url:
              "/video/detail/606c002993447448ff780dbc",
            id: 1,
          },
          {
            text: "권투 권투",
            url:
              "/video/detail/606c005b93447448ff780dbd",
            id: 2,
          },
          {
            text: "한번만 봐준다",
            url: "/video/detail/6077c1bd02189d47d823842c",
            id: 3,
          },
        ],
      },
    },
    {
      widgetName: "photoLinks",
      widgetFunc: (props) => <PhotoList {...props} />,
      props: {
        options: [
          /*{
            url:
              "hyo.jpg",
            id: 1,
          },*/
          {
            url:
              "bot.png",
            id: 2,
          },
        ],
      },
    },
  ],
};

export default config;