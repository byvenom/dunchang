import React from "react";

import "./LinkList.css";

function PhotoList (props)  {
   
  const photoMarkup = props.options.map((photo) => (
    <li key={photo.id} className="link-list-item">
      <img 
      src={require(`./img/${photo.url}`)}
      className="link-list-item-url"
      />
    </li>
  ));

  return <ul className="link-list">{photoMarkup}</ul>;
};

export default PhotoList;