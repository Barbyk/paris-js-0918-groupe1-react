import React, { Component } from 'react'
import axios from 'axios';
import Input from '../Input'

export default class AddLocation extends Component {

    state = {
        addInputValue: { is_active: "1" }
    };
    handleChange = e => {
        const addInputValue = { ...this.state.addInputValue }
        addInputValue[e.target.name] = e.target.value;
        this.setState({ addInputValue });
        console.log(addInputValue);
        
    };


    submitNewLocation = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3002/locations', this.state.addInputValue)
            .then(this.setState({}))
            .then(window.history.back());
            console.log(this.state.addInputValue);
            
        alert("Localisation ajoutée !")
    }


    render() {
        return (
            <div>
                <form onSubmit={this.submitNewLocation}>
                    <fieldset><legend>Ajouter une Localisation</legend></fieldset>
                    <Input name="name" label="Nom*" value={this.state.addInputValue.name} handleChange={this.handleChange} isRequired={"required"} />
                    <Input name="img_url" label="Image" value={this.state.addInputValue.img_url} handleChange={this.handleChange} isRequired={false} />
                    <Input name="departements_id" label="Département*" value={this.state.addInputValue.departements_id} handleChange={this.handleChange} isRequired={"required"} />
                    <div><button type="submit">Submit</button></div>
                </form>
            </div>
        )
    }
}
