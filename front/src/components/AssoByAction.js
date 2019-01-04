import React, { Component } from 'react'
import axios from 'axios';


export default class AssoByAction extends Component {
  
  state = { assoByAction : [] }

  componentDidMount() {
    this.getAssoByAction()
}

getAssoByAction() {
  
 
  
  
    axios.get('/assoprofil/filterbyaction/'+ Number(this.props.match.params.id))
    .then(res => this.setState({ assoByAction : res.data }))

   
}

  render() {
console.log(this.state.assoByAction);

    return (
      <div >
        {this.state.assoByAction.map((e,i) =>
        <div className="nocard">
        <p>{e.name}</p>
        <img src={e.logo} alt=""/>
        <p>{e.address}</p>
        <p>{e.description}</p>
        <p>{e.social_network_url_1}</p>
        <p>{e.phone_number}</p>
        <p>{e.web_site}</p>
        <p>{e.mail}</p>
        <p>{this.props.icon ? this.props.icon.map((e)=>
            <img src={this.tab[e-1]}
            alt=""/>
          ):null} </p>
        
        </div>
        )}
        
      </div>
    )
  }
}
