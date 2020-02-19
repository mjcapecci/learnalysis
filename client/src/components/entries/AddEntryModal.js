import React, { useState } from 'react';
import moment from 'moment';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';

import CategoryOptions from '../categories/CategoryOptions';

import { connect } from 'react-redux';
import { setStars } from '../../actions/utilActions';
import { addEntry } from '../../actions/entryActions';

const AddEntryModal = ({
  util: { stars },
  auth: { user },
  setStars,
  addEntry
}) => {
  const [category, setCategory] = useState('');
  const [medium, setMedium] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [research, setResearch] = useState(false);
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = () => {
    const newEntry = {
      date: moment(Date.now()).format('MMM D'),
      editDate: moment(Date.now()).format('MMM D, h:mm A'),
      user: user._id,
      category,
      medium,
      timeSpent: {
        hours: hours,
        minutes: minutes
      },
      summary,
      rating: stars,
      researchOnly: research,
      description
    };

    addEntry(newEntry);

    M.toast({ html: `Entry added` });

    setCategory('');
    setMedium('');
    setHours('');
    setMinutes('');
    setResearch(false);
    setSummary('');
    setDescription('');
    setStars(0);
  };

  const formIsComplete = () => {
    if (!category || !medium || !hours || !minutes || !summary) {
      M.toast({
        html: 'Please enter category, medium, time spent, and summary.'
      });
      return false;
    } else if (!stars) {
      M.toast({
        html: 'Please select a rating of 1 - 3 by clicking on a star.'
      });
      return false;
    } else {
      return true;
    }
  };

  const starSyntax = {
    one: stars > 0 ? 'star' : 'star_border',
    two: stars > 1 ? 'star' : 'star_border',
    three: stars > 2 ? 'star' : 'star_border'
  };

  return (
    <div id='add-entry-modal' className='modal'>
      <div className='modal-content'>
        <h4 className='center'>
          <i
            className='small material-icons'
            style={{ transform: 'translateY(3px)' }}
          >
            assessment
          </i>{' '}
          Add New Entry
        </h4>
        <div className='row'>
          <form className='col s12'>
            <div className='row'>
              <div className='input-field col s6'>
                <select
                  name='category'
                  className='browser-default'
                  id='category-select'
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value='' defaultValue>
                    Select Category
                  </option>
                  <CategoryOptions />
                </select>
              </div>
              <div className='input-field col s6'>
                <select
                  name='medium'
                  className='browser-default'
                  value={medium}
                  onChange={e => setMedium(e.target.value)}
                >
                  <option value='' defaultValue>
                    Select Medium
                  </option>
                  <option value='Video'>Video</option>
                  <option value='Article'>Article</option>
                  <option value='Book'>Book</option>
                </select>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s6'>
                <input
                  type='number'
                  placeholder='Hours...'
                  value={hours}
                  onChange={e => setHours(e.target.value)}
                ></input>
              </div>
              <div className='input-field col s6'>
                <input
                  type='number'
                  placeholder='Minutes...'
                  value={minutes}
                  onChange={e => setMinutes(e.target.value)}
                ></input>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s6'>
                <span>
                  <label className='hide-on-med-and-down'>Rating: </label>
                  <i
                    className='small material-icons'
                    style={{
                      cursor: 'pointer',
                      userSelect: 'none',
                      transform: 'translateY(10px)'
                    }}
                    onClick={() => {
                      setStars(1);
                    }}
                  >
                    {starSyntax.one}
                  </i>
                  <i
                    className='small material-icons'
                    style={{
                      cursor: 'pointer',
                      userSelect: 'none',
                      transform: 'translateY(10px)'
                    }}
                    onClick={() => {
                      setStars(2);
                    }}
                  >
                    {starSyntax.two}
                  </i>
                  <i
                    className='small material-icons'
                    style={{
                      cursor: 'pointer',
                      userSelect: 'none',
                      transform: 'translateY(10px)'
                    }}
                    onClick={() => {
                      setStars(3);
                    }}
                  >
                    {starSyntax.three}
                  </i>
                </span>
              </div>
              <div className='input-field col s6'>
                <label>
                  <input
                    type='checkbox'
                    checked={research}
                    value={research}
                    onChange={() => setResearch(!research)}
                  />
                  <span>Research only...</span>
                </label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  type='text'
                  length='36'
                  placeholder='Summary...'
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                ></input>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <textarea
                  className='materialize-textarea'
                  id='description'
                  placeholder='Extended description...'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='modal-footer flex'>
        <button
          id='submit-btn'
          className='modal-close waves-effect blue waves-light btn'
          onClick={e => {
            formIsComplete() && onSubmit();
          }}
        >
          <span>Enter</span>
        </button>
      </div>
    </div>
  );
};

AddEntryModal.propTypes = {
  util: PropTypes.object.isRequired,
  setStars: PropTypes.func.isRequired,
  addEntry: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  util: state.util,
  auth: state.auth
});

export default connect(mapStateToProps, {
  setStars,
  addEntry
})(AddEntryModal);
