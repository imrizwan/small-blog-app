import { CURRENT, LIKE_POST, DELETE_USER, GET_ERRORS, URL, SET_CURRENT_USER, GET_ALL_POSTS, GET_MY_POSTS, DELETE_MY_POST, VIEW_USERS } from "./constants";
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from "jwt-decode";
import axios from "axios";

export const registerUser = (userInfo, history) => dispatch => {
  axios.post(URL + "register", userInfo)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      //Decode token to get user
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      window.location.reload();
    }).catch(errors => dispatch({ type: GET_ERRORS, payload: errors.response.data }))
};

export const loginUser = (userInfo, history) => dispatch => {

  axios.post(URL + "login", userInfo)
    .then(res => {
      const { token } = res.data;

      // localStorage.setItem('profilecreated', res.data.profilecreated);
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      //Decode token to get user
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      window.location.reload();
    }).catch(errors => dispatch({ type: GET_ERRORS, payload: errors.response.data }))
}
export const createPost = (userInfo, history) => dispatch => {

  axios.post(URL + "createpost", userInfo)
    .then(res => {
      // const { token } = res.data;
      history.push("/adminhome")
    }).catch(errors => dispatch({ type: GET_ERRORS, payload: errors.response.data }))
}

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}


export const logoutUser = (history) => (dispatch) => {
  //Remove token from the localstorage
  // localStorage.removeItem('profilecreated');
  localStorage.removeItem('jwtToken');
  //Remove auther header for future requests
  setAuthToken(false);
  // set current user to emty object
  dispatch(setCurrentUser({}));

  if (history) {
    history.push("/signin");
  }
};

export const getMyPosts = () => dispatch => {
  axios
    .get(URL + `getmyposts`)
    .then(res => {
      dispatch({
        type: GET_MY_POSTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const getAllPosts = () => dispatch => {
  axios
    .get(URL + `getallposts`)
    .then(res => {
      dispatch({
        type: GET_ALL_POSTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
export const deleteMyPost = (id) => dispatch => {
  axios
    .get(URL + `deletemypost/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_MY_POST,
        payload: res.data
      });
      window.location.reload()
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
export const deleteUser = (id) => dispatch => {
  axios
    .get(URL + `removeuser/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_USER,
        payload: res.data
      });
      window.location.reload()
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const addUserByAdmin = (userInfo, history) => dispatch => {
  axios.post(URL + "adduserbyadmin", userInfo)
    .then(res => {
      // dispatch({ type: USER_ADDED, payload: {} })
      history.push("/viewusers")
    }).catch(errors => {
      history.push("/viewusers")
    })
};

export const viewUsers = () => dispatch => {
  axios.get(URL + "getalluser")
    .then(res => {
      dispatch({ type: VIEW_USERS, payload: res.data })
    }).catch(errors => dispatch({ type: GET_ERRORS, payload: errors.response.data }))
};

export const likePost = (id) => dispatch => {
  axios.get(URL + `likepost/${id}`)
    .then(res => {
      dispatch({ type: LIKE_POST, payload: res.data })
      window.location.reload()
    }).catch(errors => dispatch({ type: GET_ERRORS, payload: errors.response.data }))
};

export const getCurrentUser = (id) => dispatch => {
  axios.get(URL + `current`)
    .then(res => {
      dispatch({ type: CURRENT, payload: res.data })
    }).catch(errors => dispatch({ type: GET_ERRORS, payload: errors.response.data }))
};