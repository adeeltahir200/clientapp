import 'react-native-gesture-handler'
import AppNavigators from './App/Navigation/Router';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import DataReducer from './App/Redux/Reducer/DataReducer';
// import Reducers from './App/Components/Redux/Reducers';
import { ConfigureStore } from './App/Redux/Store/Store';

const store = ConfigureStore();

export default class AppNavigator extends Component {
    render() {
        //const store = createStore(DataReducer, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <AppNavigators />
            </Provider>
        )
    }
} 