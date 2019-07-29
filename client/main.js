import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// import {BrowserRouter, Route, Switch} from 'react-router-dom';

import App from './components/app';
// import Header from './components/header';
import BinsMain from './components/bins/bins_main';
import BinsComments from './components/bins/bins_comments';
import BinsList from './components/bins/bins_list';
import { Bins } from '../imports/collections/bins';

const routes = (

    <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={BinsList} />
      <Route path="bins/:binId" component={BinsMain} />
      <Route path="bins/:binId/comments" component={BinsComments} />
    </Route>
    </Router>
    // <BrowserRouter>
    //     <Header />

    //     <div>

    //         <Switch>
               
    //          <Route path="/index" component={BinsList} />
    //          <Route path="/bins/:binId" component={BinsMain} />

    //         </Switch>

            
    //     </div>
    //         {/* <Route path="/" component={App} /> */}
    //         {/* <Route path="/bins" component={BinsMain} /> */}
        
        
    // </BrowserRouter>
);

Meteor.startup(() => {
    ReactDOM.render(routes, document.querySelector('.render-target'))
});

