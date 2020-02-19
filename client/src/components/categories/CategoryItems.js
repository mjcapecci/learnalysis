import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteCategory } from '../../actions/categoryActions';

const CategoryItems = ({ category, deleteCategory }) => {
  const onDelete = () => {
    deleteCategory(category._id);
  };
  return (
    <li className='collection-item'>
      <div>
        {category.name}
        <a href='#!' className='secondary-content' onClick={onDelete}>
          <i className='material-icons red-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

CategoryItems.propTypes = {
  category: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  category_fromModal: state.category
});

export default connect(mapStateToProps, { deleteCategory })(CategoryItems);
