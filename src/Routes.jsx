import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './views/Main/Main';
import MatchList from './views/MatchList/MatchList';
import TimeLine from './views/TimeLine/TimeLine';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/match-list/:name" component={MatchList} />
          <Route exact path="/time-line/:matchId" component={TimeLine} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
