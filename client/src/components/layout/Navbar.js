import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout, getUrl } from '../../actions/authActions';
import { Link } from 'react-router-dom';

import Search from './Search';

// Logo
import logo from '../../img/logo.png';

const Navbar = ({
  auth: { isAuthenticated, user },
  util: { sitePage },
  logout,
  getUrl
}) => {
  const signIn = async () => {
    window.location.href = await getUrl();
  };

  const authLinks = (
    <Fragment>
      {sitePage === 'dashboard' && (
        <li className='searchItem'>
          <Search />
        </li>
      )}
      <li>
        <Link
          to='/dashboard'
          onClick={() => {
            if (window.location !== 'dashboard') {
              window.location = 'dashboard';
            }
          }}
          className='dBoard'
        >
          Dashboard
        </Link>
      </li>
      <li className='sidenav-close'>
        <Link to='/profile'>
          <img
            src={user && user.picture}
            height='30px'
            style={{ transform: 'translateY(10px)', borderRadius: '50%' }}
            alt='profile-img'
          ></img>
        </Link>
      </li>
      <li className='sidenav-close'>
        <Link
          to='/'
          onClick={() => {
            logout();
          }}
          style={{ color: 'grey' }}
        >
          Logout
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <button onClick={signIn}>Login / Register</button>
      </li>
    </Fragment>
  );

  return (
    <Fragment>
      <nav className='indigo darken-1'>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo'>
            <img
              src={logo}
              style={{ width: '15rem', transform: 'translateY(-25px)' }}
              alt='logo'
            />
          </Link>
          {isAuthenticated && (
            <a href='!#' data-target='mobile-demo' className='sidenav-trigger'>
              <i className='material-icons'>menu</i>
            </a>
          )}
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
      <ul className='sidenav' id='mobile-demo'>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  auth: state.auth,
  util: state.util
});

export default connect(mapStateToProps, { logout, getUrl })(Navbar);
