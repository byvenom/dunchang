class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      // State represents the chatbot state and is passed 
      // in at initalization. You can use it to read chatbot state
      // inside the messageParser
      this.state = state
    }
    handleHiddenPhotoList
    parse = (message) => {
      const lowerCase = message.toLowerCase();
      if(lowerCase.includes("효재")||lowerCase.includes("효복")){
        return this.actionProvider.handleHiddenPhotoList(1);
      }
      if(lowerCase.includes("창주")||lowerCase.includes("피sh")){
        return this.actionProvider.handleHiddenPhotoList(2);
      }
      if(lowerCase.includes("사진")||lowerCase.includes("photo")||lowerCase.includes("그림")||lowerCase.includes("picture")){
        return this.actionProvider.handlePhotoList();
      }
      if(lowerCase.includes("비디오")||lowerCase.includes("video")||lowerCase.includes("영상")){
        return this.actionProvider.handleJavascriptList();
      }
      if (
        lowerCase.includes("messageparser") ||
        lowerCase.includes("parse") ||
        lowerCase.includes("parser") ||
        lowerCase.includes("message parser")
      ) {
        return this.actionProvider.handleMessageParser();
      }
      return this.actionProvider.handleDefault();
    };
  }
  
  export default MessageParser;