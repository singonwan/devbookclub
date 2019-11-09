import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
    // takes in component as all routes do
    // gets auth from redux state
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            !isAuthenticated && !loading ? ( //if not authenticated and not loading redirect to login
                <Redirect to="/login" />
            ) : (
                <Component {...props} /> //else render the component with the props that were passed in
            )
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
