import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import MessageParser from "./MessageParser";
import ActionProviderDocs from "./ActionProviderDocs";

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
 
  ],
  state: {
    gist: "",
  },
  customComponents: {},
  widgets: [
    {
      widgetName: "messageParser",
      widgetFunc: (props) => <MessageParser {...props} />,
      mapStateToProps: ["gist"],
    },
    {
      widgetName: "actionProviderDocs",
      widgetFunc: (props) => <ActionProviderDocs {...props} />,
      mapStateToProps: ["gist"],
    },
  ],
};

export default config;