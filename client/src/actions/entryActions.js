import axios from 'axios';
import {
  GET_ENTRIES,
  ADD_ENTRY,
  DELETE_ENTRY,
  UPDATE_ENTRY,
  SET_CURRENT_ENTRY,
  CLEAR_CURRENT_ENTRY,
  ENTRY_ERROR,
  ENTRY_LOADING,
  ENTRY_CHECKED,
  CLEAR_CHECKED,
  SEARCH_ENTRIES,
  SET_SEARCH
} from './types';

export const getEntries = (page, results) => async dispatch => {
  dispatch(entryLoading());
  try {
    const res = await axios.get(`/api/entries/${page}/${results}`);
    dispatch({
      type: GET_ENTRIES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ENTRY_ERROR,
      payload: error.response.statusText
    });
  }
};

export const searchEntries = (query, page, results) => async dispatch => {
  dispatch(entryLoading());
  try {
    const res = await axios.get(
      `/api/entries/search/${query}/${page}/${results}`
    );
    console.log(res.data);
    dispatch({
      type: SEARCH_ENTRIES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ENTRY_ERROR,
      payload: error.response.statusText
    });
  }
};

export const setSearch = query => {
  return {
    type: SET_SEARCH,
    payload: query
  };
};

export const addEntry = entry => async dispatch => {
  dispatch(entryLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    entryLoading();
    const res = await axios.post('/api/entries', entry, config);
    dispatch({
      type: ADD_ENTRY,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ENTRY_ERROR,
      payload: error.response
    });
  }
};

export const deleteEntry = id => async dispatch => {
  dispatch(entryLoading());
  try {
    entryLoading();
    await axios.delete(`/api/entries/${id}`);
    dispatch({
      type: DELETE_ENTRY,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: ENTRY_ERROR,
      payload: error.response.statusText
    });
  }
};

export const updateEntry = entry => async dispatch => {
  dispatch(entryLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    entryLoading();
    const res = await axios.put(`/api/entries/${entry.id}`, entry, config);
    dispatch({ type: UPDATE_ENTRY, payload: res.data });
  } catch (error) {
    dispatch({ type: ENTRY_ERROR, payload: error.response.statusText });
  }
};

export const setCurrentEntry = entry => {
  return {
    type: SET_CURRENT_ENTRY,
    payload: entry
  };
};

export const clearCurrentEntry = () => {
  return {
    type: CLEAR_CURRENT_ENTRY
  };
};

// Check entry to be darkened in UI
export const checkEntry = entry => {
  return {
    type: ENTRY_CHECKED,
    payload: entry
  };
};

// Clear checked entry
export const clearChecked = () => {
  return {
    type: CLEAR_CHECKED
  };
};

// Set loading to true
export const entryLoading = () => dispatch => {
  dispatch({
    type: ENTRY_LOADING
  });
};
