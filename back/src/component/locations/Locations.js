import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
//import './Locations.css'


export default class Locations extends Component {

state = {
  locations : [],
  isLoading: false

}
 getLocations =() => {
     axios
        .get ('http://localhost:3002/locations')
        .then (reponse => this.setState ({locations : reponse.data, isLoading: false}))
        .then(console.log(this.state.locations))
        
 }

 componentDidMount(){
     this.getLocations()
 }


  render() {

    if (!this.state.isLoading)

    return (
      <div>
        <Link to={'/addNewLocation'}><button>Ajouter une Localisation</button></Link>
        <table className="table">
          <caption>Edition des localisations</caption>
          <thead>
            <tr><th> Id </th><th> Nom </th><th> Image du lieu </th>
            <th> Departement </th></tr>
            </thead>
            <tbody>
              {this.state.locations.map((el, index) =>
                <tr><td>{el.id}</td><td>{el.name}</td><td>{el.image}</td>
                  <td>{el.departements_id}</td><td><Link to={'/modifyLocation/' + el.id}>
              <button>Modifier</button></Link></td></tr> )}
            </tbody>
          </table>
      </div>
            )
            else return (<div> Loading ....</div>)
          }
        }
          
        
