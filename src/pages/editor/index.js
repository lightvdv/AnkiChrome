import React from 'react';
import ReactDOM from "react-dom";
import Editor from "./Editor";
import { getWordTranslation } from '../../storage/word_translation/wordTranslationsActions';


function subscribe(event) {
  const word = window.getSelection();
  let positionX = event.clientY + 15
  let positionY = event.clientX - 40
  console.log(word + ' ' + positionX + ' ' + positionY + ' index')
  getWordTranslation(word, positionX, positionY)
}
window.addEventListener( 'dblclick', subscribe);


const container = document.createElement("div");
document.body.appendChild(container);
ReactDOM.render(<Editor/>, container);








