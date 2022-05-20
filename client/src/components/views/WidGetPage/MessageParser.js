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
      if(lowerCase.includes("창주")||lowerCase.includes("피sh")||lowerCase.includes("따봉")){
        return this.actionProvider.handleHiddenPhotoList(2);
      }
      if(lowerCase.includes("동하")||lowerCase.includes("탕가")){
        return this.actionProvider.handleHiddenPhotoList(3);
      }
      if(lowerCase.includes("동율")||lowerCase.includes("yul")||lowerCase.includes("영역")){
        return this.actionProvider.handleHiddenPhotoList(4);
      }
      if(lowerCase.includes("대한")||lowerCase.includes("민국")||lowerCase.includes("korea")){
        return this.actionProvider.handleHiddenPhotoList(5);
      }
      if(lowerCase.includes("승현")||lowerCase.includes("승혐")){
        return this.actionProvider.handleHiddenPhotoList(6);
      }
      if(lowerCase.includes("다솔")||lowerCase.includes("간솔")){
        return this.actionProvider.handleHiddenPhotoList(7);
      }
      if(lowerCase.includes("종영")||lowerCase.includes("피즈")){
        return this.actionProvider.handleHiddenPhotoList(8);
      }
      if(lowerCase.includes("익선")||lowerCase.includes("고자")){
        return this.actionProvider.handleHiddenPhotoList(9);
      }
      if(lowerCase.includes("하빈")||lowerCase.includes("히포")||lowerCase.includes("hippo")){
        return this.actionProvider.handleHiddenPhotoList(10);
      }
      if(lowerCase.includes("병진")){
        return this.actionProvider.handleHiddenPhotoList(11);
      }
      if(lowerCase.includes("방울")||lowerCase.includes("강아지")||lowerCase.includes("개")||lowerCase.includes("dog")){
        return this.actionProvider.handleHiddenPhotoList(12);
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