import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getCategories } from '../../actions/categoryActions';

const CategoryOptions = ({
  category: { categories, loading },
  auth,
  getCategories
}) => {
  useEffect(() => {
    if (auth.user) {
      getCategories();
    }

    // eslint-disable-next-line
  }, [auth.user]);
  return (
    !loading &&
    categories !== null &&
    categories.map(c => (
      <option key={c._id} value={`${c.name}`}>
        {c.name}
      </option>
    ))
  );
};

CategoryOptions.propTypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  category: state.category,
  auth: state.auth
});

export default connect(mapStateToProps, { getCategories })(CategoryOptions);
