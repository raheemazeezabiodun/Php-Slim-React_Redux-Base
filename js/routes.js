import React from 'react';
import { Route, IndexRoute } from 'react-router';

import CreateView from './containers/app/create';
import NotFoundView from './containers/NotFound';
import HeaderView from './components/header';

export default(
    <Route path="/" >
        <IndexRoute component={HeaderView} />
        <Route path="create/" component={CreateView} />

        <Route path="*" component={NotFoundView} />
    </Route>
);