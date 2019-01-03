import React, { Component } from 'react'
import axios from 'axios';
import './AssoByDept.css'

export default class AssoByDept extends Component {
  
  state = { assobydept : [] }

  componentDidMount() {
    this.getAssoByDept()
}

getAssoByDept() {
  
  const dept = [75,77,78,91,92,93,94,95]
  let id = dept.indexOf(Number(this.props.match.params.id)) + 1 
  
    axios.get('/assoprofil/filterbydept/' + id)
    .then(res => this.setState({ assobydept : res.data }))

   
}

  render() {
console.log(this.state.assobydept);

    return (
      <div >
        {this.state.assobydept.map((e,i) =>
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
