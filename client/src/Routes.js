import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Home, About} from './components';

const Routes = () => {

        return (
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/home" component={Home} />
                <Route path="/about" component={About} />

                <Route path="/*" component={NotFound} />
            </Switch>
        )

};

export default Routes;
