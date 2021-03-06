import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, userType, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isAuthenticated === true && auth.user.userType === userType) {
                    return <Component {...props} />
                } else if(auth.isAuthenticated === true && auth.user.userType !== userType) {
                    return <Redirect to='/unauthorized' />
                } else if(auth.isAuthenticated === false) {
                    return <Redirect to='/signin' />
                }
            }
            }
        />
    )
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { })(PrivateRoute);