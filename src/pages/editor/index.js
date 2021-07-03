import React from 'react';
import {Button} from '@material-ui/core';
import ReactDOM from "react-dom";


function App() {
    return <Button color="primary">Hello World</Button>;
}

console.log("Inject APP")

const container = document.createElement("div");
container.id = "anki-editor"

container.style.top = "150px";
container.style.left = "150px";


document.body.appendChild(container);

ReactDOM.render(<App/>, container);
