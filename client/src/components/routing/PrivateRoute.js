import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Preloader from '../layout/Preloader';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (loading) {
        return <Preloader />;
      } else if (!isAuthenticated) {
        return <Redirect to='/' />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null, null, { pure: false })(
  PrivateRoute
);
