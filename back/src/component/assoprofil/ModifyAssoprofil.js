import React, { Component } from "react";
import axios from "axios";
import "./ModifyAssoprofil.css"
import Input from '../Input'
import Departements from '../Departements'

class ModifyNewAssoprofil extends Component {
    state = {
        modifyInputValue: { is_visible: "1" }
    };

    componentDidMount() {
        this.getAssoprofil();
    }
    handleChange = (e) => {
        this.setState({ modifyInputValue:{...this.state.modifyInputValue,
            [e.target.name] : e.target.value,} });
    };

    getAssoprofil = e => {
        this.setState({ isLoading: true })
        axios
            .get("http://localhost:3002/assoprofil/" + this.props.match.params.id)
            .then(response => this.setState({ modifyInputValue: response.data[0], isLoading: false }))
            
        // .then(window.location.reload());

    };


    submitModifyAssoprofil = e => {
        e.preventDefault();

        axios
            .put("http://localhost:3002/assoprofil/" + this.props.match.params.id, this.state.modifyInputValue)
            .then(window.history.back() );
        alert("Les modifications sont enregistrées")

    };
    
    render() {
        return (
            <div>
                <form onSubmit={this.submitModifyAssoprofil}>

                <fieldset><legend>Modifier l'association {this.state.modifyInputValue.name}</legend></fieldset>
                <Input name="name" label="Nom*" value={this.state.modifyInputValue.name} handleChange={this.handleChange} isRequired={"required"}/>
                <div className="form-group">
                    <label class="control-label">Description*</label>
                    <textarea
                    rows={"5"} cols={"1"}
                        className="form-control"
                        type="text"
                        name="description"
                        value={this.state.modifyInputValue.description}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <Input name="address" label="Adresse" value={this.state.modifyInputValue.address} handleChange={this.handleChange} isRequired={false}/>
                <Input name="social_network_url_1" label="Social 1" value={this.state.modifyInputValue.social_network_url_1} handleChange={this.handleChange} isRequired={false}/>
                <Input name="social_network_url_2" label="Social 2" value={this.state.modifyInputValue.social_network_url_2} handleChange={this.handleChange} isRequired={false}/>
                <Input name="social_network_url_3" label="Social 3" value={this.state.modifyInputValue.social_network_url_3} handleChange={this.handleChange} isRequired={false}/>
                <Input name="phone_number" label="Téléphone" value={this.state.modifyInputValue.phone_number} handleChange={this.handleChange} isRequired={false}/>
                <Input name="logo" label="Logo" value={this.state.modifyInputValue.logo} handleChange={this.handleChange} isRequired={false}/>
                <Input name="web_site" label="Site Internet" value={this.state.modifyInputValue.web_site} handleChange={this.handleChange} isRequired={false}/>
                <Input name="mail" label="Adresse mail" value={this.state.modifyInputValue.mail} handleChange={this.handleChange} isRequired={false}/>
               <Departements value={this.state.modifyInputValue.departements_id} handleChange={this.handleChange}/>


                    <div><button type="submit">Soumettre</button></div>
                </form>

            </div>
        );
    }
}

export default ModifyNewAssoprofil;
