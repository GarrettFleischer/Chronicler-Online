import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';

import { AppLayout } from '../../ui/AppLayout';
import { Dashboard } from '../../ui/pages/Dashboard';
import { Homepage } from '../../ui/pages/Homepage';
import { Login } from '../../ui/pages/Login';
import { Project } from '../../ui/pages/Project';
import { Scene } from '../../ui/pages/Scene';

const exposed = FlowRouter.group({});

const auth = FlowRouter.group({
  triggersEnter: [() => {
    if (!(Meteor.loggingIn() || Meteor.userId())) {
      const route = FlowRouter.current();
      if (route.route.name !== 'login') Session.set('redirectAfterLogin', route.path);
      FlowRouter.go('login');
    }
  }],
});

exposed.route('/', {
  name: 'homepage',
  action() {
    mount(AppLayout, {
      content: <Homepage />,
    });
  },
});

exposed.route('/login', {
  name: 'login',
  action() {
    mount(AppLayout, {
      content: <Login />,
    });
  },
});

auth.route('/dashboard', {
  name: 'dashboard',
  action() {
    mount(AppLayout, {
      content: <Dashboard />,
    });
  },
});

auth.route('/project/:id', {
  name: 'project',
  action() {
    mount(AppLayout, {
      content: <Project />,
    });
  },
});

auth.route('/scene/:id', {
  name: 'scene',
  action() {
    mount(AppLayout, {
      content: <Scene />,
    });
  },
});


// Meteor.logout(() => {
//   FlowRouter.go('/');
// });
