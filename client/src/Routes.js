import React from 'react';
import {Route, Switch} from 'react-router-dom';



//custom components
import Landing from './components/Landing';
import Home from './components/Home';
import Search from './components/Search';


const Routes = () => {

  return (
      <Switch>

      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/search" component={Search} />

      </Switch>
  )

};

export default Routes;

// <Route path="/about" component={About} />
//
// <Route path="/*" component={NotFound} />
