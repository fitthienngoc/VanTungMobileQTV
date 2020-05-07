import * as Types from '../../constants/ActionType';
import HTTP from '../../services/HTTP';
import history from '../../helpers/history';
import authHeader from '../../helpers/authHeader';

export const actLogin = (body, permission = false) => {
    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.LOGIN_REQUEST });
        return HTTP(`?action=login&email=${body.email}&password=${body.password}&permission=${true}`, 'GET', null, header).then(res => {
            if (res.data.status == 200) {
                dispatch({ type: Types.LOGIN_SUCCESS, dataUser: res.data.dataUser })
                history.push('/')
            }
            if (res.data.status == 202) {
                dispatch({ type: Types.LOGIN_FAILURE, error: res.data.error })
            }
            if (res.data.status == 404) {
                history.push('/404')

            }
        });
    };
}

export const actGetUser = (id) => {
    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.LOAD_DATA_USER_REQUEST });
        return HTTP(`?action=editUser&id_user=${id}`, 'GET', null, header).then(res => {
            console.log(res);

            if (res && res.data && res.data.status == 200) {
                var user = res.data.dataUser
                dispatch({ type: Types.LOAD_DATA_USER_SUCCESS, dataUser: user });
            }
            if (res && res.data.status == 202) {
                dispatch({ type: Types.LOAD_DATA_USERS_FAIL, error: res.data.error });
            }

        });
    }
}

export const actUpdateUser = (body) => {
    var permission = ''
    if (body && body.permission) permission = body.permission; 
    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.UPDATE_USER_REQUEST });
        return HTTP(`?action=Q_updateUser&id_user=${body.Id}&name=${body.name}&email=${body.email}&password=${body.password}&phone=${body.phone}&permission=${permission}`, 'POST', null, header).then(res => {

            if (res.data.status == 200) {
                dispatch({ type: Types.UPDATE_USER_SUCCESS, data: body })
                history.push('/users')
            }
            if (res.data.status == 201) {
                dispatch({ type: Types.UPDATE_USER_FAIL, error: res.data.error })
                // history.push('/users')
            }
            // if (res.data.status === 404) {

            //     history.push({ pathname: '/404' })
            // }
            // if (res.data.status == 300) {
            //     history.push({ pathname: '/' })
            // }
        });
    };
}
