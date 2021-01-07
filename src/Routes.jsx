import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './views/Main/Main';
import MatchList from './views/MatchList/MatchList';
import TimeLine from './views/TimeLine/TimeLine';
import Error from './views/error/Error';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/match-list/:name" component={MatchList} />
        <Route exact path="/time-line/:matchId" component={TimeLine} />
        <Route
          exact
          path="/bad-request"
          render={() => <Error text={'500. Bad Request'} />}
        />
        <Route
          exact
          path="*"
          render={() => <Error text={'sorry. we can not find the page'} />}
        />
      </Switch>
    </Router>
  );
}
