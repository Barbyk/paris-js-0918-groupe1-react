import React, { Component } from "react";
import "./DisplayAssociations.css";
import colis from "./imgActions/colis.png";
import accompagnement from "./imgActions/accompagnement.png";
import culture from "./imgActions/cultureTest.png";
import etranger from "./imgActions/etranger.png";
import maraude from "./imgActions/maraude.png";
import table from "./imgActions/table-solidaire.png";
import visite from "./imgActions/visite.png";
import soutient from "./imgActions/soutient.png";
import migrant from "./imgActions/migrant.png";
import fb from "../assets/fb.png";
import tweet from "./imgActions/tweet.png";
import insta from "../assets/insta.png";
import place from "../assets/place.png";
import mail from "../assets/mail.png";
import web from "../assets/web.png";
import phone from "../assets/phone.png";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledTooltip
} from "reactstrap";

export default class DisplayAssociations extends Component {
  state = {
    open: false
  };

  // à faire: recuperer toutes les autres icones d'actions et les importer ici
  tab = [
    maraude,
    table,
    colis,
    visite,
    accompagnement,
    culture,
    soutient,
    etranger,
    migrant
  ];

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    return (
      <div className="actioncard">
        <div className="container-fluid assocontain">
          <div className="blockLine">
            <div className="entete">
              <img src={this.props.logo} alt="Logo Asso" className="logoasso" />
              <h3>{this.props.name}</h3>
              <Button
                size="sm"
                variant="contained"
                className="btn-asso"
                onClick={this.handleToggle}
              >
                Plus d'info
              </Button>
              <div className="reseaux ">
                {this.props.social_1 ? (
                  <a href={this.props.social_1} target="_blanck">
                    <img src={tweet} className="reseauIcon " alt="twitter" />
                  </a>
                ) : null}
                {this.props.social_2 ? (
                  <a href={this.props.social_2} target="_blanck">
                    <img src={fb} className="reseauIcon " alt="fb" />
                  </a>
                ) : null}
                {this.props.social_3 ? (
                  <a href={this.props.social_3} target="_blanck">
                    <img src={insta} className="reseauIcon " alt="instagram" />
                  </a>
                ) : null}
              </div>
            </div>

            <div className="contact offset-sm-12 ">
              <h4>Contact</h4>
              <div className="divier" />
              <p>
                {" "}
                <img className="contactIcon" src={place} alt="icon lieu" />{" "}
                {this.props.address
                  ? this.props.address
                  : "adresse non disponible"}
              </p>
              <div className="divier" />
              <p>
                {" "}
                <img className="contactIcon" src={mail} alt="icon  mail" />{" "}
                {this.props.mail ? this.props.mail : "mail non disponible"}
              </p>
              <div className="divier" />
              <p>
                {" "}
                <img className="contactIcon" src={web} alt="icon web" />{" "}
                <a href={this.props.web_site} target="_blanck">
                  {this.props.web_site
                    ? this.props.web_site
                    : "site web non disponble"}
                </a>
              </p>
              <div className="divier" />
              <p>
                {" "}
                <img
                  className="contactIcon"
                  src={phone}
                  alt="icon phone"
                />{" "}
                {this.props.phone}
              </p>
            </div>
          </div>

          <div className="col-sm-12">
            <Modal isOpen={this.state.open} toggle={this.handleToggle} centered>
              <ModalHeader className="modal-titre" toggle={this.handleToggle}>
                {this.props.name}
              </ModalHeader>
              <ModalBody className="modal-corps">
                {this.props.description
                  ? this.props.description
                  : "Description à venir."}
                {/* <div className="divier"></div>
                <p>{this.props.address}</p>
                <p>{this.props.mail}</p>
                <a href={this.props.web_site}><p>site web</p></a>
                <p>{this.props.phone}</p>
                <div className="divier"></div> */}
                <div className=" container  d-flex justify-content-around">
                <div className="row justify-content-center">
                  {this.props.icon
                    ? this.props.icon.map((e, index) => (
                        <div key={index}>
                          <span id={"action-icon" + index}>
                            <img
                              src={this.tab[e - 1]}
                              alt=""
                              className="actionIcon"
                            />
                          </span>
                          <UncontrolledTooltip
                            placement="right"
                            target={"action-icon" + index}
                          >
                            {(this.props.definition[e - 1] || []).definition}
                          </UncontrolledTooltip>
                        </div>
                      ))
                    : null}{" "}
                </div></div>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
