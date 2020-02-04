import React, { Component } from 'react'
import { getMyPosts, deleteMyPost } from "../../Action/authActions"
import { connect } from "react-redux"
import isEmpty from "../../validation/is-empty";
import Loader from '../../Loader';

export class AdminHome extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.getMyPosts()
        }

    }

    deletePost = (id) => {
        this.props.deleteMyPost(id)
    }

    render() {
        return (
            isEmpty(this.props.getmyposts) ?
                <Loader /> : <div>
                    <p className="text-center h2 mt-4">My Posts</p>
                    {
                        this.props.getmyposts.map((post, index) =>
                            <div className="card my-4 mx-4" key={index}>
                                <div className="card-header">
                                    {post.title}
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{post.description}</p>
                                    <button className="btn btn-danger" onClick={() => this.deletePost(post._id)}>Delete</button>
                                </div>
                            </div>
                        )
                    }
                </div>
        )
    }
}

const mapStateToProps = state => ({
    getmyposts: state.admin.getmyposts,
    deletemypost: state.admin.deletemypost,
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { getMyPosts, deleteMyPost })(AdminHome);