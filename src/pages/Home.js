import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
const { ipcRenderer } = window.require("electron");

function HomePage(props) {
  useEffect(() => {
    return () => ipcRenderer.removeAllListeners("randomWord-reply");
  }, []);
  const printWord = (event, result) => {
    if (result.success) {
      props.history.push({
        pathname: "/word/" + result.word.id,
        state: { word: result.word },
      });
    }
  };
  const randomWord = () => {
    ipcRenderer.send("randomWord");
    ipcRenderer.once("randomWord-reply", printWord);
  };
  return (
    <Row style={{ marginTop: "80px" }}>
      <Col className="align-self-center text-center">
        <Row className="">
          <Col className="align-self-center text-center">
            <button
              className="btn-option col-md-4 col-sm-10"
              onClick={() => props.history.push({ pathname: "/search" })}
            >
              جستجو
            </button>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="align-self-center text-center">
            <button
              className="btn-option col-md-2 col-sm-5"
              onClick={() => props.history.push({ pathname: "/list" })}
            >
              لیست لغات
            </button>
            <button
              className="btn-option col-md-2 col-sm-5 mt-2"
              onClick={randomWord}
            >
              لغت تصادفی
            </button>
          </Col>
        </Row>

        {/* <Button className="btn-option">Click Here</Button> */}
      </Col>
      {/* <Col className="" style={{verticalAlign: "middle"}}>
            <h1>Title</h1>
            <p>Test</p>
          </Col>
          <Col>
            <button>Click</button>
          </Col> */}
    </Row>
  );
}

export default HomePage;
