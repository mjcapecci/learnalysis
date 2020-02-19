import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUrl, login, logout, loadUser } from '../../actions/authActions';
import stars from '../../img/stars.png';

import querystring from 'query-string';

const LandingPage = ({
  isAuthenticated,
  getUrl,
  loadUser,
  location,
  login
}) => {
  useEffect(() => {
    const qStrings = querystring.parse(location.search);
    if (qStrings.code && !isAuthenticated && !localStorage.learnalysis_token) {
      login(qStrings.code);
    } else {
      loadUser();
    }
    // eslint-disable-next-line
  }, []);

  const signIn = async () => {
    window.location.href = await getUrl();
  };

  return isAuthenticated ? (
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <div className='landing-page'>
        <div>
          <h3 className='hide-on-med-and-down'>Welcome to Learnalysis</h3>
        </div>
        <img src={stars} alt='Learnalysis Stars' width='220px' />
        <button
          className='waves-effect waves-light indigo darken-1 btn-large'
          onClick={signIn}
        >
          <i className='material-icons left'>account_box</i>Sign In With Google
        </button>
        <p>
          Keep track of your learning progress.{' '}
          <strong>Keep moving forward.</strong>
        </p>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getUrl, logout, loadUser, login })(
  LandingPage
);
