import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "./imgActions/Temporaire.png";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Link to={"/"}>
            <img src={logo} className="logo" alt="Logo" />
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <a className="nav-link" href="/">
                  Accueil
                </a>
                {/* <a className="nav-link" href="#">Accueil</a> */}
              </li>
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <a className="nav-link" href="/trouverunemaraude">
                  Localisation
                </a>
              </li>
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <a className="nav-link" href="/actions">
                  Les actions
                </a>
              </li>
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <a className="nav-link" href="/associations">
                  Les associations
                </a>
              </li>
            </ul>
          </div>
          <Link to={"/calendrier"}>
            <button
              type="button"
              className="btn btn-outline-light btn-sm btn-menu"
            >
              Espace asso
            </button>
          </Link>
        </nav>
      </div>
    );
  }
}

export default Header;
