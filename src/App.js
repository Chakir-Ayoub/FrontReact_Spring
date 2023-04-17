import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VilleEdit from './VilleEdit';
import VilleList from './VilleList';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/villes' exact={true} component={VilleList}/>
            <Route path='/villes/:id' component={VilleEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;