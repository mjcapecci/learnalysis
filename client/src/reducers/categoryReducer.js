import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_ERROR,
  CATEGORY_LOADING
} from '../actions/types';

export const initialState = {
  categories: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category._id !== action.payload
        ),
        loading: false
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case CATEGORY_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
