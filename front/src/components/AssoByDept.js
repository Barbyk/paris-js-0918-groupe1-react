import React, { Component } from 'react'
import axios from 'axios';

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

    return (
      <div>
        {this.state.assobydept.map((e,i) =>
        <p>{e.name}</p>
        )}
        
      </div>
    )
  }
}
