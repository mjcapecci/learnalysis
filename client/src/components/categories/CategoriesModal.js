import React, { useRef } from 'react';
import CategoryItems from './CategoryItems';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addCategory } from '../../actions/categoryActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const CategoriesModal = ({
  category: { categories, loading },
  auth: { user },
  addCategory
}) => {
  const text = useRef('');

  const onSubmit = () => {
    if (text.current.value) {
      const newCategory = {
        user: user._id,
        name: text.current.value
      };
      addCategory(newCategory);
      text.current.value = '';
    } else {
      M.toast({ html: 'Please Enter a New Category' });
    }
  };

  return (
    <div id='category-modal' className='modal'>
      <div className='modal-content'>
        <ul className='collection with-header'>
          <li className='collection-header'>
            <h4 className='center'>My Categories</h4>
          </li>
          {!loading && categories.length === 0 ? (
            <li className='collection-header'>No categories entered yet...</li>
          ) : (
            categories.map(category => (
              <CategoryItems category={category} key={category._id} />
            ))
          )}
        </ul>
      </div>
      <div className='container'>
        <div className='row'>
          <form className='col s12'>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  id='category'
                  type='text'
                  ref={text}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      onSubmit();
                    }
                  }}
                />
                <label htmlFor='category'>Category</label>
                <span className='helper-text'>Add New Category</span>
              </div>
            </div>
          </form>
          <div className='modal-footer flex'>
            <button
              id='submit-btn'
              className='waves-effect blue waves-light btn'
              onClick={() => {
                onSubmit();
              }}
            >
              Add
            </button>
            <button className='modal-close waves-effect blue waves-light btn'>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CategoriesModal.propTypes = {
  category: PropTypes.object.isRequired,
  addCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  category: state.category,
  auth: state.auth
});

export default connect(mapStateToProps, { addCategory })(CategoriesModal);
