import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import monitorReducersEnhancer from "../Enhancer/monitorReducer";
import loggerMiddleware from "../Middleware/logger";
import AuthReducer from "../Reducer/AuthReducer";
import AdminReducer from "../Reducer/AdminReducer";
import errorReducer from "../Reducer/errorReducer";

const initialState = {};

const middlewares = [loggerMiddleware, thunkMiddleware];
const middlewareEnhancer = composeWithDevTools(
  applyMiddleware(...middlewares)
);

const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
const composedEnhancers = compose(...enhancers);

const store = createStore(
  combineReducers({
    auth: AuthReducer,
    admin: AdminReducer,
    errors: errorReducer,
  }),
  initialState,
  composedEnhancers
);

export default store;
