import React, { useState, useEffect } from "react";
import "./App.css";
import { renderButton, checkSignedIn } from "./lib/out";
import ChartsMonthly from "./components/ChartsMonthly";
import ChartsDaily from "./components/ChartsDaily";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar, { PreHeader } from "./Navbar";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const updateSignin = (signedIn) => {
    //(3)
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
      navigate("/home");
    }
  };

  const init = () => {
    //(2)
    checkSignedIn()
      .then((signedIn) => {
        updateSignin(signedIn);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    window.gapi.load("auth2", init); //(1)
  }, []);

  return (
    <Router>
      <div className="App">
        {!isSignedIn ? (
          <div>
            <PreHeader />
            <div id="signin-button"></div>
          </div>
        ) : (
          <div className="content">
            <Navbar />
            <Routes>
              <Route
                exact
                path="/ChartsMonthly"
                element={<ChartsMonthly data={data} setData={setData} />}
              />
              <Route
                exact
                path="/ChartsDaily"
                element={<ChartsDaily data={data} setData={setData} />}
              />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
