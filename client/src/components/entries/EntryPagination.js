import React, { useEffect } from 'react';
import EntryPaginationItem from './EntryPaginationItem';
import { connect } from 'react-redux';
import { getStats } from '../../actions/utilActions';

const EntryPagination = ({
  util: { stats, page, resultsPerPage },
  auth,
  entry: { entries },
  getStats
}) => {
  useEffect(() => {
    if (auth.user && entries.length > 0) {
      getStats();
    }
    // eslint-disable-next-line
  }, [auth.user, entries, resultsPerPage]);

  let rawCount;
  let totalCount;
  let pageNum = 0;
  let pageArr = [];

  if (stats) {
    rawCount = Object.entries(stats.count[0]);
    totalCount = Object.values(rawCount[0])[1];

    if (stats.count) {
      while (totalCount > 0) {
        totalCount -= resultsPerPage;
        pageNum++;
        pageArr.push(pageNum);
      }
    }
  }

  const checkForPagination = pageNum => {
    switch (pageNum) {
      case 1:
        return true;
      case page - 2:
        return true;
      case page - 1:
        return true;
      case page:
        return true;
      case page + 1:
        return true;
      case page + 2:
        return true;
      case pageArr.length:
        return true;
      default:
        return false;
    }
  };

  return (
    entries.length > 0 && (
      <div>
        <ul className='pagination'>
          <li className='disabled'>
            <a href='#!'>
              <i className='material-icons'>chevron_left</i>
            </a>
          </li>
          {pageArr.filter(checkForPagination).map(pageNum => (
            <EntryPaginationItem page={pageNum} key={pageNum} />
          ))}
          <li className='disabled'>
            <a href='#!'>
              <i className='material-icons'>chevron_right</i>
            </a>
          </li>
        </ul>
      </div>
    )
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  util: state.util,
  entry: state.entry
});

export default connect(mapStateToProps, { getStats })(EntryPagination);
