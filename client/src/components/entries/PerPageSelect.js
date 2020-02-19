import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { setPage, setResultsPerPage } from '../../actions/utilActions';

const PerPageSelect = ({
  util: { page, resultsPerPage },
  entry: { entries },
  setResultsPerPage,
  setPage
}) => {
  useEffect(() => {
    if (page > 1 && entries.length === 0) {
      setPage(1);
    }
  }, [entries, page, setPage]);

  return (
    entries.length > 0 && (
      <Fragment>
        <div className='resultsWithLabel'>
          <label htmlFor='resultsPerPage'>Results Per Page:</label>
          <select
            name='resultsPerPage'
            id='resultsPerPage'
            className='browser-default'
            onChange={e => {
              setResultsPerPage(e.target.value);
            }}
          >
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = state => ({
  entry: state.entry,
  util: state.util
});

export default connect(mapStateToProps, { setPage, setResultsPerPage })(
  PerPageSelect
);
