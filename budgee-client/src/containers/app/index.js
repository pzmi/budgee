import React from 'react';
import {Route} from 'react-router-dom'
import Home from '../home'
import Transactions from '../transactions'
import About from '../about'
import Header from '../header'
import {Switch} from "react-router";
import NoMatch from "../nomatch";

const App = () => (
  <div>
    <Header/>
    <main>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/transactions/:user" component={Transactions}/>
        <Route exact path="/about" component={About}/>
        <Route component={NoMatch}/>
      </Switch>

    </main>
  </div>
);

export default App
