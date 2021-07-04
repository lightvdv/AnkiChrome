import React from 'react';
import {Button} from '@material-ui/core';
import ReactDOM from "react-dom";


function App() {
    return <div>
        <Button color="primary"
                onClick={() => {
                    chrome.storage.sync.set({"create_card": new Date().toString()});
                }}>
            Hello World
        </Button>;
    </div>
}

const container = document.createElement("div");
container.id = "anki-editor"

container.style.top = "150px";
container.style.left = "150px";

document.body.appendChild(container);

ReactDOM.render(<App/>, container);
