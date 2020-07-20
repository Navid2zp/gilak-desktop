import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import LazyLoad from "react-lazyload";
import WordPreviewBox from "../components/WordPreviewBox";
const { ipcRenderer } = window.require("electron");

function SearchPage(props) {
  const [words, setWords] = useState([]);
  const [searched, setSearched] = useState(false);
  const searchHandler = (evt) => {
	const search = evt.target.value;
	setWords([])
    if (search.length < 2) {
	  setSearched(false);
      return;
	}
	setWords([])
    setSearched(true);

    ipcRenderer.send("searchWords", search);
    ipcRenderer.once("searchWords-reply", (event, result) => {
      if (result.success) {
        setWords(result.words);
      }
    });
  };

  const wordClickHandler = (word) => {
    props.history.push({
      pathname: "/word/" + word.id,
      state: { word: word },
    });
  };
  return (
    <Row
      style={{
        marginTop: "50px",
      }}
    >
      <Col className="align-self-center text-center">
        <Row className="">
          <Col className="align-self-center text-center">
            <input
              type="text"
              className="search-input"
              autoFocus={true}
              placeholder="کلمه مورد نظر ..."
              onChange={searchHandler}
            />
            <hr className="seperator" />
            {searched && words.length === 0 && (
              <p
                style={{ fontWeight: "300", fontSize: "14px" }}
                className="mt-5"
              >
                نتیجه ای یافت نشد ...
              </p>
            )}
            {words.map((word) => (
              <LazyLoad offset={100} once key={"word" + word.id}>
			  <WordPreviewBox word={word} clickHandler={wordClickHandler} />
			</LazyLoad>
            ))}
            <br />
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

export default SearchPage;
