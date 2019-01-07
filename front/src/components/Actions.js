import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import colis from './imgActions/colis.png';
import accompagnement from './imgActions/accompagnement.png';
import culture from './imgActions/culture.png';
import etranger from './imgActions/etranger.png';
import maraude from './imgActions/maraude.png';
import table from './imgActions/table-solidaire.png';
import visite from './imgActions/visite.png';
import soutient from './imgActions/soutient.png';
import migrant from './imgActions/migrant.png';
import { Collapse } from "reactstrap";


import './Actions.css'



class Actions extends Component {

    state = {
        actionList: [],
        isLoading: true,
        name: "",
        definition: "",
        collapse: false,
    }

    onClick1 = () => {
        this.setState({ name: this.state.actionList[0].name, definition: this.state.actionList[0].definition, id: 1, collapse: true, })
    }


    onClick2 = () => {
        this.setState({ name: this.state.actionList[1].name, definition: this.state.actionList[1].definition, id: 2, collapse: true, })
    }

    onClick3 = () => {
        this.setState({ name: this.state.actionList[2].name, definition: this.state.actionList[2].definition, id: 3, collapse: true, })
    }

    onClick4 = () => {
        this.setState({ name: this.state.actionList[3].name, definition: this.state.actionList[3].definition, id: 4, collapse: true, })
    }

    onClick5 = () => {
        this.setState({ name: this.state.actionList[4].name, definition: this.state.actionList[4].definition, id: 5, collapse: true, })
    }
    onClick6 = () => {
        this.setState({ name: this.state.actionList[5].name, definition: this.state.actionList[5].definition, id: 6, collapse: true, })
    }
    onClick7 = () => {
        this.setState({ name: this.state.actionList[6].name, definition: this.state.actionList[6].definition, id: 7, collapse: true, })
    }

    onClick8 = () => {
        this.setState({ name: this.state.actionList[7].name, definition: this.state.actionList[7].definition, id: 8, collapse: true, })
    }
    onClick9 = () => {
        this.setState({ name: this.state.actionList[8].name, definition: this.state.actionList[8].definition, id: 9, collapse: true, })
    }


    getAction = async () => {
        await axios
            .get("/actions")
            .then(response => this.setState({ actionList: response.data, isLoading: false }))

    };

    componentDidMount() {
        this.getAction()

    }


    render() {
        if (this.state.isLoading) return "loading"
        else
            return (
                <div class="container-fluid" >
                    <Collapse isOpen={this.state.collapse} >
                        <div class="row">
                            <div class='definition  col-sm-12 offset-md-2 col-md-8'>
                                <h1 >Action: </h1><h2>{this.state.name}</h2>
                                <p>{this.state.definition}</p> {this.state.definition ? <Link to={'/actions/' + this.state.id}>
                                    <button type="button" class="btn btn-success">Liste des Associations</button></Link> : null}
                            </div>
                        </div>
                    </Collapse>
                    <div class="action">
                    <div class="row">
                        <div class='col-sm-12 col-md-6 col-xl-4'> <a href="#logo"><button type="button"  class="rounded-circle actionbtn btn-outline-dark bg-danger" onClick={this.onClick1} ><img src={maraude} alt="icon maraude" title="maraude mobile" class='actionlogo' /></button></a><h3>Maraudes mobiles</h3></div>
                        <div class='col-sm-12 col-md-6 col-xl-4'><a href="#logo"> <button type="button" class="rounded-circle actionbtn btn-outline-dark bg-warning" onClick={this.onClick2} ><img src={table} alt="icon table" title="table solidaire" class='actionlogo' /></button></a><h3>Table solidaire</h3></div>
                        <div class='col-sm-12 col-md-6 col-xl-4'><a href="#logo"><button type="button" class="rounded-circle actionbtn btn-outline-dark bg-success" onClick={this.onClick3} ><img src={colis} alt="icon colis" title="colis alimentaires" class='actionlogo'/></button></a><h3>Colis alimentaires</h3></div>

                        <div class='col-sm-12 col-md-6 col-xl-4'><a href="#logo"><button type="button" class="rounded-circle actionbtn btn-outline-dark bg-primary" onClick={this.onClick4} ><img src={visite} alt="icon visite" title="visite aux isolés" class='actionlogo'/></button></a><h3>Visite aux isolés</h3></div>
                        <div class='col-sm-12 col-md-6 col-xl-4'><a href="#logo"> <button type="button" class="rounded-circle actionbtn btn-outline-dark bg-danger" onClick={this.onClick5} ><img src={accompagnement} alt="icon accompagnement" title="accompagnement administratif" class='actionlogo'/></button></a><h3>Accompagnement administratif</h3></div>
                        <div class='col-sm-12 col-md-6 col-xl-4'><a href="#logo"> <button type="button" class="rounded-circle actionbtn btn-outline-dark bg-warning" onClick={this.onClick6} ><img src={culture} alt="icon culture" title="culture et loisirs" class='actionlogo'/></button></a><h3>Culture et loisir</h3></div>

                        <div class='col-sm-12 col-md-6 col-xl-4'><a href="#logo"><button type="button" class="rounded-circle actionbtn btn-outline-dark bg-success" onClick={this.onClick7} ><img src={soutient} alt="icon soutient" title="soutient scolaire" class='actionlogo'/></button></a><h3>Soutient scolaire</h3></div>
                        <div class='col-sm-12 col-md-6 col-xl-4'><a href="#logo"> <button type="button" class="rounded-circle actionbtn btn-outline-dark bg-primary" onClick={this.onClick8} ><img src={etranger} alt="icon etranger" title="aide à l'étranger" class='actionlogo'/></button></a><h3>Aide à l'étranger</h3></div>
                        <div class='col-sm-12 col-md-12 col-xl-4'><a href="#logo"><button type="button" class="rounded-circle actionbtn btn-outline-dark bg-danger" onClick={this.onClick9} ><img src={migrant} alt="icon migrant" title="aide aux migrants" class='actionlogo' /></button></a><h3>Aide aux migrants</h3></div>

                        
                    </div>
                    </div>
                </div>



            )
    }
}

export default Actions

