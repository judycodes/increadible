import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Landing from './components/Landing';

const Routes = () => {

        return (
            <Switch>
                <Route exact path="/" component={Landing} />

            </Switch>
        )

};

export default Routes;

// <Route path="/home" component={Home} />
// <Route path="/about" component={About} />
//
// <Route path="/*" component={NotFound} />
