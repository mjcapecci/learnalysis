import * as types from '../../actions/types';
import categoryReducer, { initialState } from '../categoryReducer';

test('should load with null values', () => {
  const action = { type: 'dummy_action' };
  expect(categoryReducer(undefined, action)).toEqual(initialState);
});

test('should set category test', () => {
  const action = { type: types.GET_CATEGORIES, payload: 'Test' };
  const expectedState = { categories: 'Test', error: null, loading: false };
  expect(categoryReducer(undefined, action)).toEqual(expectedState);
});
