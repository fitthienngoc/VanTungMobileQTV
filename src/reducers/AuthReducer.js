import * as Types from '../constants/ActionType';
var users = JSON.parse(localStorage.getItem('users'));
const initialState = users ? { loggedIn: true, users } : {};

const authentication = (state = initialState, action) => {
    switch(action.type) {
        case Types.LOGIN_REQUEST:
            state.loggingIn = true;
            return {...state};
        case Types.LOGIN_SUCCESS:
            state.loggingIn = true;
            state.users = action.dataUser;
            localStorage.setItem('users',JSON.stringify(state))
            return {...state};
        case Types.LOGIN_FAILURE:
            state.loggingIn = false;
            state.errors = action.error;
            return {...state};
        case Types.LOGOUT_SUCCESS:
            localStorage.clear('usesr')
            state.loggedIn = false;
            return {...state};
        default: return {...state};
    }
}

export default authentication;