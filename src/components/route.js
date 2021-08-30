import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TodoHome from './todo';
import EditTodo from './editTodo';
import Home from './home';
import Edit from './edit';

const Routes = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={TodoHome}></Route>
      <Route exact path='/edit-todo/:id' component={EditTodo}></Route>
      <Route exact path='/list/:id' component={Home}></Route>
      <Route exact path='/edit/:id' component={Edit}></Route>
    </Switch>
  );
}

export default Routes;