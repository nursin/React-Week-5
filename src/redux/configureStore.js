import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Campsites } from './campsites';
import { Partners } from './partners';
import { Promotions } from './promotions';
import { Comments } from './comments';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
          campsites: Campsites,
          partners: Partners,
          comments: Comments,
          promotions: Promotions
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};