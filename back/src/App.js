import React, { Component } from "react";
import { Route, Switch, Link } from 'react-router-dom';
import AddNewAssoprofil from "./component/assoprofil/AddNewAssoprofil";
import ModifyAssoprofil from "./component/assoprofil/ModifyAssoprofil";
import Assoprofil from "./component/assoprofil/Assoprofil"
import AddArticle from "./component/News/AddArticle";
import ModifArticle from "./component/News/ModifArticle"
import Articles from "./component/News/Articles"
import Button from '@material-ui/core/Button';


class App extends Component {
  render() {
    return (
      <div>
        <Link to={`/assoprofil`}><Button>Associations</Button></Link>
        <Link to={`/articles`}><Button>Articles</Button></Link>
        <Link to={`/locations`}><Button>Lieux</Button></Link>
        <Switch>
          <Route path="/addNewAssoprofil" component={AddNewAssoprofil} />
          <Route path="/modifyAssoprofil/:id" component={ModifyAssoprofil} />
          <Route path="/assoprofil" component={Assoprofil} />
          <Route exact path="/addArticle" component={AddArticle} />
          <Route path="/modifArticle/:id" component={ModifArticle} />
          <Route path="/articles/" component={Articles} />
        </Switch>
       
      </div>
    )
  }

}
export default App;
