import React, { Component } from "react";
import axios from 'axios';

import colis from './imgActions/colis.png';
import accompagnement from './imgActions/accompagnement.png';
import culture from './imgActions/culture.png';
import etranger from './imgActions/etranger.png';
import maraude from './imgActions/maraude.png';
import table from './imgActions/table-solidaire.png';
import visite from './imgActions/visite.png';
import soutient from './imgActions/soutient.png';
import migrant from './imgActions/migrant.png';

import './Actions.css'






class Actions extends Component {

    state = {
        actionList: [],
        isLoading: true,
        name:"",
        definition: "",
    }

    onClick1 = () => {
        this.setState({ name:this.state.actionList[0].name, definition:this.state.actionList[0].definition })
    }


    onClick2 = () => {
        this.setState({ name:this.state.actionList[1].name, definition:this.state.actionList[1].definition })
    }

    onClick3 = () => {
        this.setState({ name:this.state.actionList[2].name, definition:this.state.actionList[2].definition })
    }

    onClick4 = () => {
        this.setState({ name:this.state.actionList[3].name, definition:this.state.actionList[3].definition })
    }

    onClick5 = () => {
        this.setState({ name:this.state.actionList[4].name, definition:this.state.actionList[4].definition })
    }
    onClick6 = () => {
        this.setState({ name:this.state.actionList[5].name, definition:this.state.actionList[5].definition })
    }
    onClick7 = () => {
        this.setState({ name:this.state.actionList[6].name, definition:this.state.actionList[6].definition })
    }

    onClick8 = () => {
        this.setState({ name:this.state.actionList[7].name, definition:this.state.actionList[7].definition })
    }
    onClick9 = () => {
    this.setState({ name:this.state.actionList[8].name, definition:this.state.actionList[8].definition})
    }


    getAction = async () => {
        await axios
            .get("http://localhost:3002/actions")
            .then(response => this.setState({ actionList: response.data, isLoading: false }))

    };

    componentDidMount() {
        this.getAction()

    }
    render() {
        if (this.state.isLoading) return "loading"
        else
            return (
                <div class='action'>
                <div class='definition'>
                    <h1>Action: </h1><h2>{this.state.name}</h2>  <p>{this.state.definition}</p>
                    </div>
                <div class='icons'>
                    <section class='first'>
                        <button onClick={this.onClick4} class="mybut"><img src={visite} alt="icon visite" title="visite aux isolés"/></button>
                        <button onClick={this.onClick3} class="mybut"><img src={colis} alt="icon colis" title="colis alimentaires"/></button>
                        <button onClick={this.onClick5} class="mybut">><img src={accompagnement} alt="icon accompagnement" title="accompagnement administratif" /></button>
                    </section>
                    <section class="second">
                        <button onClick={this.onClick8} class="mybut"><img src={etranger} alt="icon etranger" title="aide à l'étranger"/></button>
                        <button onClick={this.onClick6} class="mybut"><img src={culture} alt="icon culture" title="culture et loisirs" /></button>
                        <button onClick={this.onClick1} class="mybut"><img src={maraude} alt="icon maraude" title="maraude mobile"/></button>
                    </section>
                    <section class="third">
                        <button onClick={this.onClick2} class="mybut"><img src={table} alt="icon table" title="table solidaire" /></button>
                        <button onClick={this.onClick7} class="mybut"><img src={soutient} alt="icon soutient" title="soutient scolaire"/></button>
                        <button onClick={this.onClick9} class="mybut"><img src={migrant} alt="icon migrant" title="aide aux migrants"/></button>
                    </section>
                    </div>
                    </div>
                
                
            )
    }
}

export default Actions

