import React, { Component } from "react";
import axios from "axios";

class ModifyNewAssoprofil extends Component {
    state = {
        modifyInputValue: { is_visible: "1" }
    };

    componentDidMount() {
        this.getAssoprofil();
    }
    handleChange = e => {
        const modifyInputValue = { ...this.state.modifyInputValue }
        modifyInputValue[e.target.name] = e.target.value;
        this.setState({ modifyInputValue });
    };

    getAssoprofil = e => {
        this.setState({ isLoading: true })
        axios
            .get("http://localhost:3002/assoprofil/" + this.props.match.params.id)
            .then(response => this.setState({ modifyInputValue: response.data[0], isLoading: false }));

        // .then(window.location.reload());

    };


    submitModifyAssoprofil = e => {
        e.preventDefault();

        axios
            .put("http://localhost:3002/assoprofil/" + this.props.match.params.id, this.state.modifyInputValue)
        // .then(window.location.reload());

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
                    <input
                        type="text"
                        name="name"
                        placeholder="Nom de l'association"
                        value={this.state.modifyInputValue.name}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description de l'association"
                        value={this.state.modifyInputValue.description}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Adresse de l'association"
                        value={this.state.modifyInputValue.address}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="social_network_url_1"
                        placeholder="Réseau social 1"
                        value={this.state.modifyInputValue.social_network_url_1}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="social_network_url_2"
                        placeholder="Réseau social 2"
                        value={this.state.modifyInputValue.social_network_url_2}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="social_network_url_3"
                        placeholder="Réseau social 3"
                        value={this.state.modifyInputValue.social_network_url_3}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Téléphone de l'association"
                        value={this.state.modifyInputValue.phone_number}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="logo"
                        placeholder="Logo de l'association"
                        value={this.state.modifyInputValue.logo}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="web_site"
                        placeholder="L'url internet de l'association"
                        value={this.state.modifyInputValue.web_site}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="mail"
                        placeholder="Adresse mail de l'association"
                        value={this.state.modifyInputValue.mail}
                        onChange={this.handleChange}
                    />
                    <select required name="departements_id" onChange={this.handleChange} value={this.state.modifyInputValue.departements_id}>
                        <option name="departements_id" value="">Sélectionner le dépt.</option>
                        <option name="departements_id" value="1">75 Paris</option>
                        <option name="departements_id" value="2">92 Hauts-de-Seine</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>

            </div>
        );
    }
}

export default ModifyNewAssoprofil;
