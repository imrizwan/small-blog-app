import React, { Component } from 'react'
import { addUserByAdmin } from "../../Action/authActions"
import { connect } from "react-redux";

export class AddUser extends Component {

    state = {
        username: "",
        fullname: "",
        email: "",
        password: "",
        password2: "",
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
            username,
            fullname,
            email,
            password,
            password2
        } = this.state;

        const newuser = {
            username,
            fullname,
            email,
            password,
            password2,
            userType: "user"
        }
        this.props.addUserByAdmin(newuser, this.props.history);
    };

    // componentDidMount() {
    //     if (
    //         !this.props.auth.isAuthenticated &&
    //         this.props.auth.user.userType !== "admin"
    //     ) {
    //         this.props.history.push("/signin");
    //     }
    // }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <p className="text-center h2 my-4">Add User</p>
                <div style={{ width: "50%", margin: "0 auto" }}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Username</span>
                        </div>
                        <input type="text" className="form-control" name="username" onChange={this.handleChangeInput("username")} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />

                    </div>
                    {errors.username ? (
                        <div style={{ color: "red" }} className="mb-4">{this.state.errors.username}</div>
                    ) : null}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">fullname</span>
                        </div>
                        <input type="text" className="form-control" name="fullname" onChange={this.handleChangeInput("fullname")} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />

                    </div>
                    {errors.fullname ? (
                        <div style={{ color: "red" }} className="mb-4">{this.state.errors.fullname}</div>
                    ) : null}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                        </div>
                        <input type="text" className="form-control" name="email" onChange={this.handleChangeInput("email")} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />

                    </div>
                    {errors.email ? (
                        <div style={{ color: "red" }} className="mb-4">{this.state.errors.email}</div>
                    ) : null}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                        </div>
                        <input type="text" className="form-control" name="password" onChange={this.handleChangeInput("password")} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    {errors.password ? (
                        <div style={{ color: "red" }} className="mb-4">{this.state.errors.password}</div>
                    ) : null}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Confirm Password</span>
                        </div>
                        <input type="text" className="form-control" name="password2" onChange={this.handleChangeInput("password2")} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />

                    </div>
                    {errors.password2 ? (
                        <div style={{ color: "red" }} className="mb-4">{this.state.errors.password2}</div>
                    ) : null}
                    <button className="btn btn-primary" onClick={() => this.onClick()}>Add User</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addUserByAdmin })(AddUser);