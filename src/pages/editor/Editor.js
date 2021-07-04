import {Button, makeStyles} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    editor:{
        position: "fixed",
        zIndex: 10000,
        top: "100px",
        left: "100px"
    }
});

export function Editor(){
    const classes = useStyles();

    return <div className={classes.editor}>
        <Button color="secondary"
                variant="contained"
                onClick={() => {
                    chrome.storage.sync.set({"create_card": new Date().toString()});
                }}>
            Hello Anki!
        </Button>;
    </div>
}

export default Editor;


