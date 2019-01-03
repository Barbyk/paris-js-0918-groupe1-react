import React, { Component } from 'react';
import './App.css';
import './components/Map.css'
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Actions from'./components/Actions';
import Footer from './components/Footer';
import Header from './components/Header';
import Associations from './components/Associations';
import Map from './components/Map'
import Calendrier from './components/Calendrier'
import AssoByDept from './components/AssoByDept'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
            <Route exact path='/' component={Home} />

            <Route exact path='/calendrier' component={Calendrier} />

            <Route path="/associations" component ={Associations} />

            <Route exact path="/trouverunemaraude" component = { Map } />
            <Route path ="/trouverunemaraude/:id" component = { AssoByDept } />
            <Route path ="/actions" component = { Actions } />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
