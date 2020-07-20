import React from "react";
import "./App.css";
import "./styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MemoryRouter, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import HomePage from "./pages/Home";
import WordPage from "./pages/Word";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AlphabetPage from "./pages/Alphabet";
import WordsPage from "./pages/Words";
import SearchPage from "./pages/Search";

function App() {
  return (
    <MemoryRouter>
      <Container className="" fluid style={{minHeight: "100%", height: "100%"}}>
      {/* <div
        style={{
		  minHeight: "100%",
          position: "relative"
        }}
      > */}
        <Header />
        <Switch>
          <Route path="/list" render={(props) => <AlphabetPage {...props} />} />
          <Route path="/search" render={(props) => <SearchPage {...props} />} />
          <Route path="/words/:char" render={(props) => <WordsPage {...props} />} />
          <Route path="/word/:id" render={(props) => <WordPage {...props} />} />
          <Route path="/" render={(props) => <HomePage {...props} />} />
        </Switch>
        {/* <Footer /> */}
      {/* </div> */}
      </Container>
      <Footer />
    </MemoryRouter>
  );
}

export default App;
