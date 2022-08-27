import React, { useState, useEffect } from "react";
import "./App.css";
import { renderButton, checkSignedIn } from "./components/utils";
import Report from "./components/report";
import Charts from "./components/Charts";
import ReactECharts from "echarts-for-react";
import { dataTool } from "echarts";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const updateSignin = (signedIn) => {
    //(3)
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
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
  });

  return (
    <div className="App">
      {!isSignedIn ? (
        <div id="signin-button"></div>
      ) : (
        <div>
          <Report />
          <Charts />
        </div>
      )}
    </div>
  );
}

export default App;
