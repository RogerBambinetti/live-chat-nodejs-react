import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Login from './pages/Login';
import Contacts from './pages/Contacts';
import Chat from './pages/Chat';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/contacts/:sender" exact component={Contacts} />
                <Route path="/chat/:sender/:receiver" exact component={Chat} />
            </Switch>
        </BrowserRouter>
    );

}