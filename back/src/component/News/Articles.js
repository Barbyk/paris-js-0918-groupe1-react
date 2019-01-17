import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import '../assoprofil/Assoprofil.css'
import withAuth from '../withAuth';
import moment from 'moment'



class Articles extends Component {
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
            .get("/news",{headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")}})
            .then(response => this.setState({ assoProfil: response.data, isLoading: false }))


    };

    handleChangeDelete = (id) => {
        const response = window.confirm("Etes-vous certain de vouloir supprimer ?");
        if (response) {
            axios
                .put("/news/" + id, { "is_active": "0" },{headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("id_token")}})
                .then(window.location.reload())
        }
    }
    render() {


        
        if (!this.state.isLoading)
            return (
                <div>
                    <Link to={'/addarticle'}><button>Ajouter un article</button></Link>
                    <table className="table">
                        <caption>Edition des articles</caption>
                        <thead><tr><th> Id </th><th> Titre</th><th> Texte</th><th> Image URL </th><th> Date</th></tr></thead>
                        <tbody>
                            {this.state.assoProfil.map((el, index) =>
                              <tr key={index}><td>{el.id}</td><td>{el.title}</td><td>{el.text}</td><td><img src={el.img_url} alt=""/></td><td>{ moment(el.date).format('DD-MM-YYYY')  }</td>
                                    <td><Link to={'/modifarticle/' + el.id}>
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

export default withAuth(Articles);
