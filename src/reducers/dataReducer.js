import { FETCH_ORDERS } from "../actions/types";

const initialState = {
  orders: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
          ...state,
          orders: action.payload
        };
    default:
      return state;
  }
};