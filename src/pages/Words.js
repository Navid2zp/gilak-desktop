import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import LazyLoad from "react-lazyload";
import WordPreviewBox from "../components/WordPreviewBox";
const { ipcRenderer } = window.require("electron");

function WordsPage(props) {
  const { char } = props.match.params;
  const [words, setWords] = useState([]);

  const getWords = (char) => {
    ipcRenderer.send("getWords", char);
    ipcRenderer.once("getWords-reply", (event, result) => {
      if (result.success) {
        setWords(result.words);
      }
    });
  };

  useEffect(() => {
    getWords(char);
  }, [char]);

  const wordClickHandler = (word) => {
    props.history.push({
      pathname: "/word/" + word.id,
      state: { word: word },
    });
  };

  return (
    <Row style={{ marginTop: "20px" }}>
      <Col className="align-self-center text-center">
        <Row className="">
          <Col className="align-self-center text-center">
            <button
              className="btn-option btn-back mb-5"
              onClick={() => props.history.goBack()}
            >
              {"↩"}
            </button>
            <p>لیست کلمات حرف {char}:</p>
            {words.map((word) => (
              <LazyLoad offset={100} once key={"word" + word.id}>
                <WordPreviewBox word={word} clickHandler={wordClickHandler} />
              </LazyLoad>
            ))}
            <button
              className="btn-option btn-back mt-5"
              onClick={() => props.history.goBack()}
            >
              {"↩"}
            </button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default WordsPage;
