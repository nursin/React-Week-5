import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Campsites } from './campsites';
import { Partners } from './partners';
import { Promotions } from './promotions';
import { Comments } from './comments';
import { InitialFeedback } from './forms';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
          campsites: Campsites,
          partners: Partners,
          comments: Comments,
          promotions: Promotions,
          ...createForms({
            feedbackForm: InitialFeedback
          })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};