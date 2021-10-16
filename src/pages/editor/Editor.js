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



const Editor = () => {
    const classes = useStyles();

    React.useEffect(() => {
     window.addEventListener('mouseup', (event) => {
       return <div className={classes.editor}>
         <Button color="secondary"
                 variant="contained"
                 onClick={() => {
                   chrome.storage.sync.set({"create_card": new Date().toString()});
                 }}>
           English word!
         </Button>;
       </div>
    });
  }, []);



}

export default Editor;




