import axios from 'axios';
import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_ERROR,
  CATEGORY_LOADING
} from './types';

export const getCategories = () => async dispatch => {
  dispatch(categoryLoading());
  try {
    const res = await axios.get('/api/categories');
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error.response.statusText
    });
  }
};

export const addCategory = category => async dispatch => {
  dispatch(categoryLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/categories', category, config);
    dispatch({
      type: ADD_CATEGORY,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error.response.statusText
    });
  }
};

export const deleteCategory = id => async dispatch => {
  dispatch(categoryLoading());
  try {
    await axios.delete(`/api/categories/${id}`);
    dispatch({
      type: DELETE_CATEGORY,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error.response.statusText
    });
  }
};

// Set loading to true
export const categoryLoading = () => dispatch => {
  dispatch({
    type: CATEGORY_LOADING
  });
};
