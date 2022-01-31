import { DATA_SOURCE } from "../Action/Type";

const INITIAL_STATE = {
  data: null,
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case DATA_SOURCE:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
