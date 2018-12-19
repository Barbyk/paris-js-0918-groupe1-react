import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import withAuth from '../withAuth';


class Locations extends Component {

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
    const tabDepartement = ["75","77","78","91","92","93","94","95"]
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
                <tr><td>{el.id}</td><td>{el.name}</td><td>{el.img_url}</td>
                  <td>{tabDepartement[el.departements_id-1]}</td><td><Link to={'/modifyLocation/' + el.id}>
              <button>Modifier</button></Link></td></tr> )}
            </tbody>
          </table>
      </div>
            )
            else return (<div> Loading ....</div>)
          }
        }
          
export default withAuth(Locations)
        
