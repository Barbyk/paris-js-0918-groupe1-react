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
            <div col-xs-12 col-lg-4 class="entete">
              {this.props.logo?<img src={this.props.logo} alt="" class="logoasso" />:<p></p>}
              <h3>{this.props.name}</h3>
            </div>
            <div  col-xs-12 offset-lg-8 class="reseaux">
              {this.props.social_1?<a href={this.props.social_1}><img src={tweet} class="icon " /></a>:null}
              {this.props.social_2?<a href={this.props.social_2}><img src={fb} class="icon " /></a>:null}
              {this.props.social_3?<a href={this.props.social_3}><img src={insta} class="icon " /></a>:null}
            </div>
          </div>

          <div class="bottom row">
            <div class="info offset-sm-12 ">
              <p>adresse: {this.props.address} </p>
              <p>mail: {this.props.mail}</p>
              <p>site: <a href={this.props.web_site}>{this.props.web_site}</a></p>
              <p>tel: {this.props.phone}</p>
            </div>
            <div class="col-sm-12">
               <Button variant="contained" className='btn-asso' onClick={this.handleToggle}>
                Informations
              </Button>

              <Modal isOpen={this.state.open} toggle={this.handleToggle}>
              <ModalHeader className='modal-titre' toggle={this.handleToggle}>
                {this.props.name}
              </ModalHeader>
              <ModalBody className='modal-corps'>
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
      </div>
      








    )
  }
}
