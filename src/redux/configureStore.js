import { createStore, combineReducers } from 'redux';
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
        })
    );

    return store;
};