import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import colis from "./imgActions/colis.png";
import accompagnement from "./imgActions/accompagnement.png";
//import culture from "./imgActions/culture.png";
import culture from "./imgActions/cultureTest.png";
import etranger from "./imgActions/etranger.png";
import maraude from "./imgActions/maraude.png";
import table from "./imgActions/table-solidaire.png";
import visite from "./imgActions/visite.png";
import soutient from "./imgActions/soutient.png";
import migrant from "./imgActions/migrant.png";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "./Actions.css";

class Actions extends Component {
  state = {
    actionList: [],
    isLoading: true,
    name: "",
    definition: "",
    open: false
  };
  onClose = () => {
    this.setState({ open: false });
  };

  onClick1 = () => {
    this.setState({
      name: this.state.actionList[0].name,
      definition: this.state.actionList[0].definition,
      id: 1,
      open: true
    });
  };

  onClick2 = () => {
    this.setState({
      name: this.state.actionList[1].name,
      definition: this.state.actionList[1].definition,
      id: 2,
      open: true
    });
  };

  onClick3 = () => {
    this.setState({
      name: this.state.actionList[2].name,
      definition: this.state.actionList[2].definition,
      id: 3,
      open: true
    });
  };

  onClick4 = () => {
    this.setState({
      name: this.state.actionList[3].name,
      definition: this.state.actionList[3].definition,
      id: 4,
      open: true
    });
  };

  onClick5 = () => {
    this.setState({
      name: this.state.actionList[4].name,
      definition: this.state.actionList[4].definition,
      id: 5,
      open: true
    });
  };
  onClick6 = () => {
    this.setState({
      name: this.state.actionList[5].name,
      definition: this.state.actionList[5].definition,
      id: 6,
      open: true
    });
  };
  onClick7 = () => {
    this.setState({
      name: this.state.actionList[6].name,
      definition: this.state.actionList[6].definition,
      id: 7,
      open: true
    });
  };

  onClick8 = () => {
    this.setState({
      name: this.state.actionList[7].name,
      definition: this.state.actionList[7].definition,
      id: 8,
      open: true
    });
  };
  onClick9 = () => {
    this.setState({
      name: this.state.actionList[8].name,
      definition: this.state.actionList[8].definition,
      id: 9,
      open: true
    });
  };

  getAction = async () => {
    await axios
      .get("/actions")
      .then(response =>
        this.setState({ actionList: response.data, isLoading: false })
      );
  };

  componentDidMount() {
    this.getAction();
  }

  render() {
    if (this.state.isLoading) return <div className="loading"><i className="fa fa-spinner fa-spin" /><h3>Chargement ...</h3></div>;
    else
      return (
        <div className="container actioncontain">
          <Modal isOpen={this.state.open} centered>
            <div className="row">
              <div className="definition  col-sm-12 offset-md-2 col-md-8">
                <ModalHeader>
                  <h2>{this.state.name}</h2>
                </ModalHeader>
                <ModalBody>
                  {" "}
                  <p className="def">{this.state.definition}</p>{" "}
                </ModalBody>
                {this.state.definition ? (
                  <Link to={"/actions/" + this.state.id}>
                    <button type="button" className="btngo">
                      Liste des Associations
                    </button>
                  </Link>
                ) : null}
                <button
                  type="button"
                  className="btnback"
                  onClick={this.onClose}
                >
                  Retour
                </button>
              </div>
            </div>
          </Modal>
          <div className="action">
            <div className="row">
              <div className="col-xs-12 col-md-6 col-lg-4">
                {" "}
                <a href="#logo">
                  <button className="bt" onClick={this.onClick1}>
                    <img
                      src={maraude}
                      alt="icon maraude"
                      title="maraude mobile"
                      className="actionlogo"
                    />
                  </button>
                </a>
                <h3>Maraudes mobiles</h3>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <a href="#logo">
                  {" "}
                  <button className="bt" onClick={this.onClick2}>
                    <img
                      src={table}
                      alt="icon table"
                      title="table solidaire"
                      className="actionlogo"
                    />
                  </button>
                </a>
                <h3>Tables solidaires</h3>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <a href="#logo">
                  <button className="bt" onClick={this.onClick3}>
                    <img
                      src={colis}
                      alt="icon colis"
                      title="colis alimentaires"
                      className="actionlogo"
                    />
                  </button>
                </a>
                <h3>Colis alimentaires</h3>
              </div>

              <div className="col-xs-12 col-md-6 col-lg-4">
                <a href="#logo">
                  <button className="bt" onClick={this.onClick4}>
                    <img
                      src={visite}
                      alt="icon visite"
                      title="visite aux isolés"
                      className="actionlogo"
                    />
                  </button>
                </a>
                <h3>Visites aux isolés</h3>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <a href="#logo">
                  {" "}
                  <button className="bt" onClick={this.onClick5}>
                    <img
                      src={accompagnement}
                      alt="icon accompagnement"
                      title="accompagnement administratif"
                      className="actionlogo"
                    />
                  </button>
                </a>
                <h3>Accompagnement administratif</h3>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <a href="#logo">
                  {" "}
                  <button className="bt" onClick={this.onClick6}>
                    <img
                      src={culture}
                      alt="icon culture"
                      title="culture et loisirs"
                      className="actionlogo"
                    />
                  </button>
                </a>
                <h3>Culture et loisirs</h3>
              </div>

              <div className="col-xs-12 col-md-6 col-lg-4">
                <a href="#logo">
                  <button className="bt" onClick={this.onClick7}>
                    <img
                      src={soutient}
                      alt="icon soutient"
                      title="soutient scolaire"
                      className="actionlogo"
                    />
                  </button>
                </a>
                <h3>Soutien scolaire</h3>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <a href="#logo">
                  {" "}
                  <button className="bt" onClick={this.onClick8}>
                    <img
                      src={etranger}
                      alt="icon etranger"
                      title="aide à l'étranger"
                      className="actionlogo"
                    />
                  </button>
                </a>
                <h3>Aide à l'étranger</h3>
              </div>
              <div className="col-xs-12 col-md-12 col-lg-4">
                <a href="#logo">
                  <button className="bt" onClick={this.onClick9}>
                    <img
                      src={migrant}
                      alt="icon migrant"
                      title="aide aux migrants"
                      className="actionlogo"
                    />
                  </button>
                </a>
                <h3>Aide aux migrants</h3>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Actions;
