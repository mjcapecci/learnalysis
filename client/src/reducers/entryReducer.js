import {
  GET_ENTRIES,
  ADD_ENTRY,
  DELETE_ENTRY,
  UPDATE_ENTRY,
  SET_CURRENT_ENTRY,
  CLEAR_CURRENT_ENTRY,
  ENTRY_ERROR,
  ENTRY_CHECKED,
  ENTRY_LOADING,
  CLEAR_CHECKED,
  SEARCH_ENTRIES,
  SET_SEARCH
} from '../actions/types';

export const initialState = {
  entries: [],
  current: null,
  loading: false,
  error: null,
  checked: null,
  search: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ENTRIES:
      return {
        ...state,
        entries: action.payload,
        loading: false
      };
    case ADD_ENTRY:
      return {
        ...state,
        entries: [action.payload, ...state.entries],
        loading: false
      };
    case DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== action.payload),
        loading: false
      };
    case UPDATE_ENTRY:
      return {
        ...state,
        entries: state.entries.map(entry =>
          entry._id === action.payload._id ? action.payload : entry
        ),
        loading: false
      };
    case ENTRY_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_CURRENT_ENTRY:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT_ENTRY:
      return {
        ...state,
        current: null
      };
    case ENTRY_CHECKED:
      return {
        ...state,
        checked: action.payload
      };
    case CLEAR_CHECKED:
      return {
        ...state,
        checked: null,
        loading: false
      };
    case SEARCH_ENTRIES:
      return {
        ...state,
        entries: action.payload,
        loading: false
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload
      };
    case ENTRY_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
