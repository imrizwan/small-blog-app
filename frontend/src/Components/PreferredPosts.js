import React, { Component } from 'react'
import { getCurrentUser, getAllPosts, likePost } from "../Action/authActions";
import { connect } from "react-redux";
import isEmpty from "../validation/is-empty";
import Loader from "../Loader";
import { getDate } from "../utils"

export class PreferredPosts extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.getAllPosts();
            this.props.getCurrentUser();
        }
    }

    filtered = (posts, user) => {
        //removing values
        let items = posts.filter((i) => user.likedposts.includes(i._id))
        return items;
    }

    likePost = (id) => {
        this.props.likePost(id);
    }

    render() {
        return (
            isEmpty(this.props.getallposts) || isEmpty(this.props.current) ?
                <Loader /> :
                <div>
                    <p className="text-center h2 mt-4">Preferred Posts</p>
                    
                    {isEmpty(this.filtered(this.props.getallposts, this.props.current)) ?  <p className="text-center h6">No posts</p>: this.filtered(this.props.getallposts, this.props.current).map((filtered, index) =>
                        <div className="card mx-4 my-4" key={index}>
                            <div className="card-header">
                                {filtered.title}
                            </div>
                            <div className="card-body">
                                <p className="card-text">{filtered.description}</p>
                                <p className="card-text">{getDate(filtered.createdAt)}</p>
                                {
                                    this.props.current.likedposts.includes(filtered._id) ?
                                        <button className="btn btn-success" onClick={() => this.likePost(filtered._id)}>Liked</button> :
                                        <button className="btn btn-primary" onClick={() => this.likePost(filtered._id)}>Like</button>
                                }
                            </div>
                        </div>
                    )}
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

export default connect(mapStateToProps, { getAllPosts, getCurrentUser, likePost })(PreferredPosts);