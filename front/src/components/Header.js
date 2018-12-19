import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends React.Component {

    render() {
        return(
            <div>
                <div>Logo</div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button type="button" className="btn btn-outline-light btn-sm">Espace asso</button>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
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
                </nav>
            </div>
        )
    }
}

export default Header;