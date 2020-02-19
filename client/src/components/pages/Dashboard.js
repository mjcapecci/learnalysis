import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Entries from '../entries/Entries';
import AddEntryBtn from '../entries/AddEntryBtn';
import ManageCategoryBtn from '../categories/ManageCategoryBtn';
import AddEntryModal from '../entries/AddEntryModal';
import EditEntryModal from '../entries/EditEntryModal';
import CategoryModal from '../categories/CategoriesModal';
import EntryPagination from '../entries/EntryPagination';
import PerPageSelect from '../entries/PerPageSelect';

import M from 'materialize-css/dist/js/materialize.min.js';

import { connect } from 'react-redux';
import { login, loadUser, authLoading } from '../../actions/authActions';
import { setSitePage } from '../../actions/utilActions';

const Dashboard = ({ isAuthenticated, setSitePage, sitePage }) => {
  useEffect(() => {
    if (sitePage !== 'dashboard' && isAuthenticated) {
      setSitePage('dashboard');
    }
    setSitePage('dashboard');
    M.AutoInit();
  }, []);

  return (
    <div>
      <Entries />
      <div className='container'>
        <AddEntryModal />
        <EditEntryModal />
        <CategoryModal />
      </div>
      <div className='pagination-controls'>
        <EntryPagination />
        <PerPageSelect />
      </div>

      <div className='controls'>
        <AddEntryBtn />
        <ManageCategoryBtn />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  sitePage: state.util.sitePage,
  entry: state.entry
});

export default connect(mapStateToProps, {
  login,
  loadUser,
  authLoading,
  setSitePage
})(withRouter(Dashboard));
