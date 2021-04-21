import React from "react";

import "./LearningOptions.css";

function LearningOptions(props) {
  const options = [
    { text: "추천영상", handler: props.actionProvider.handleJavascriptList, id: 1 },
    { text: "사진정보", handler: props.actionProvider.handlePhotoList, id: 2 },

  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default LearningOptions;