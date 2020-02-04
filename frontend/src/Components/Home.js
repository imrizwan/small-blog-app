import React, { Component } from 'react'
import { getAllPosts, likePost, getCurrentUser } from "../Action/authActions"
import { connect } from "react-redux"
import isEmpty from "../validation/is-empty";
import Loader from '../Loader';
import { getDate } from "../utils";

export class AdminHome extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.getAllPosts();
            this.props.getCurrentUser();
        }
    }

    likePost = (id) => {
        this.props.likePost(id);
    }

    filtered = (posts, user) => {
        //removing values
        let items = posts.filter((i) => !user.likedposts.includes(i._id))
        return items;
    }

    render() {
        return (
            isEmpty(this.props.getallposts) || isEmpty(this.props.current) ?
                <Loader /> : <div>
                    <p className="text-center h2 mt-4">Posts</p>
                    {
                        isEmpty(this.filtered(this.props.getallposts, this.props.current)) ? <p className="text-center h6">No posts</p> : this.filtered(this.props.getallposts, this.props.current).map((post, index) =>
                            <div className="card my-4 mx-4" key={index}>
                                <div className="card-header">
                                    {post.title}
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{post.description}</p>
                                    <p className="card-text">{getDate(post.createdAt)}</p>
                                    {
                                        this.props.current.likedposts.includes(post._id) ?
                                        <button className="btn btn-success" onClick={() => this.likePost(post._id)}>Liked</button> :
                                        <button className="btn btn-primary" onClick={() => this.likePost(post._id)}>Like</button>
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
        )
    }
}

const mapStateToProps = state => ({
    getallposts: state.admin.getallposts,
    current: state.admin.current,
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { getAllPosts, likePost, getCurrentUser })(AdminHome);