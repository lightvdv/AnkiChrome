import {Button, makeStyles} from "@material-ui/core";
import React, { useState } from 'react';
import { GetRequestHooks } from './getRequest';

const useStyles = makeStyles({
    editor:{
        position: "fixed",
        zIndex: 10000,
        top: (props) => props.top + "px",
        left: (props) => props.left + "px"
    }
});





export function Editor() {

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [word, setWord] = useState("")

  React.useEffect(() => {
    window.addEventListener('dblclick', (event) => {
       setTop(event.clientY); setLeft(event.clientX)
       setWord(window.getSelection().toString())
      {GetRequestHooks()}
    });
  }, [top, left, word]);


  const classes = useStyles({top: top, left: left});

  return <div className={classes.editor}>

    <Button color="secondary"
            variant="contained"
            onClick={() => {
              chrome.storage.sync.set({"create_card": new Date().toString()});
            }}>
      {word}
    </Button>
  </div>

}

export default Editor;




