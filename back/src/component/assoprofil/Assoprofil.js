import React, { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import './Assoprofil.css'

class Assoprofil extends Component {
  state = {
    assoProfil : [],
    isLoading : false
  };

    componentDidMount() {
        this.getAssoprofil();
    }


    getAssoprofil = e => {
        this.setState({isLoading:true})
        axios
            .get("http://localhost:3002/assoprofil")
            .then( response =>  this.setState({assoProfil:response.data, isLoading:false }))
            
     
  };

  handleChangeDelete = (id) => {
    const response = window.confirm("Etes-vous certain de vouloir supprimer ?");
    if (response)
    {
        
        axios
            .put("http://localhost:3002/assoprofil/"+id, {"is_visible":"0"})
            .then(window.location.reload())

    }

  }


  render() {
    if (!this.state.isLoading)
    return (
      <div>
          <Link to={'/addNewAssoprofil'}><button>Ajouter une Association</button></Link>
          <table className="table">
          <caption>Edition des associations</caption>
                <thead><tr><th> Id </th><th> Nom </th><th> Description </th><th> Adresse </th><th> Logo </th><th> Réseau Social Url 1 </th><th> Réseau Social Url 2 </th><th> Réseau Social Url 3 </th><th> Téléphone </th><th> Site Internet </th><th> Mail </th><th> Departements Id </th><th> Actions </th></tr></thead>
                <tbody>
            {this.state.assoProfil.map((el, index) => 
                
                
                    <tr><td>{el.id}</td><td>{el.name}</td><td>{el.description}</td><td>{el.address}</td><td>{el.logo}</td><td>{el.social_network_url_1}</td><td>{el.social_network_url_2}</td><td>{el.social_network_url_3}</td><td>{el.phone_number}</td><td>{el.web_site}</td><td>{el.mail}</td><td>{el.departements_id}</td><td><Link to={'/modifyAssoprofil/'+el.id}>
                    <button>Modifier</button>
                    </Link>
                    <button onClick={()=>this.handleChangeDelete(el.id)}>Supprimer</button></td></tr>
                    
                    
            

            )
        }
        </tbody>
        </table>
      </div>
    );
    else return (<div> Loading ....</div>)
  }
}

export default Assoprofil;
