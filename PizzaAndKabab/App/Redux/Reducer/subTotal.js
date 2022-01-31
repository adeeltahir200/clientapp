import { SUBTotal } from "../Action/Type";

const INITIAL_STATE = {
    subTotal: null,
  };
  
  export default (state = INITIAL_STATE, action) => {
    console.log(action);
  
    switch (action.type) {
      case SUBTotal:
        return {
          ...state,
          subTotal: action.payload,
        };
  
      default:
        return state;
    }
  };
  