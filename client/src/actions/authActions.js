import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  AUTH_LOADING
} from './types';

//Send authorization code to backend to be verified and tokenized
export const login = code => async dispatch => {
  dispatch(authLoading());
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/auth', { code }, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.statusText
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};

//Retrieves the authenticated URL for the Google Sign In page
export const getUrl = () => async dispatch => {
  dispatch(authLoading());
  try {
    const res = await axios.get('/api/auth/redirect');
    return res.data;
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.statusText
    });
  }
};

//Loads user information into state from the backend
export const loadUser = () => async dispatch => {
  if (localStorage.learnalysis_token) {
    setAuthToken(localStorage.learnalysis_token);
  } else {
    return;
  }
  try {
    const res = await axios.get('/api/users');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch(logout());
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.statusText
    });
  }
};

export const authLoading = () => dispatch => {
  dispatch({
    type: AUTH_LOADING
  });
};
