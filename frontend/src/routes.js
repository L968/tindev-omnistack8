import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login/index';
import Main from './pages/Main/index';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/main" component={Main} />
            </Switch>
        </BrowserRouter>
    );
}