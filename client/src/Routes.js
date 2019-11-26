import React from 'react';
import {Route, Switch} from 'react-router-dom';



//custom components
import Landing from './components/Landing';
import Home from './components/Home';
import Search from './components/Search';
import About from './components/About';


const Routes = () => {

  return (
      <Switch>

      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/about" component={About} />

      </Switch>
  )

};

export default Routes;

// TODO: Make NotFound Component and Route functional
// <Route path="/*" component={NotFound} />
