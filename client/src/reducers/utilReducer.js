import {
  SET_STARS,
  CLEAR_STARS,
  SET_SITE_PAGE,
  SET_PAGE,
  GET_STATS,
  RESULTS_PER_PAGE,
  UTIL_ERROR,
  UTIL_LOADING
} from '../actions/types';

const initialState = {
  stars: 0,
  stats: null,
  sitePage: '',
  page: 1,
  error: null,
  resultsPerPage: 25,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STARS:
      return {
        ...state,
        stars: action.payload
      };
    case CLEAR_STARS:
      return {
        ...state,
        stars: 0
      };
    case SET_SITE_PAGE:
      return {
        ...state,
        sitePage: action.payload
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload
      };
    case GET_STATS:
      return {
        ...state,
        stats: action.payload,
        loading: false
      };
    case RESULTS_PER_PAGE: {
      return {
        ...state,
        resultsPerPage: action.payload
      };
    }
    case UTIL_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case UTIL_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
