import React, { Component } from "react";
import axios from "axios";
import "./ModifyAssoprofil.css"
import Saisie from '../Input'

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
    
    /*   modifyAsso = (id = 2) => {
        // const assoNameToModify = this.state.allAsso.filter(item => item.id === id)[0].AssoName;
        const newName = prompt("What the new asso name ?", "emmaus");
        if (newName) console.log("test", newName, id);
    
        axios.put(`http://localhost:3002/asso/${id}`, { newName });
        // .then(window.location.reload());
      };
     */
    render() {
        return (
            <div>
                <form onSubmit={this.submitModifyAssoprofil}>

                <fieldset><legend>Modifier l'association {this.state.modifyInputValue.name}</legend></fieldset>
                <Saisie name="name" label="Nom*" value={this.state.modifyInputValue.name} handleChange={this.handleChange} isRequired={"required"}/>
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
                <Saisie name="address" label="Adresse" value={this.state.modifyInputValue.address} handleChange={this.handleChange} isRequired={false}/>
                <Saisie name="social_network_url_1" label="Social 1" value={this.state.modifyInputValue.social_network_url_1} handleChange={this.handleChange} isRequired={false}/>
                <Saisie name="social_network_url_2" label="Social 2" value={this.state.modifyInputValue.social_network_url_2} handleChange={this.handleChange} isRequired={false}/>
                <Saisie name="social_network_url_3" label="Social 3" value={this.state.modifyInputValue.social_network_url_3} handleChange={this.handleChange} isRequired={false}/>
                <Saisie name="phone_number" label="Téléphone" value={this.state.modifyInputValue.phone_number} handleChange={this.handleChange} isRequired={false}/>
                <Saisie name="logo" label="Logo" value={this.state.modifyInputValue.logo} handleChange={this.handleChange} isRequired={false}/>
                <Saisie name="web_site" label="Site Internet" value={this.state.modifyInputValue.web_site} handleChange={this.handleChange} isRequired={false}/>
                <Saisie name="mail" label="Adresse mail" value={this.state.modifyInputValue.mail} handleChange={this.handleChange} isRequired={false}/>

                    <label class="control-label">Departement* </label>
                    <select required name="departements_id" onChange={this.handleChange} value={this.state.modifyInputValue.departements_id}>
                        <option name="departements_id" value="">Sélectionner le dépt.</option>
                        <option name="departements_id" value="1">75 Paris</option>
                        <option name="departements_id" value="2">92 Hauts-de-Seine</option>
                    </select>

                    <div><button type="submit">Soumettre</button></div>
                </form>

            </div>
        );
    }
}

export default ModifyNewAssoprofil;
