import React, { Component } from "react";
import axios from "axios";
import "./ModifyAssoprofil.css"
import Input from '../Input'
import Checkbox from '../Checkbox'
import Departements from '../Departements'
import withAuth from '../withAuth';


class ModifyNewAssoprofil extends Component {
    state = {
        modifyInputValue: { is_visible: "1",actions:[]  },
        actionsOptions: ["Maraudes mobiles","Tables solidaires","Colis alimentaires","Visites aux isolés","Accompagnement administratif",
    "Cultures et loisirs","Soutien scolaire","Actions de l'étranger","Aide aux migrants"],
    };

    componentDidMount() {
        this.getAssoprofil();
    }
    handleChange = (e) => {
        this.setState({ modifyInputValue:{...this.state.modifyInputValue,
            [e.target.name] : e.target.value,} });
    };
    handleActionsCheckBox=(e)=> {
    
        const newSelection = parseInt(e.target.name);
        let newSelectionArray;

        // if pour les cas de déselection de la checkbox, on enleve la valeur du tableau
        if ((this.state.modifyInputValue.actions||[]).indexOf(newSelection) > -1) {
          newSelectionArray = this.state.modifyInputValue.actions.filter(s => s !== newSelection)
        } else {
          newSelectionArray = [...this.state.modifyInputValue.actions||[],  newSelection ];
        }
    
        this.setState({
          modifyInputValue:
            { ...this.state.modifyInputValue, actions: newSelectionArray }
        })
    
    }
    
    getAssoprofil = e => {
        this.setState({ isLoading: true })
        axios
            .get("http://localhost:3002/assoprofil/" + this.props.match.params.id,{headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("id_token")}})
            .then(response => {
                this.setState({ modifyInputValue: response.data[0], isLoading: false })})
            
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
               <Checkbox name="actions" title="Actions" options={this.state.actionsOptions} selectedOptions={this.state.modifyInputValue.actions} handleChange={this.handleActionsCheckBox} isRequired={false} />


                    <div><button type="submit">Soumettre</button></div>
                </form>

            </div>
        );
    }
}

export default withAuth(ModifyNewAssoprofil);
