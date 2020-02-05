import React, { Component } from 'react'
import { viewUsers, deleteUser } from "../../Action/authActions"
import { connect } from "react-redux"
import isEmpty from "../../validation/is-empty";
// import Loader from '../../Loader';

export class ViewUsers extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.viewUsers()
        }

    }

    deleteUser = (id) => {
        this.props.deleteUser(id)
    }

    render() {
        return (
            isEmpty(this.props.viewusers) ?
                <p className="text-center h2 mt-4">No User</p> : <div>
                    <p className="text-center h2 mt-4">View Users</p>
                    {
                        this.props.viewusers.map((user, index) =>
                            <div className="card my-4 mx-4" key={index}>
                                <div className="card-header">
                                    <span style={{ fontWeight: "bold" }}>{user.fullname}</span>
                                </div>
                                <div className="card-body">
                                    <p className="card-text"><span style={{ fontWeight: "bold" }}>Username: </span>{user.username}</p>
                                    <p className="card-text"><span style={{ fontWeight: "bold" }}>Email: </span> {user.email}</p>
                                    <button className="btn btn-danger" onClick={() => this.deleteUser(user._id)}>Delete</button>
                                </div>
                            </div>
                        )
                    }
                </div>
        )
    }
}

const mapStateToProps = state => ({
    viewusers: state.admin.viewusers,
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { viewUsers, deleteUser })(ViewUsers);