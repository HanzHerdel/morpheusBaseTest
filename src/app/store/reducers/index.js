import {combineReducers} from 'redux';
//import auth from '~/app/auth/store/reducers';

const createReducer = (asyncReducers) =>
    combineReducers({
  //      auth,
        ...asyncReducers
    });

export default createReducer;
