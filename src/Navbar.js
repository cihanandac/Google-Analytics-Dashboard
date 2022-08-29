import React from "react";
import PropTypes from "prop-types";

export default function Header(props) {
  return (
    <header>
      <nav className="nav">
        <img className="nav-logo" src="./logo.png" alt="logo" />
        <h1>Google Analytics Dashboard</h1>
        <div>
          {props.isSignedIn && (
            <ul className="nav-items">
              <li>
                <a href="/ChartsDaily">
                  <h2>Daily Chart</h2>
                </a>
              </li>
              <li>
                <a href="/ChartsMonthly">
                  <h2>Monthly Chart</h2>
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  isSignedIn: PropTypes.bool,
};
//Header for sign-in section
// export function PreHeader() {
//   return (
//     <header>
//       <nav className="nav">
//         <img className="nav-logo" src="./logo.png" alt="logo" />
//         <h1>Google Analytics Dashboard</h1>
//       </nav>
//     </header>
//   );
// }
