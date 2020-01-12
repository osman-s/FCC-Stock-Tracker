import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <div className="bookss">
        <i className="fas fa-file-invoice-dollar flow p-2"></i> Stock Tracker App
        </div>
      </Link>
      <div className="" id="navbarNavAltMarkup"></div>
    </nav>
  );
};

export default NavBar;
