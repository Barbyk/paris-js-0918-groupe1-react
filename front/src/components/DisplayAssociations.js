import React, { Component } from 'react';
import "./DisplayAssociations.css"
import colis from "../assets/colis.png"
import mauraudes from "../assets/mauraudes.png"
import tables from "../assets/tables.png"
import soutien from "../assets/soutien.png"
import visite from "../assets/visites.png"
import administratif from "../assets/administratif.png"
import culture from "../assets/culture.png"
import etranger from "../assets/etranger.png"
import migrants from "../assets/migrants.png"
import impots from "../assets/impots.png"
import recolte from "../assets/recolte.png"
import sante from "../assets/sante.png"
import vestimentaires from "../assets/vestimentaires.png"

export default class DisplayAssociations extends Component {

  // à faire: recuperer toutes les autres icones d'actions et les importer ici
  tab = [
    migrants, mauraudes, tables, colis, visite, administratif, culture, soutien, etranger
  ]

  render() {
    return (
      <div className = "nocard">
      <div><h3>{this.props.name}</h3></div>
        <div><img src={this.props.logo} alt=""/></div>
        <div><p>{this.props.address}</p></div>
        <div><p>{this.props.social_1}</p></div>
        <div><p>{this.props.icon ? this.props.icon.map((e)=>
            <img src={this.tab[e-1]}
            alt=""/>
          ):null} </p></div>
        
        
      </div>
    )
  }
}
