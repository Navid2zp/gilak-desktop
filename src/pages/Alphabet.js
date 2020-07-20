import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
const { ipcRenderer } = window.require("electron");

function AlphabetPage(props) {
  const [alphabet, setAlphabet] = useState(null);

  const getAlphabet = () => {
    ipcRenderer.send("getAlphabet");
    ipcRenderer.once("getAlphabet-reply", (event, result) => {
      if (result.success) {
        setAlphabet(result.alphabet);
      }
    });
  };

  useEffect(() => {
    getAlphabet();
  }, []);

  return (
    <Row
      style={{
        marginTop: "50px"
      }}
    >
      <Col className="align-self-center text-center">
        <Row className="">
          <Col className="align-self-center text-center">
            {alphabet && (
              <div>
                <p>لطفا یکی از حروف ها را انتخاب کنید</p>
				<div>
				{alphabet.map((char) => 
					<button
					key={"alphabet" + char.alphabet}
					className="btn-alphabet mt-3"
					onClick={() => props.history.push({pathname: "/words/" + char.alphabet})}
				  >
					{char.alphabet}
				  </button>
				)}
				</div>
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

export default AlphabetPage;
