import React, { Component } from 'react';
import "./DisplayAssociations.css"
import colis from "../assets/colis.png"
import mauraudes from "../assets/mauraudes.png"
import tables from "../assets/tables.png"


export default class DisplayAssociations extends Component {

  // à faire: recuperer toutes les autres icones d'actions et les importer ici
  tab = [
    colis, mauraudes, tables
  ]

  render() {
    return (
      <div className = "nocard">
      <div><h1>{this.props.name}</h1></div>
        <div><p>{this.props.logo}</p></div>
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
