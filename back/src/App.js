import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import AddNewAssoprofil from "./component/assoprofil/AddNewAssoprofil";
import ModifyAssoprofil from "./component/assoprofil/ModifyAssoprofil";
import Assoprofil from "./component/assoprofil/Assoprofil"
import Locations from "./component/locations/Locations";
import AddLocation from "./component/locations/AddLocation";
import ModifyLocation from "./component/locations/ModifyLocation";

class App extends Component {
  render(){
    return(
      <div>
         <Switch>
            <Route path="/addNewAssoprofil" component={AddNewAssoprofil} />
            <Route path="/modifyAssoprofil/:id" component={ModifyAssoprofil} />
            <Route exact path="/Assoprofil" component={Assoprofil} />
            <Route path="/locations" component={Locations}/>
            <Route path="/addNewLocation" component={AddLocation}/>
            <Route path="/modifyLocation/:id" component={ModifyLocation}/>

          </Switch>
      </div>
    )
  }

}
export default App;
