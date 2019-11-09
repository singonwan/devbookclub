import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
    getCurrentProfile,
    auth,
    profile: { profile, loading }
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>test</Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getCurrentProfile }
)(Dashboard);
