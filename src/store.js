import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducers, {}, composeWithDevTools(
    applyMiddleware(reduxThunk)
    ));
export default store;