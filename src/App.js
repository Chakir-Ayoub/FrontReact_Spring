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
import SerieList from './SerieList';
import SerieEdit from './SerieEdit';
import RestoList from './RestoList';
import RestoEdit from './RestoEdit';
import PhotoList from './PhotoList';
import PhotoEdit from './PhotoEdit';
import Login from './Login';
class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
          
            <Route path='/' exact={true} component={Login}/>
            <Route path='/villes' exact={true} component={VilleList}/>
            <Route path='/villes/:id' component={VilleEdit}/>

             <Route path='/zone' exact={true} component={ZoneList}/> 
             <Route path='/zone/:id' exact={true} component={ZoneEdit}/> 

             <Route path='/specialite' exact={true} component={SpecialiteListe}></Route>
             <Route path='/specialite/:id' exact={true} component={SpecialiteEdit}/> 


             <Route path='/serie' exact={true} component={SerieList}></Route>
             <Route path='/serie/:id' exact={true} component={SerieEdit}/> 

             <Route path='/resto' exact={true} component={RestoList}></Route>
             <Route path='/resto/:id' exact={true} component={RestoEdit}/> 

             <Route path='/photo' exact={true} component={PhotoList}></Route>
             <Route path='/photo/:id' exact={true} component={PhotoEdit}/> 
             photo
          </Switch>
        </Router>
    )
  }
}

export default App;