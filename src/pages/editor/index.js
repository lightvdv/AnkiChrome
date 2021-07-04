import React from 'react';
import ReactDOM from "react-dom";
import Editor from "./Editor";

const container = document.createElement("div");
document.body.appendChild(container);

ReactDOM.render(<Editor/>, container);
