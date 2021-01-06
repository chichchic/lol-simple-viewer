import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './views/Main/Main';
import MatchList from './views/MatchList/MatchList';
import TimeLine from './views/TimeLine/TimeLine';
import NotFound from './views/error/NotFound';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/match-list/:name" component={MatchList} />
        <Route exact path="/time-line/:matchId" component={TimeLine} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
