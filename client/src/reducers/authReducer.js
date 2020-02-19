import {
  LOGIN_SUCCESS,
  USER_LOADED,
  LOGOUT,
  AUTH_ERROR,
  AUTH_LOADING
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('learnalysis_token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case USER_LOADED:
      return {
        ...state,
        token: localStorage.learnalysis_token,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case LOGOUT:
      localStorage.removeItem('learnalysis_token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true,
        user: null,
        error: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case AUTH_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
