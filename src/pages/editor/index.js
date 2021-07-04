import React from 'react';
import ReactDOM from "react-dom";
import Editor from "./Editor";

const container = document.createElement("div");
container.id = "anki-editor"
container.style.top = "150px";
container.style.left = "150px";

document.body.appendChild(container);

ReactDOM.render(<Editor/>, container);
