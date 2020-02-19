import {
  SET_STARS,
  CLEAR_STARS,
  SET_PAGE,
  GET_STATS,
  RESULTS_PER_PAGE,
  UTIL_ERROR,
  SET_SITE_PAGE,
  UTIL_LOADING
} from './types';
import axios from 'axios';

export const setSitePage = sitePage => {
  return {
    type: SET_SITE_PAGE,
    payload: sitePage
  };
};

export const setStars = count => {
  return {
    type: SET_STARS,
    payload: count
  };
};

export const clearStars = () => {
  return {
    type: CLEAR_STARS
  };
};

export const setPage = page => {
  return {
    type: SET_PAGE,
    payload: page
  };
};

export const getStats = () => async dispatch => {
  dispatch(utilLoading());
  try {
    const res = await axios.get('/api/users/stats');
    dispatch({
      type: GET_STATS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: UTIL_ERROR,
      payload: error.response.statusText
    });
  }
};

export const setResultsPerPage = resultsNum => dispatch => {
  dispatch({
    type: RESULTS_PER_PAGE,
    payload: resultsNum
  });
};

export const utilLoading = () => dispatch => {
  dispatch({
    type: UTIL_LOADING
  });
};
