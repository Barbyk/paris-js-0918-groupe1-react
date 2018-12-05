import React, { Component } from "react";
import axios from "axios";
import "../assoprofil/ModifyAssoprofil.css"
import Input from '../Input'

class ModifArticle extends Component {
    state = {
        modifyInputValue: { is_active: "1" }
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
            .get("http://localhost:3030/news/" + this.props.match.params.id)
            .then(response => this.setState({ modifyInputValue: response.data[0], isLoading: false }))
            
        // .then(window.location.reload());

    };


    submitModifyAssoprofil = e => {
        e.preventDefault();

        axios
            .put("http://localhost:3030/news/" + this.props.match.params.id, this.state.modifyInputValue)
            .then(window.history.back() );
        alert("Les modifications sont enregistrées")

    };
    
    render() {
        return (
            <div>
                <form onSubmit={this.submitModifyAssoprofil}>

                <fieldset><legend>Modifier l'article {this.state.modifyInputValue.title}</legend></fieldset>
                <Input name="title" label="Titre" value={this.state.modifyInputValue.title} handleChange={this.handleChange} isRequired={"required"}/>
                <div className="form-group">
                    <label className="control-label">text</label>
                    <textarea
                    rows={"3"} cols={"1"}
                        className="form-control"
                        type="text"
                        name="text"
                        value={this.state.modifyInputValue.text}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <Input name="img_url" label="image" value={this.state.modifyInputValue.img_url} handleChange={this.handleChange} isRequired={false}/>
                <div className="form-group">
                <label className="control-label">date</label>
                <input
                    className="form-control"
                    type="date"
                    name="date"
                    onChange={this.handleChange}
                    value={this.state.modifyInputValue.date}
                    id="date"
                    required
                />
            </div>
                
                    

                    <div><button type="submit">Soumettre</button></div>
                </form>

            </div>
        );
    }
}

export default ModifArticle;
