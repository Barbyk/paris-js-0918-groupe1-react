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
        <Switch>
          <Route path="/addNewAssoprofil" component={AddNewAssoprofil} />
          <Route path="/modifyAssoprofil/:id" component={ModifyAssoprofil} />
          <Route path="/Assoprofil" component={Assoprofil} />
          <Route exact path="/addArticle" component={AddArticle} />
          <Route path="/modifArticle/:id" component={ModifArticle} />
          <Route path="/articles/" component={Articles} />
        </Switch>
        <Link to={`/addNewAssoprofil`}><Button>addNewAssoprofil</Button></Link>
        <Link to={`/Assoprofill`}><Button>Assoprofil</Button></Link>
        <Link to={`/addArticle`}><Button>addArticle</Button></Link>
        
        <Link to={`/articles`}><Button>Articles</Button></Link>
      </div>
    )
  }

}
export default App;
