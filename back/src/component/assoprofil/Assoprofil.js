import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import './Assoprofil.css'
import withAuth from '../withAuth'

class Assoprofil extends Component {
  state = {
    assoProfil: [],
    isLoading: false
  };

  componentDidMount() {
    this.getAssoprofil();
  }

  getAssoprofil = e => {
    this.setState({ isLoading: true })
    axios
      .get("/api/private/assoprofil",{headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("id_token")}
      })
      .then(response => this.setState({ assoProfil: response.data, isLoading: false }))
      .catch(function (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("id_token")
          window.location.reload()
        }
      });
  
  };

  handleChangeDelete = (id) => {
    const response = window.confirm("Etes-vous certain de vouloir supprimer ?");
    if (response) {
      axios
        .put("/api/private/assoprofil/" + id, {...this.state.assoProfil[id-1], actions:[], "is_visible": "0" },{headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("id_token")}})
        .then(window.location.reload())
    }
  }


  render() {
    const shouldParse = (el) => {
      if (!Array.isArray(el)){
        return JSON.parse(el)
      }else{
        return el
      }
    }
    const tabDepartement = ["75","77","78","91","92","93","94","95"]
    const tabActions = ["Maraudes mobiles","Tables solidaires","Colis alimentaires","Visites aux isolés","Accompagnement administratif",
    "Cultures et loisirs","Soutien scolaire","Actions de l'étranger","Aide aux migrants"]
    if (!this.state.isLoading)
      return (
        <div>
          <Link to={'/addNewAssoprofil'}><button>Ajouter une Association</button></Link>
          <table className="table">
            <caption>Edition des associations</caption>
            <thead><tr><th> Id </th><th> Nom </th><th> Description </th><th> Adresse </th><th> Logo </th><th> Twitter </th><th> Facebook </th>
              <th> Instagram </th><th> Téléphone </th><th> Site Internet </th><th> Mail </th><th> Departements Id </th><th>Actions</th><th> Bouton </th></tr></thead>
            <tbody>
              {this.state.assoProfil.map((el, index) =>
                <tr key={index}><td>{el.id}</td><td>{el.name}</td><td>{el.description}</td><td>{el.address}</td><td><img src={el.logo} alt=""/></td>
                  <td>{el.social_network_url_1}</td><td>{el.social_network_url_2}</td><td>{el.social_network_url_3}</td>

                  <td>{el.phone_number}</td><td>{el.web_site}</td><td>{el.mail}</td><td>{tabDepartement[el.departements_id-1]}</td><td>{ el.actions ? (shouldParse(el.actions)).map(e=>(tabActions[e-1]+"\r\n")):null}</td><td><Link to={'/modifyAssoprofil/' + el.id}>

                    <button>Modifier</button>
                  </Link>
                    <button onClick={() => this.handleChangeDelete(el.id)}>Supprimer</button></td></tr>
              )
              }
            </tbody>
          </table>
        </div>
      );
    else return (<div> Loading ....</div>)
  }
}

export default withAuth(Assoprofil);
