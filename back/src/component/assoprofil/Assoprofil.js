import React, { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

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
       console.log(this.state.assoProfil)
    if (!this.state.isLoading)
    return (
      <div>
            {this.state.assoProfil.map((el, index) => 
                <div key={index}>
                    {el.id}{" "}
                    {el.name}
                    <Link to={'/modifyAssoprofil/'+el.id}>
                    <button>Modify</button>
                    </Link>
                    <button onClick={()=>this.handleChangeDelete(el.id)}>Delete</button>
                </div>

            )
        }
      </div>
    );
    else return (<div> Loading ....</div>)
  }
}

export default Assoprofil;
