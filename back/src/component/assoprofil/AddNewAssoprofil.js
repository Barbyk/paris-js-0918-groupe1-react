import React, { Component } from "react";
import axios from "axios";
import Saisie from '../Input'

class AddNewAssoprofil extends Component {
  state = {
    addInputValue: { is_visible: "1" }
  };

  handleChange = e => {
    const addInputValue = { ...this.state.addInputValue }
    addInputValue[e.target.name] = e.target.value;
    this.setState({ addInputValue });
  };


  submitNewAssoprofil = e => {
    e.preventDefault();

    axios
      .post("http://localhost:3002/assoprofil", this.state.addInputValue)
      .then(this.setState({}))
     .then(window.history.back() );
    alert("Association ajouté !")
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitNewAssoprofil}>

<fieldset><legend>Ajouter une association</legend></fieldset>
<Saisie name="name" label="Nom*" value={this.state.addInputValue.name} handleChange={this.handleChange} isRequired={"required"}/>
<div className="form-group">
    <label class="control-label">Description*</label>
    <textarea
    rows={5} cols={1}
        className="form-control"
        type="text"
        name="description"
        value={this.state.addInputValue.description}
        onChange={this.handleChange}
        required
    />
</div>
<Saisie name="address" label="Adresse" value={this.state.addInputValue.address} handleChange={this.handleChange} isRequired={false}/>
<Saisie name="social_network_url_1" label="Social 1" value={this.state.addInputValue.social_network_url_1} handleChange={this.handleChange} isRequired={false}/>
<Saisie name="social_network_url_2" label="Social 2" value={this.state.addInputValue.social_network_url_2} handleChange={this.handleChange} isRequired={false}/>
<Saisie name="social_network_url_3" label="Social 3" value={this.state.addInputValue.social_network_url_3} handleChange={this.handleChange} isRequired={false}/>
<Saisie name="phone_number" label="Téléphone" value={this.state.addInputValue.phone_number} handleChange={this.handleChange} isRequired={false}/>
<Saisie name="logo" label="Logo" value={this.state.addInputValue.logo} handleChange={this.handleChange} isRequired={false}/>
<Saisie name="web_site" label="Site Internet" value={this.state.addInputValue.web_site} handleChange={this.handleChange} isRequired={false}/>
<Saisie name="mail" label="Adresse mail" value={this.state.addInputValue.mail} handleChange={this.handleChange} isRequired={false}/>

    <label class="control-label">Departement</label>
    <select required name="departements_id" onChange={this.handleChange} value={this.state.addInputValue.departements_id}>
        <option name="departements_id" value="">Sélectionner le dépt.</option>
        <option name="departements_id" value="1">75 Paris</option>
        <option name="departements_id" value="2">92 Hauts-de-Seine</option>
    </select>

    <div><button type="submit">Submit</button></div>
</form>
      </div>
    );
  }
}

export default AddNewAssoprofil;
