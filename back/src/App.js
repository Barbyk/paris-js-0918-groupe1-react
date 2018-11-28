import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import AddNewAssoprofil from "./component/assoprofil/AddNewAssoprofil";
import ModifyAssoprofil from "./component/assoprofil/ModifyAssoprofil";
import Assoprofil from "./component/assoprofil/Assoprofil"

class App extends Component {
  render(){
    return(
      <div>
         <Switch>
            <Route path="/addNewAssoprofil" component={AddNewAssoprofil} />
            <Route path="/modifyAssoprofil/:id" component={ModifyAssoprofil} />
            <Route exact path="/Assoprofil" component={Assoprofil} />

          </Switch>
      </div>
    )
  }

}
export default App;
