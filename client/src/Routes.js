import React from 'react';
import {Route, Switch} from 'react-router-dom';
// import Landing from './components/Landing';

import Search from './components/Search';

const Routes = () => {

        return (
            <Switch>

            <Route exact path="/" component={Search} />

            </Switch>
        )

};

export default Routes;
// <Route exact path="/" component={Landing} />
// <Route path="/home" component={Home} />
// <Route path="/about" component={About} />
//
// <Route path="/*" component={NotFound} />
