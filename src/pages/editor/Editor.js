import {Button} from "@material-ui/core";
import React from "react";

export function Editor(){
    return <div>
        <Button color="secondary"
                variant="contained"
                onClick={() => {
                    chrome.storage.sync.set({"create_card": new Date().toString()});
                }}>
            Hello Anki
        </Button>;
    </div>
}

export default Editor;


