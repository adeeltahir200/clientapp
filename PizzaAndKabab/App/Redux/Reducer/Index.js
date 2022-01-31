import {combineReducers} from 'redux';
import DataReducer from './DataReducer';
import subTotal from './subTotal';
import {Myitemreducers} from './Myitemreducers';

export default combineReducers({
    data:DataReducer,
    sub_Total:subTotal,
    myitemreducer:Myitemreducers
  });