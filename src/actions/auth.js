import * as Types from '../constants/ActionType';
import HTTP from '../services/HTTP';
import buffer from 'buffer';
import history from '../helpers/history';
// import authHeader from '../helpers/authHeader';

export const actLogin = (body) => {
    return dispatch => {
        dispatch(actLoginRequest());
        var b = new buffer.Buffer(body.username + ':' + body.password);
        const auth = 'Basic ' + b.toString('base64');
        var header = {
            'Authorization': auth,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        return HTTP('users/profile', 'get', null, header).then(res => {
            console.log(res)
            if (res.status === 200) {
                if (res.data.status === 200) {
                    var user = res.data.data
                    user.token = auth
                    localStorage.setItem('user', JSON.stringify(user));
                    // var header2 = authHeader();
                    dispatch(actLoginSuccess(user));
                    history.push('/');
                } else {
                    dispatch(actLoginFail(res.data.errors.message));
                }
            } else {
                dispatch(actLoginFail());
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export const actLoginRequest = () => {
    return {
        type: Types.LOGIN_REQUEST,
    }
}

export const actLoginSuccess = (data) => {
    return {
        type: Types.LOGIN_SUCCESS,
        data
    }
}

export const actLoginFail = (errors) => {
    return {
        type: Types.LOGIN_FAILURE,
        errors,
    }
}


export const actLogoutSuccess = () => {
    history.push('/');
    return {
        type: Types.LOGOUT_SUCCESS,
    }
}