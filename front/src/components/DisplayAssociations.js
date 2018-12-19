import React, { Component } from 'react';
import "./DisplayAssociations.css"

export default class DisplayAssociations extends Component {
  
  render() {
    return (
      <div className = "nocard">
      <div><h1>{this.props.name}</h1></div>
        <div><p>{this.props.logo}</p></div>
        <div><p>{this.props.address}</p></div>
        <div><p>{this.props.social_1}</p></div>
        <div><p>{this.props.icon}</p></div>
        
        
      </div>
    )
  }
}
