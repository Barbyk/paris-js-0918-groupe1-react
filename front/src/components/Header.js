import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from "./imgActions/Temporaire.png"

class Header extends React.Component {

    render() {
        return(
            <div class="header">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                   
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link to={"/"}><img src={logo} class="logo"/></Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    
                        <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/"}>Accueil</Link>
                            {/* <a className="nav-link" href="#">Accueil</a> */}
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to={"/trouverunemaraude"}>Trouver une maraude</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to={"/actions"}>Les actions</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to={"/associations"}>Les associations</Link>
                        </li>
                        </ul>
                    </div>
                    <Link to={"/calendrier"}><button type="button" className="btn btn-outline-light btn-sm btn-menu">Espace asso</button></Link>

                </nav>
            </div>
        )
    }
}

export default Header;