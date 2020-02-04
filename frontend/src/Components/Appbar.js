import React from 'react'
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logoutUser } from "../Action/authActions";

const Appbar = (props) => {
    // const [isOpen, setIsOpen] = useState(false);

    // const toggle = () => setIsOpen(!isOpen);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Souq Al Maal</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                { props.auth.isAuthenticated && props.auth.user.userType === "admin" ?
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/adminhome">Posts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/createpost">Create Post</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/adduser">Add User</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/viewusers">View Users</Link>
                    </li>
                </ul> : null
                }
                 { props.auth.isAuthenticated && props.auth.user.userType === "user" ?
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/home">Posts</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/preferredposts">Preferred Posts</Link>
                    </li>
                </ul> : null
                }
                 { !props.auth.isAuthenticated ?
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/signin">Signin</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
                </ul> : null
                }
                <div className="my-2 my-lg-0">
                    {props.auth.isAuthenticated ? <button className="btn btn-danger my-2 my-sm-0" type="submit" onClick={() => props.logoutUser(props.history)}>Logout</button> : <Link to="/admin" className="btn btn-primary">Admin</Link>}
                </div>
            </div>
        </nav>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Appbar);