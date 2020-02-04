import React, { Component } from 'react'
import { createPost } from "../../Action/authActions"
import { connect } from "react-redux";

export class CreatePost extends Component {

    state = {
        title: "",
        description: "",
        errors: {}
    }

    handleChangeInput = name => event => {
        this.setState({
            [name]: event.target.value,
            errors: {}
        });
    };

    onClick = value => {
        const {
            title,
            description
        } = this.state;

        const newPost = {
            title,
            description,
        }
        this.props.createPost(newPost, this.props.history);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <p className="text-center h2 my-4">Create Post</p>
                <div style={{ width: "50%", margin: "0 auto" }}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Title</span>
                        </div>
                        <input type="text" className="form-control" name="title" onChange={this.handleChangeInput("title")} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        
                    </div>
                    {errors.title ? (
                        <div style={{ color: "red" }} className="mb-4">{this.state.errors.title}</div>
                    ) : null}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Description</span>
                        </div>
                        <input type="text" className="form-control" name="description" onChange={this.handleChangeInput("description")} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    {errors.description ? (
                        <div style={{ color: "red" }} className="mb-4">{this.state.errors.description}</div>
                    ) : null}
                    <button className="btn btn-primary" onClick={() => this.onClick()}>Add Post</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { createPost })(CreatePost);
