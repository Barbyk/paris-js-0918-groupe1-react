import React, { Component } from 'react';
import axios from 'axios';
import Input from '../Input';
import {Link} from "react-router-dom"
import LocationCategory from '../LocationCategory';
import withAuth from '../withAuth';

class ModifyLocation extends Component {

    state = {
        modifyInputValue: { is_active: "1" }
    };

    submitModifyLocation = e => {
        e.preventDefault();

        axios
            .put("/locations/" + this.props.match.params.id, this.state.modifyInputValue)
            .then(window.history.back());
            
            
            
        alert("Les modifications sont enregistrées")
       
        

    };
    componentDidMount() {
        this.getLocation();
    }
    handleChange = (e) => {
        this.setState({
            modifyInputValue: {
                ...this.state.modifyInputValue,
                [e.target.name]: e.target.value,
            }
        });console.log(this.state.modifyInputValue)
    };

    getLocation = e => {
        this.setState({ isLoading: true })
        axios
            .get("/locations/" + this.props.match.params.id)
            .then(response => this.setState({ modifyInputValue: response.data[0], isLoading: false }))
            console.log();
        
        // .then(window.location.reload());

    };

    render() {
        return (
            <div>
                <form onSubmit={this.submitModifyLocation}>

                    <fieldset><legend>Modifier le lieu {this.state.modifyInputValue.name}</legend></fieldset>
                    <Input name="name" label="Nom*" value={this.state.modifyInputValue.name} handleChange={this.handleChange} isRequired={"required"} />
                    <Input name="img_url" label="Image du lieu" value={this.state.modifyInputValue.img_url} handleChange={this.handleChange} isRequired={false} />
                    <LocationCategory value={this.state.modifyInputValue.departements_id} handleChange={this.handleChange}/>
                    <div><button type="submit">Soumettre</button></div>
                </form>
                <Link to ={"/locations"}><button>Retour liste des lieux</button></Link>
            </div>
        )
    }
}

export default withAuth(ModifyLocation)