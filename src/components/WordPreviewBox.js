import React from "react";

function WordPreviewBox({ word, clickHandler }) {
  return (
    <button className="word-box" onClick={() => clickHandler(word)}>
      <h5 style={{ marginTop: "5px" }}>{word.word}</h5>
      <hr className="seperator" />
      <p className="meaning">
        {word.meaning.length > 144
          ? word.meaning.slice(0, 140) + " ..."
          : word.meaning}
      </p>
    </button>
  );
}

export default WordPreviewBox;
