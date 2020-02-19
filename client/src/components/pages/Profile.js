import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStats, setSitePage } from '../../actions/utilActions';
import { loadUser } from '../../actions/authActions';

const Profile = ({
  entry: { entries },
  auth: { user, isAuthenticated },
  util: { stats },
  loadUser,
  getStats,
  setSitePage
}) => {
  useEffect(() => {
    if (!isAuthenticated) {
      loadUser();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (entries.length > 0) {
      getStats();
    }
    setSitePage('profile');
    // eslint-disable-next-line
  }, []);

  let mostPopular;
  let totalTime;
  let avgRating;
  let count;

  if (stats) {
    mostPopular = Object.entries(stats.sortedPopularity[0])[0][0];
    totalTime = Object.entries(stats.totalTime[0]);
    avgRating = Object.entries(stats.avgRating[0]);
    count = Object.entries(stats.count[0]);
  }

  const entryStats = (
    <div className='profile-stats'>
      <ul className='collection'>
        <li className='collection-item'>
          <span>Total Learning Time:</span>
          <span>
            {stats && Object.values(totalTime[0])[1]}h{' '}
            {stats && Object.values(totalTime[1])[1]}m
          </span>
        </li>
        <li className='collection-item'>
          <span>Favorite Category:</span> <span>{stats && mostPopular}</span>
        </li>
        <li className='collection-item'>
          <span>Average Rating:</span>
          <span>
            {stats && Object.values(avgRating[1])[1].toFixed(2)} Stars
          </span>
        </li>
        <li className='collection-item'>
          <span>Total Sessions:</span>{' '}
          <span>{stats && Object.values(count[0])[1]}</span>
        </li>
      </ul>
    </div>
  );

  const noEntryStats = (
    <h6 style={{ marginTop: '5rem' }} className='center'>
      Please check back here after making your first entry...
    </h6>
  );

  return user ? (
    <div className='profile-flex'>
      <div className='profile-header'>
        <img
          src={user.picture}
          style={{
            borderRadius: '50%',
            transform: 'translateY(24px)',
            marginRight: '1rem'
          }}
          alt='user'
        />
        <h1 className='center-align'>{user.name}</h1>
        {entries.length > 0 ? entryStats : noEntryStats}
      </div>
    </div>
  ) : (
    <h6>Loading</h6>
  );
};

const mapStateToProps = state => ({
  entry: state.entry,
  auth: state.auth,
  util: state.util
});

export default connect(mapStateToProps, { getStats, setSitePage, loadUser })(
  Profile
);
