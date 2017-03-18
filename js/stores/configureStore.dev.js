import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';

export default function configureStore(initialState, history) {
    const logger = createLogger();

    // Add so dispatched route actions to the history
    const reduxRouterMiddleware = routerMiddleware(history);

    const middleware = applyMiddleware(thunk, logger, reduxRouterMiddleware);

    const createStoreWithMiddleware = compose(
        middleware
    );

    const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);

    if (module.hot) {
        module.hot
            .accept('../reducers', () => {
                const nextRootReducer = require('../reducers/index'); // eslint-disable-line global-require

                store.replaceReducer(nextRootReducer);
            });
    }

    return store;
}