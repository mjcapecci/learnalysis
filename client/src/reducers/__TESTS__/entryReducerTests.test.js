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
} from '../../actions/types';

import entryReducer, { initialState } from '../entryReducer';

test('should load with null values', () => {
  const initState = entryReducer(undefined, {});
  expect(initState).toEqual(initialState);
});
