class ActionProviderDocs {
    // The action provider receives createChatBotMessage which you can use to define the bots response, and 
    // the setState function that allows for manipulating the bots internal state.
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage
    }
    handleHiddenPhotoList = (check) => {
      
      if(check===1){
         const message = this.createChatBotMessage(
        "효재사진정보",
        {
          widget: "hiddenPhotoLinks",
        }
      );
      this.addMessageToBotState(message);}
      else if(check===2){
        const message = this.createChatBotMessage(
        "창주사진정보",
        {
          widget: "hiddenPhotoLinks2",
        }
      );
      this.addMessageToBotState(message);
      }
      else if(check===3){
        const message = this.createChatBotMessage(
        "동하사진정보",
        {
          widget: "hiddenPhotoLinks3",
        }
      );
      this.addMessageToBotState(message);
      }
      else if(check===4){
        const message = this.createChatBotMessage(
        "동율사진정보",
        {
          widget: "hiddenPhotoLinks4",
        }
      );
      this.addMessageToBotState(message);
      }
      else if(check===5){
        const message = this.createChatBotMessage(
        "대한사진정보",
        {
          widget: "hiddenPhotoLinks5",
        }
      );
      this.addMessageToBotState(message);
      }
      else if(check===6){
        const message = this.createChatBotMessage(
        "승현사진정보",
        {
          widget: "hiddenPhotoLinks6",
        }
      );
      this.addMessageToBotState(message);
      }
      else if(check===7){
        const message = this.createChatBotMessage(
        "다솔사진정보",
        {
          widget: "hiddenPhotoLinks7",
        }
      );
      this.addMessageToBotState(message);
      }
      else if(check===8){
        const message = this.createChatBotMessage(
        "종영사진정보",
        {
          widget: "hiddenPhotoLinks8",
        }
      );
      this.addMessageToBotState(message);
      }
      else if(check===9){
        const message = this.createChatBotMessage(
        "익선사진정보",
        {
          widget: "hiddenPhotoLinks9",
        }
      );
      this.addMessageToBotState(message);
      }
      else if(check===10){
        const message = this.createChatBotMessage(
        "하빈사진정보",
        {
          widget: "hiddenPhotoLinks10",
        }
      );
      this.addMessageToBotState(message);
      }
      else if(check===11){
        const message = this.createChatBotMessage(
        "병진사진정보",
        {
          widget: "hiddenPhotoLinks11",
        }
      );
      this.addMessageToBotState(message);
      }
      else if(check===12){
        const message = this.createChatBotMessage(
        "방울사진정보",
        {
          widget: "hiddenPhotoLinks12",
        }
      );
      this.addMessageToBotState(message);
      }
      
    };
    handlePhotoList = () => {
      const message = this.createChatBotMessage(
        "사진정보",
        {
          widget: "photoLinks",
        }
      );
  
      this.addMessageToBotState(message);
    };
    handleJavascriptList = () => {
      const message = this.createChatBotMessage(
        "인기 동영상 정보 ",
        {
          widget: "javascriptLinks",
        }
      );
  
      this.addMessageToBotState(message);
    };
    handleMessageParser = () => {
      const messages = this.createChatBotMessage(
        "컨트롤하기 위한 영역입니다.",
        { widget: "todos", withAvatar: true }
      );
  
      this.addMessageToBotState(messages);
    };
  
    handleDefault = () => {
      const message = this.createChatBotMessage("현재 학습되지않은 언어입니다.", {
       withAvatar: true,delay: 300,
      });
      const message2 = this.createChatBotMessage("아래키워드를 이용해보시겠습니까?", {
        widget:"learningOptions",withAvatar: true,delay: 400,
      });
      this.addMessageToBotState(message)
      this.addMessageToBotState(message2)
    };
  
    addMessageToBotState = (messages) => {
      if (Array.isArray(messages)) {
        this.setState((state) => ({
          ...state,
          messages: [...state.messages, ...messages],
        }));
      } else {
        this.setState((state) => ({
          ...state,
          messages: [...state.messages, messages],
        }));
      }
    };
  }
  
  export default ActionProviderDocs;