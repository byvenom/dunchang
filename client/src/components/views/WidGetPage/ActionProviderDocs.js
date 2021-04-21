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