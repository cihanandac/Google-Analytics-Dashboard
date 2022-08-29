import React, { useState } from "react";
import "./App.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import ChartsMonthly from "./components/ChartsMonthly";
import ChartsDaily from "./components/ChartsDaily";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [data, setData] = useState([]);

  return (
    <GoogleOAuthProvider clientId="67149944135-4608iad6up8cleubnedprrq7kncq5hsg.apps.googleusercontent.com">
      <Router>
        <div className="App">
          <Navbar isSignedIn={isSignedIn} />
          {!isSignedIn ? (
            <div>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  setIsSignedIn(true);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          ) : (
            <div className="content">
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
    </GoogleOAuthProvider>
  );
}

export default App;
