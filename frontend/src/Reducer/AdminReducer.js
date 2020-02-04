import { CURRENT, LIKE_POST, GET_ALL_POSTS, GET_MY_POSTS, DELETE_MY_POST, USER_ADDED, VIEW_USERS, DELETE_USER } from "../Action/constants";
// import isEmpty from "../validation/is-empty";

const inititalState = {}


export default function(state = inititalState, action){
    switch(action.type){
        case GET_MY_POSTS: 
        return {
            ...state,
            getmyposts: action.payload,
        }
        case GET_ALL_POSTS: 
        return {
            ...state,
            getallposts: action.payload,
        }
        case DELETE_MY_POST: 
        return {
            ...state,
            deletemypost: action.payload,
        }
        case USER_ADDED: 
        return {
            ...state,
            useradded: action.payload,
        }
        case VIEW_USERS: 
        return {
            ...state,
            viewusers: action.payload,
        }
        case DELETE_USER: 
        return {
            ...state,
            deleteuser: action.payload,
        }
        case LIKE_POST: 
        return {
            ...state,
            likepost: action.payload,
        }
        case CURRENT: 
        return {
            ...state,
            current: action.payload,
        }
        default:
            return state;
    }
}