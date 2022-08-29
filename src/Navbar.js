import React from "react";

export default function Header() {
  return (
    <header>
      <nav className="nav">
        <img className="nav-logo" src="./logo.png" alt="logo" />
        <h1>Google Analytics Dashboard</h1>
        <ul className="nav-items">
          <li>
            <a href="/Google-Analytics-Dashboard/ChartsDaily">
              <h2>Daily Chart</h2>
            </a>
          </li>
          <li>
            <a href="/Google-Analytics-Dashboard/ChartsMonthly">
              <h2>Monthly Chart</h2>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

//Header for sign-in section
export function PreHeader() {
  return (
    <header>
      <nav className="nav">
        <img className="nav-logo" src="./logo.png" alt="logo" />
        <h1>Google Analytics Dashboard</h1>
      </nav>
    </header>
  );
}
