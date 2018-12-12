import React, { Component } from "react";
import axios from "axios";
import Input from '../Input'
import Checkbox from '../Checkbox'
import Departements from '../Departements'
import withAuth from '../withAuth';


class AddNewAssoprofil extends Component {
  state = {
    addInputValue: { is_visible: "1",actions:[] },
    actionsOptions: ["Maraudes mobiles","Tables solidaires","Colis alimentaires","Visites aux isolés","Accompagnement administratif",
    "Cultures et loisirs","Soutien scolaire","Actions de l'étranger","Aide aux migrants"],
  };

  handleChange = e => {
    const addInputValue = { ...this.state.addInputValue }
    addInputValue[e.target.name] = e.target.value;
    this.setState({ addInputValue });
  };

  handleActionsCheckBox=(e)=> {
    
    const newSelection = parseInt(e.target.name);
    let newSelectionArray;
    // if pour les cas de déselection de la checkbox, on enleve la valeur du tableau
    if ((this.state.addInputValue.actions||[]).indexOf(newSelection) > -1) {
      newSelectionArray = this.state.addInputValue.actions.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.addInputValue.actions||[],  newSelection ];
    }

    this.setState({
      addInputValue:
        { ...this.state.addInputValue, actions: newSelectionArray }
    })

}

  submitNewAssoprofil = e => {
    e.preventDefault();

    axios
      .post("http://localhost:3002/assoprofil", this.state.addInputValue,{headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("id_token")}})
      .then(this.setState({}))
     .then(window.history.back() );
    alert("Association ajoutée !")
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitNewAssoprofil}>

          <fieldset><legend>Ajouter une association</legend></fieldset>
          <Input name="name" label="Nom*" value={this.state.addInputValue.name} handleChange={this.handleChange} isRequired={"required"} />
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
          <Input name="address" label="Adresse" value={this.state.addInputValue.address} handleChange={this.handleChange} isRequired={false} />
          <Input name="social_network_url_1" label="Social 1" value={this.state.addInputValue.social_network_url_1} handleChange={this.handleChange} isRequired={false} />
          <Input name="social_network_url_2" label="Social 2" value={this.state.addInputValue.social_network_url_2} handleChange={this.handleChange} isRequired={false} />
          <Input name="social_network_url_3" label="Social 3" value={this.state.addInputValue.social_network_url_3} handleChange={this.handleChange} isRequired={false} />
          <Input name="phone_number" label="Téléphone" value={this.state.addInputValue.phone_number} handleChange={this.handleChange} isRequired={false} />
          <Input name="logo" label="Logo" value={this.state.addInputValue.logo} handleChange={this.handleChange} isRequired={false} />
          <Input name="web_site" label="Site Internet" value={this.state.addInputValue.web_site} handleChange={this.handleChange} isRequired={false} />
          <Input name="mail" label="Adresse mail" value={this.state.addInputValue.mail} handleChange={this.handleChange} isRequired={false} />
          <Departements value={this.state.addInputValue.departements_id} handleChange={this.handleChange}/>

          <Checkbox name="actions" title="Actions" options={this.state.actionsOptions} selectedOptions={this.state.addInputValue.actions} handleChange={this.handleActionsCheckBox} isRequired={false} />
          <div><button type="submit">Submit</button></div>
        </form>
      </div>
    );
  }
}

export default withAuth(AddNewAssoprofil);
