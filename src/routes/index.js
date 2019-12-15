import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import StudentEdit from '~/pages/StudentEdit';

import Plans from '~/pages/Plans';
import Enrollments from '~/pages/Enrollments';
import Supports from '~/pages/Supports';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/student/edit/:id" component={StudentEdit} isPrivate />
      <Route path="/student/add" exact component={StudentEdit} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/enrollments" exact component={Enrollments} isPrivate />
      <Route path="/supports" exact component={Supports} isPrivate />
    </Switch>
  );
}
