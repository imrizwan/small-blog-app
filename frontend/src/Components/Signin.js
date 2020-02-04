import React, { Component } from 'react'
import { loginUser } from "../Action/authActions"
import { connect } from "react-redux";

export class Signin extends Component {

    state = {
        email: "",
        password: "",
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
            email,
            password
        } = this.state;

        const newuser = {
            email,
            password,
            userType: "user"
        }
        this.props.loginUser(newuser);
    };

    componentDidMount() {
        if (
          this.props.auth.isAuthenticated &&
          this.props.auth.user.userType === "user"
        ) {
          this.props.history.push("/home");
        }
      }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <p className="text-center h2 my-4">Signin</p>
                <div style={{ width: "50%", margin: "0 auto" }}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                        </div>
                        <input type="text" className="form-control" name="email" onChange={this.handleChangeInput("email")} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        
                    </div>
                    {errors.email ? (
                        <div style={{ color: "red" }} className="mb-4">{this.state.errors.email}</div>
                    ) : null}
                     {errors.userType ? (
                        <div style={{ color: "red" }} className="mb-4">{this.state.errors.userType}</div>
                    ) : null}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                        </div>
                        <input type="password" className="form-control" name="password" onChange={this.handleChangeInput("password")} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    {errors.password ? (
                        <div style={{ color: "red" }} className="mb-4">{this.state.errors.password}</div>
                    ) : null}
                    <button className="btn btn-primary" onClick={() => this.onClick()}>Signin</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Signin);
