import React, { Component } from "react";
import axios from "axios";

class AddNewAssoprofil extends Component {
  state = {
    addInputValue: { is_visible: "1" }
  };

  handleChangeAdd = e => {
    const addInputValue = { ...this.state.addInputValue }
    addInputValue[e.target.name] = e.target.value;
    this.setState({ addInputValue });
  };


  submitNewAssoprofil = e => {
    e.preventDefault();

    axios
      .post("http://localhost:3002/assoprofil", this.state.addInputValue)
      .then(this.setState({}));
    // .then(window.location.reload());

  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitNewAssoprofil}>
          <input
            type="text"
            name="name"
            placeholder="Nom de l'association"
            value={this.state.addInputValue.name}
            onChange={this.handleChangeAdd}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description de l'association"
            value={this.state.addInputValue.description}
            onChange={this.handleChangeAdd}
          />
          <input
            type="text"
            name="address"
            placeholder="Adresse de l'association"
            value={this.state.addInputValue.address}
            onChange={this.handleChangeAdd}
          />
          <input
            type="text"
            name="social_network_url_1"
            placeholder="Réseau social 1"
            value={this.state.addInputValue.social_network_url_1}
            onChange={this.handleChangeAdd}
          />
          <input
            type="text"
            name="social_network_url_2"
            placeholder="Réseau social 2"
            value={this.state.addInputValue.social_network_url_2}
            onChange={this.handleChangeAdd}
          />
          <input
            type="text"
            name="social_network_url_3"
            placeholder="Réseau social 3"
            value={this.state.addInputValue.social_network_url_3}
            onChange={this.handleChangeAdd}
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Téléphone de l'association"
            value={this.state.addInputValue.phone_number}
            onChange={this.handleChangeAdd}
          />
          <input
            type="text"
            name="logo"
            placeholder="Logo de l'association"
            value={this.state.addInputValue.logo}
            onChange={this.handleChangeAdd}
          />
          <input
            type="text"
            name="web_site"
            placeholder="L'url internet de l'association"
            value={this.state.addInputValue.web_site}
            onChange={this.handleChangeAdd}
          />
          <input
            type="text"
            name="mail"
            placeholder="Adresse mail de l'association"
            value={this.state.addInputValue.mail}
            onChange={this.handleChangeAdd}
          />
          <select required name="departements_id" onChange={this.handleChangeAdd} value={this.state.addInputValue.departements_id}>
            <option name="departements_id" value="">Sélectionner le dépt.</option>
            <option name="departements_id" value="1">75 Paris</option>
            <option name="departements_id" value="2">92 Hauts-de-Seine</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        <button type="" onClick={() => this.modifyAsso()}>
          modifier
        </button>
      </div>
    );
  }
}

export default AddNewAssoprofil;
