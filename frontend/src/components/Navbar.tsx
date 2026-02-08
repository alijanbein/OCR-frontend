import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">PDF OCR Demo</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Upload</Link>
        <Link to="/docs">Documents</Link>
        <Link to="/search">Search</Link>
      </div>
    </nav>
  );
};

export default Navbar;
