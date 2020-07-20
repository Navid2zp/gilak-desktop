import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
const { ipcRenderer } = window.require("electron");

function WordPage(props) {
  const { state } = props.location;
  const { id } = props.match.params;
  const [word, setWord] = useState(null);

  const getWord = (wordId) => {
    ipcRenderer.send("getWord", wordId);
    ipcRenderer.once("getWord-reply", (event, result) => {
      if (result.success) {
        setWord(result.word);
      }
    });
  };

  useEffect(() => {
    if (!state.word) {
      getWord(id);
    } else {
      setWord(state.word);
    }
  }, [state, id]);

  return (
    <Row style={{marginTop: "100px"}}>
      <Col className="align-self-center text-center">
        <Row className="">
          <Col className="align-self-center text-center">
            {word && (
              <div>
                <h2>{word.word}</h2>
                <h3 className="meaning mt-5">{word.meaning}</h3>
                <button
                  className="btn-option btn-back mt-5"
                  onClick={() => props.history.goBack()}
                >
                  {"↩"}
                </button>
              </div>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default WordPage;
