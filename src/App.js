import './App.css';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Routes, Route, Link, Switch } from "react-router-dom";

import AddRestaurant from "./components/add-restaurant.component";
import Restaurant from "./components/restaurant.component";
import RestaurantsList from "./components/restaurants-list.component";

class App extends Component{
  render(){
    return(
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/restaurants"} className="navbar-brand">
            Restaurant Selecter
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/restaurants"} className="nav-link">
                Restaurants
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={"/add"} className= "nav-link">
                add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={ ["/", "/restaurants"]} component={RestaurantsList}/>
            <Route exact path= "/add" component={AddRestaurant}/>
            <Route path="/restaurants/:id" component= {Restaurant} />
          </Switch>
        </div>
      </Router>
    );

  }
}


export default App;
