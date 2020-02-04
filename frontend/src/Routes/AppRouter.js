import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Loader from "../Loader";
import { connect } from "react-redux";
// import { getProfileCreated } from "../Actions/profileActions";
import Appbar from '../Components/Appbar';
import Signin from '../Components/Signin';
import Signup from '../Components/Signup';
import UnAuthorized from '../Components/UnAuthorized';
import Home from '../Components/Home';
import Dashboard from '../Components/Dashboard';

// Admin Routes
import AdminSignin from '../Components/Admin/AdminSignin';
import AdminHome from '../Components/Admin/AdminHome';
import CreatePost from '../Components/Admin/CreatePost';
import AddUser from "../Components/Admin/AddUser";
import ViewUsers from "../Components/Admin/ViewUsers";

import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../Action/authActions";
import jwt_decode from "jwt-decode";
import store from "../Store/configureStore";
import PrivateRoute from "./PrivateRoute"
import AdminPrivateRoute from "./AdminPrivateRoute"
// const store = mainStore()
/* eslint-disable import/first */
// History Import
import { createBrowserHistory } from 'history';
import PreferredPosts from "../Components/PreferredPosts";
export const history = createBrowserHistory();


if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    // call setCurrentUser action
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        //Logout User
        store.dispatch(logoutUser());

        // TODO: Clear the current profile

        //Redirect to login
        window.location.href = "/";
        //this.props.history.push(`/signin`)
    }
}

class AppRouter extends React.Component {

    state = {
        errors: {},
        profilecreated: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        if (nextProps.profilecreated) {
            this.setState({ profilecreated: nextProps.profilecreated });
        }
    }
    componentDidMount() {
        //its gonna fetch the profile
        // if (this.props.auth.isAuthenticated) {
        //   this.props.getProfileCreated();
        // }
    }

    render() {
        if (this.props.auth.isAuthenticated) {
            if (!this.state.profilecreated) {
                return <Loader />;
            }
        }
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Appbar history={history} />
                        <Route exact={true} path="/" component={Dashboard} />
                        <Route path="/signin" component={Signin} />
                        <Route path="/admin" component={AdminSignin} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/unauthorized" component={UnAuthorized} />
                        <Switch>
                            {/* UserPrivateRoute */}
                            <PrivateRoute exact={true} path="/home" userType="user" component={Home} />
                            <PrivateRoute exact={true} path="/preferredposts" userType="user" component={PreferredPosts} />
                            {/* AdminPrivateRoute */}
                            <AdminPrivateRoute exact={true} path="/adminhome" userType="admin" component={AdminHome} />
                            <AdminPrivateRoute exact={true} path="/viewusers" userType="admin" component={ViewUsers} />
                            <AdminPrivateRoute exact={true} path="/adduser" userType="admin" component={AddUser} />
                            <AdminPrivateRoute exact={true} path="/createpost" userType="admin" component={CreatePost} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(AppRouter);