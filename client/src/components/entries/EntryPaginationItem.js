import React from 'react';
import { connect } from 'react-redux';
import { getEntries } from '../../actions/entryActions';
import { setPage } from '../../actions/utilActions';

const EntryPaginationItem = ({ page, util, getEntries, setPage }) => {
  return (
    <li className={util.page === page ? 'active-page' : 'waves-effect'}>
      <a
        href='#!'
        onClick={() => {
          getEntries(page, util.resultsPerPage);
          setPage(page);
        }}
      >
        {page}
      </a>
    </li>
  );
};

const mapStateToProps = state => ({
  util: state.util
});

export default connect(mapStateToProps, { getEntries, setPage })(
  EntryPaginationItem
);
