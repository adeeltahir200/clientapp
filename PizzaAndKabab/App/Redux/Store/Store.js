import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
//import logger from 'redux-logger';
import {Myitemreducers} from '../Reducer/Myitemreducers';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Myitemreducers
        }),
        applyMiddleware(thunk)
    );

    return store;
}