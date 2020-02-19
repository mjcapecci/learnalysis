import React from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

import { connect } from 'react-redux';
import {
  checkEntry,
  clearChecked,
  deleteEntry,
  setCurrentEntry
} from '../../actions/entryActions';

const EntryItems = ({
  entry_fromState: { checked },
  entry,
  checkEntry,
  clearChecked,
  deleteEntry,
  setCurrentEntry
}) => {
  const onDelete = () => {
    deleteEntry(entry._id);
    M.toast({ html: 'Entry Deleted' });
  };

  const mediumIcon = () => {
    switch (entry.medium) {
      case 'Article':
        return 'description';
      case 'Book':
        return 'book';
      case 'Video':
        return 'videocam';
      default:
        return 'google';
    }
  };

  return (
    <li>
      <div
        id={`entry-${entry._id}`}
        onClick={() => {
          checked !== entry._id ? checkEntry(entry._id) : clearChecked();
        }}
        className='collapse-header flex'
        style={
          checked === entry._id ? entryStyles.checked : entryStyles.unchecked
        }
      >
        <p className='center sm-entry'>
          <strong>{entry.date}</strong>
        </p>
        <p className='center sm-entry'>{entry.category}</p>
        <p className='center sm-entry hide-on-med-and-down'>
          <i
            className='material-icons'
            style={{ transform: 'translateY(2px)' }}
          >
            {mediumIcon()}
          </i>
        </p>
        <p className='center m-entry hide-on-med-and-down'>
          {entry.timeSpent.hours > 0 && entry.timeSpent.hours + 'h'}{' '}
          {entry.timeSpent.minutes}m
        </p>
        <p className='center l-entry'>{entry.summary}</p>
        <p
          className='center m-entry hide-on-med-and-down'
          style={
            checked === entry._id ? starStyles.checked : starStyles.unchecked
          }
        >
          {ratingStars(entry.rating)}
        </p>
        <i
          className={`material-icons ${
            checked === entry._id ? 'chevron chevron-rotated' : 'chevron'
          }`}
        >
          more_horiz
        </i>
      </div>
      <div
        className={
          checked === entry._id
            ? 'collapse-body collapse-show'
            : 'collapse-body'
        }
      >
        <div className='collapse-body-top show-mobile hide-desktop'>
          <span className='collapse-medium'>
            {
              <i
                className='material-icons'
                style={{ transform: 'translateY(8px)' }}
              >
                {mediumIcon()}
              </i>
            }
          </span>
          <span style={{ transform: 'translateY(9px)' }}>
            {' '}
            {entry.timeSpent.hours > 0 && entry.timeSpent.hours + 'h'}{' '}
            {entry.timeSpent.minutes}m
          </span>
          <span
            className='collapse-rating secondary-content black-text'
            style={{ transform: 'translateY(8px)' }}
          >
            {entry.rating > 1
              ? `${entry.rating} Stars`
              : `${entry.rating} Star`}
          </span>
        </div>
        <div className='collapse-body-bottom'>
          <h6 style={{ marginBottom: '1rem' }}>
            <strong>Description:</strong>
          </h6>
          {entry.description ? (
            <span style={{ whiteSpace: 'pre-wrap' }}>
              {entry.description}
              <span className='date-info secondary-content hide-mobile'>
                {entry.edited ? 'Edited: ' : 'Created: '} {entry.editDate}
              </span>
            </span>
          ) : (
            <span className='blue-text'>
              <em>No additional details yet...</em>
            </span>
          )}
          <div className='collapsible-body-secondary'>
            <a
              href='#edit-entry-modal'
              className='item-options modal-trigger'
              onClick={() => setCurrentEntry(entry)}
            >
              <i className='tiny material-icons green-text'>edit</i> Edit
            </a>
            <a href='#!' className='item-options' onClick={onDelete}>
              <i className='tiny material-icons red-text'>delete</i> Delete
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};

const ratingStars = rating => {
  const star = 'star ';
  return <i className='material-icons star'>{star.repeat(rating)}</i>;
};

const entryStyles = {
  checked: {
    transition: 'color .3s, background .1s'
  },
  unchecked: {
    transition: 'color .7s, background .1s'
  }
};

const starStyles = {
  checked: {
    color: '#ff9800',
    transition: 'color .2s ease-in'
  },
  unchecked: {
    color: 'black',
    transition: 'color .2s ease-in'
  }
};

EntryItems.propTypes = {
  entry: PropTypes.object.isRequired,
  entry_fromState: PropTypes.object.isRequired,
  checkEntry: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  entry_fromState: state.entry
});

export default connect(mapStateToProps, {
  checkEntry,
  clearChecked,
  deleteEntry,
  setCurrentEntry
})(EntryItems);
