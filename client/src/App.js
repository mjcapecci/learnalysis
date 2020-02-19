import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';

// Util
import { disableEnter } from './utils/disableEnter';

// Style and JS Library
import './styles/App.scss';
import 'materialize-css/dist/css/materialize.min.css';

// State Management
import { Provider } from 'react-redux';
import store from './store';

// Components
import Navbar from './components/layout/Navbar';
import Dashboard from './components/pages/Dashboard';
import LandingPage from './components/pages/LandingPage';
import Profile from './components/pages/Profile';

function App() {
  useEffect(() => {
    disableEnter();
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container-custom'>
            <div className='container-box'>
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/profile' component={Profile} />
                <Route exact path='/' component={LandingPage} />
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
