class ActionProviderDocs {
    // The action provider receives createChatBotMessage which you can use to define the bots response, and 
    // the setState function that allows for manipulating the bots internal state.
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage
    }
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
      const message = this.createChatBotMessage("아직 학습중에 있습니다. 올바른 검색을 해주세요", {
        withAvatar: true,
      });
  
      this.addMessageToBotState(message)
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