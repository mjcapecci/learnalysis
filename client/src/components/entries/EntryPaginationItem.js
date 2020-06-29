import React from 'react';
import { connect } from 'react-redux';
import { getEntries, searchEntries } from '../../actions/entryActions';
import { setPage } from '../../actions/utilActions';

const EntryPaginationItem = ({ page, util, setPage }) => {
  return (
    <li className={util.page === page ? 'active-page' : 'waves-effect'}>
      <a
        href='#!'
        onClick={() => {
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

export default connect(mapStateToProps, { getEntries, searchEntries, setPage })(
  EntryPaginationItem
);
