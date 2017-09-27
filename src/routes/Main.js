import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../components/Home';
import NotFound from '../components/NotFound';
import Node from '../containers/Node';

// TODO make Project component
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/project/:id" component={NotFound} />
      <Route path="/scene/:id" component={NotFound} />
      <Route path="/node/:id" component={Node} />
      <Route path="/dashboard" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  </main>
);

export default Main;