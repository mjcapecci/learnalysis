import React from 'react';
import { connect } from 'react-redux';
import { clearCurrentEntry } from '../../actions/entryActions';
import { setStars } from '../../actions/utilActions';

export const AddEntryBtn = ({ clearCurrentEntry, setStars }) => {
  return (
    <a
      href='#add-entry-modal'
      className='btn-floating btn-large waves-effect waves-light orange modal-trigger'
      onClick={() => {
        clearCurrentEntry();
        setStars(0);
      }}
    >
      <i className='material-icons'>add</i>
    </a>
  );
};

export default connect(null, { clearCurrentEntry, setStars })(AddEntryBtn);
