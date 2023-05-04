import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VilleEdit from './VilleEdit';
import VilleList from './VilleList';
import ZoneList from './ZoneList';
import ZoneEdit from './ZoneEdit';
import SpecialiteListe from './SpecialiteListe';
import SpecialiteEdit from './SpecialiteEdit';
class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
          
            <Route path='/' exact={true} component={Home}/>
            <Route path='/villes' exact={true} component={VilleList}/>
            <Route path='/villes/:id' component={VilleEdit}/>

             <Route path='/zone' exact={true} component={ZoneList}/> 
             <Route path='/zone/:id' exact={true} component={ZoneEdit}/> 

             <Route path='/specialite' exact={true} component={SpecialiteListe}></Route>
             <Route path='/specialite/:id' exact={true} component={SpecialiteEdit}/> 

          </Switch>
        </Router>
    )
  }
}

export default App;