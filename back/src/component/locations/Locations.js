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
        .get ('/locations',{headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("id_token")}})
        .then (reponse => this.setState ({locations : reponse.data, isLoading: false}))
        .then(console.log(this.state.locations))
        
 }

 componentDidMount(){
     this.getLocations()
 }

 handleChangeDelete = (id) => {
  const response = window.confirm("Etes-vous certain de vouloir supprimer ?");
  if (response) {
    axios
      .put("/locations/" + id, { "is_active": "0" },{headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("id_token")}})
      .then(window.location.reload())
  }
}

  render() {
    const tabDepartement = ["Paris Centre","Paris Nord","Paris Est","Paris Sud","Paris Ouest","Banlieue"]
    if (!this.state.isLoading)

    return (
      <div>
        <Link to={'/addNewLocation'}><button>Ajouter une Localisation</button></Link>
        <table className="table">
          <caption>Edition des localisations</caption>
          <thead>
            <tr><th> Id </th><th> Nom </th><th> Image du lieu </th>
            <th> Catégorie </th></tr>
            </thead>
            <tbody>
              {this.state.locations.map((el, index) =>
                <tr><td>{el.id}</td><td>{el.name}</td><td>{el.img_url}</td>
                  <td>{tabDepartement[el.departements_id-1]}</td><td><Link to={'/modifyLocation/' + el.id}>
              <button>Modifier</button></Link><button onClick={() => this.handleChangeDelete(el.id)}>Supprimer</button></td></tr> )}
            </tbody>
          </table>
      </div>
            )
            else return (<div> Loading ....</div>)
          }
        }
          
export default withAuth(Locations)
        
