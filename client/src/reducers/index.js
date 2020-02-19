import { combineReducers } from 'redux';
import entryReducer from './entryReducer';
import utilReducer from './utilReducer';
import categoryReducer from './categoryReducer';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  entry: entryReducer,
  util: utilReducer,
  category: categoryReducer
});
