import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import EntryItems from './EntryItems';

import { connect } from 'react-redux';
import { getEntries, setSearch } from '../../actions/entryActions';
import { getStats, setPage } from '../../actions/utilActions';
import Preloader from '../layout/Preloader';

const Entries = ({
  entry: { loading, entries, checked, search },
  auth,
  util: { stats, error, page, resultsPerPage },
  category: { categories },
  setPage,
  setSearch,
  getEntries
}) => {
  useEffect(() => {
    if (auth.user && !loading) {
      getEntries(1, 25);
      setPage(1);
    }

    // eslint-disable-next-line
  }, [auth.user]);

  useEffect(() => {
    if (auth.user && !loading) getEntries(page, resultsPerPage);
    // eslint-disable-next-line
  }, [resultsPerPage, page, auth.user, getEntries]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Fragment>
      {search && (
        <div className='flex'>
          <span>
            <button
              onClick={() => {
                getEntries(page, resultsPerPage);
                setSearch(null);
              }}
              style={{ cursor: 'pointer' }}
            >
              Back to All Results
            </button>
          </span>
          <span className='white-text'>Showing Results For: '{search}'</span>
        </div>
      )}
      <ul className='collapse'>
        <li>
          {' '}
          <div className='entry-header flex indigo darken-1 white-text'>
            <p className='center sm-entry'>
              <strong>Date</strong>
            </p>
            <p className='center sm-entry'>
              <strong>Category</strong>
            </p>
            <p className='center sm-entry hide-on-med-and-down'>
              <strong>Medium</strong>
            </p>
            <p className='center m-entry hide-on-med-and-down'>
              <strong>Time Spent</strong>
            </p>
            <p className='center l-entry'>
              <strong>Summary</strong>
            </p>
            <p className='center m-entry hide-on-med-and-down'>
              <strong>Rating</strong>
            </p>
          </div>
        </li>
        {!loading && entries.length === 0 ? (
          <li className='center'>
            <div className='collapse-header'>No entries to show...</div>
          </li>
        ) : (
          entries.map(entry => <EntryItems entry={entry} key={entry._id} />)
        )}
      </ul>
      {categories.length === 0 && (
        <div class='col s12 m7'>
          <div
            class='card horizontal'
            style={{ background: 'transparent', border: 'none' }}
          >
            <div class='card-stacked'>
              <div class='card-content white-text'>
                <p>Welcome, and thank you for registering with Learnalysis!</p>
                <ol>
                  <li>
                    Click the <span className='red-text'>red</span> button to
                    create your first category.
                  </li>{' '}
                  <li>
                    Click the <span className='orange-text'>orange</span> button
                    to create your first entry.
                  </li>
                </ol>
                <small>
                  *These directions will disappear when you make your first
                  category
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Entries.propTypes = {
  entry: PropTypes.object.isRequired,
  getEntries: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  entry: state.entry,
  util: state.util,
  category: state.category
});

export default connect(mapStateToProps, {
  getEntries,
  getStats,
  setPage,
  setSearch
})(Entries);
