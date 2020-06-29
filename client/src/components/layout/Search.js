import React, { useRef } from 'react';
import { connect } from 'react-redux';
import {
  searchEntries,
  setSearch,
  getEntries
} from '../../actions/entryActions';

const Search = ({
  util: { page, resultsPerPage },
  searchEntries,
  getEntries,
  setSearch
}) => {
  const query = useRef('');

  const onSubmit = () => {
    let searchValue = query.current.value;
    if (searchValue) {
      searchEntries(searchValue, page, resultsPerPage);
      setSearch(null);
      setSearch(searchValue);
    }
    query.current.value = '';
  };

  return (
    <form autoComplete='off'>
      <div className='input-field'>
        <input
          id='search'
          type='search'
          maxLength='20'
          placeholder='Search for entries...'
          ref={query}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              onSubmit();
            }
          }}
        />
        <label className='label-icon' htmlFor='search'>
          <i className='material-icons'>search</i>
        </label>
        <i
          className='material-icons sidenav-close'
          style={{ marginRight: '3rem' }}
          onClick={onSubmit}
        >
          check
        </i>
        <i
          className='material-icons'
          onClick={() => {
            getEntries(page, resultsPerPage);
            setSearch(null);
            query.current.value = '';
          }}
        >
          close
        </i>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  util: state.util
});

export default connect(mapStateToProps, {
  searchEntries,
  setSearch,
  getEntries
})(Search);
