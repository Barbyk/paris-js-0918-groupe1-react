import React, { Component } from 'react';
import './App.css';
import './components/Map.css'
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import Map from './components/Map'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/trouverunemaraude" component ={ Map } />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
