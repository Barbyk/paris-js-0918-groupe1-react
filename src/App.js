import React, { Component } from 'react';
import axios from 'axios'


class App extends Component {
  state = {
    assoName :"",
    assoLogo : "",
  }

  handleChangeTxt = (e) => {
    this.setState({assoName: e.target.value});
    
  }
  handleChangeLogo = (e) => {
    this.setState({assoLogo: e.target.value});
    
  }
  
  submitAssoName = (e) => {
    console.log('tutu',this.state);
    e.preventDefault();
    if (!this.state.assoName) alert('asso name is empty');
    else {
      axios.post('http://localhost:3002/asso', this.state)
        .then(this.setState({assoName: '',assoLogo:''}))
        // .then(window.location.reload());
    }
  }

  modifyAsso = (id=2) => {
    // const assoNameToModify = this.state.allAsso.filter(item => item.id === id)[0].AssoName;
    const newName = prompt("What the new asso name ?", 'emmaus');
    if (newName)
    console.log('test',newName,id);
    
      axios.put(`http://localhost:3002/asso/${id}`,{ newName })
      // .then(window.location.reload());
  };

  render() {
    return (
      <div >
         <form onSubmit={this.submitAssoName}>
          <input
            type="text"
            name="assoName"
            placeholder="Nom de l'association"
            value={this.state.assoName}
            onChange={this.handleChangeTxt}
          />
          <input
            type="text"
            name="assoLogo"
            placeholder="Logo de l'association"
            value={this.state.assoLogo}
            onChange={this.handleChangeLogo}
          />
          <button type="submit">Submit</button>

      </form>
      <button type="" onClick={()=>this.modifyAsso()}>modifier</button>
        
      </div>
    );
  }
}

export default App;
