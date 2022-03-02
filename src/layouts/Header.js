import { Link } from "react-router-dom";

import logo from '../assets/images/home.ico';

function Header() {
  return (
    <header className="App-header">
        <Link to="/" className="App-logo">
            <img src={logo} alt="logo" />
        </Link>
        <h1>Financial Advisor</h1>
    </header>
  );
}

export default Header;
