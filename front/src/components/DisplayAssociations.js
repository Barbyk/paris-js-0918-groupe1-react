import React, { Component } from 'react';
import "./DisplayAssociations.css"
import colis from './imgActions/colis.png';
import accompagnement from './imgActions/accompagnement.png';
import culture from './imgActions/culture.png';
import etranger from './imgActions/etranger.png';
import maraude from './imgActions/maraude.png';
import table from './imgActions/table-solidaire.png';
import visite from './imgActions/visite.png';
import soutient from './imgActions/soutient.png';
import migrant from './imgActions/migrant.png';
import fb from './imgActions/fb.png';
import tweet from'./imgActions/tweet.png'
import insta from'./imgActions/insta.png'

import { UncontrolledTooltip, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

export default class DisplayAssociations extends Component {

  state = {
    open: false,
  };

  // à faire: recuperer toutes les autres icones d'actions et les importer ici
  tab = [
   colis,accompagnement,culture,etranger, maraude ,table ,visite ,soutient,migrant 
  ]

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });

  };

  render() {
    return (
<div className="actioncard">
      <div class="container-fluid assocontain">
          <div class=" top row">
            <div  class="entete">
              <img src={this.props.logo} alt="" class="logoasso" />
              <h3>{this.props.name}</h3>
            </div>
            <div  class="reseaux">
              {this.props.social_1?<a href={this.props.social_1}><img src={tweet} class="icon " /></a>:null}
              {this.props.social_2?<a href={this.props.social_2}><img src={fb} class="icon " /></a>:null}
              {this.props.social_3?<a href={this.props.social_3}><img src={insta} class="icon " /></a>:null}
            </div>
            <div >
              <p>Contact</p>
              <p>{this.props.address} </p>
              <p>{this.props.mail}</p>
              <p><a href={this.props.web_site}>{this.props.web_site}</a></p>
              <p>{this.props.phone}</p>
            </div>
            <div class="positionBouton">
               <button className="styleInfobulle" onClick={this.handleToggle}>i</button>
            </div>

              <Modal isOpen={this.state.open} toggle={this.handleToggle}>
              <ModalHeader toggle={this.handleToggle}>
                {this.props.name}
              </ModalHeader>
              <ModalBody>
                {this.props.description ? this.props.description : "Description à venir."}
                <p>{this.props.address}</p>
                <p>{this.props.mail}</p>
                <a href={this.props.web_site}><p>site web</p></a>
                <p>{this.props.phone}</p>
                <p>{this.props.icon ? this.props.icon.map((e) =>
                <><span id='action-icon'><img src={this.tab[e - 1]} alt="" class="icon" /></span>
                <UncontrolledTooltip placement="right" target="action-icon">
                  {this.props.definition[e - 1].definition}
                </UncontrolledTooltip></>
                ) : null} </p>
                
              </ModalBody>
              </Modal>     
                  
            
          </div>
        </div>
      </div>
      








    )
  }
}
